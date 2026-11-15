/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node browser QA without additional dependencies. */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');

// Run against an already-built local server: node scripts/aluq-browser-check.cjs
const base = process.env.ALUQ_PREVIEW_URL || 'http://localhost:3107';
const executable = process.env.ALUQ_BROWSER || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'aluq-browser-check-'));
const browser = spawn(executable, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', 'about:blank'], { windowsHide: true, stdio: 'ignore' });
let socket;
let counter = 0;
const pending = new Map();
const apiRequests = [];
const exceptions = [];
function pause(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function until(callback, description) {
  for (let i = 0; i < 100; i++) {
    const value = await callback();
    if (value) return value;
    await pause(150);
  }
  throw new Error(`Timed out: ${description}`);
}
function send(method, params = {}) {
  const id = ++counter;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const value = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
  return value.result.value;
}
async function clickText(selector, label) {
  const clicked = await evaluate(`(() => { const target = [...document.querySelectorAll(${JSON.stringify(selector)})].find(node => node.textContent.trim() === ${JSON.stringify(label)}); target?.click(); return Boolean(target); })()`);
  assert.ok(clicked, `Button exists: ${label}`);
  await pause(120);
}
async function fill(selector, value) {
  await evaluate(`(() => { const input = document.querySelector(${JSON.stringify(selector)}); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, ${JSON.stringify(value)}); input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await pause(60);
}

async function run() {
  const port = await until(() => {
    try { return fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch { return null; }
  }, 'browser startup');
  const targets = await fetch(`http://localhost:${port}/json/list`).then(response => response.json());
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const task = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) task?.reject(new Error(message.error.message));
      else task?.resolve(message.result);
    }
    if (message.method === 'Network.requestWillBeSent' && message.params.request.url.includes('/api/aluq')) apiRequests.push(message.params.request.url);
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  for (const size of [{ width: 1365, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 640 }]) {
    await send('Emulation.setDeviceMetricsOverride', { ...size, deviceScaleFactor: 1, mobile: size.width < 600 });
    await send('Page.navigate', { url: base });
    await until(() => evaluate('Boolean(document.querySelector(".aluq-widget"))'), 'launcher integration');
    assert.equal(await evaluate('document.querySelectorAll("[data-aluq-open]").length'), 1, 'Only one Ask ALUQ floating button');
    await pause(350);
    const launcherWidth = await evaluate('document.querySelector("[data-aluq-open]").getBoundingClientRect().width');
    assert.match(await evaluate('document.querySelector("[data-aluq-open]").textContent'), /Ask ALUQ/);
    await evaluate('document.querySelector("[data-aluq-open]").click()');
    await until(() => evaluate('Boolean(document.querySelector("#aluq-chat"))'), 'chat window');
    await pause(450);
    const compactWidth = await evaluate('document.querySelector("[data-aluq-open]").getBoundingClientRect().width');
    assert.ok(compactWidth < launcherWidth - 20, 'Open launcher shrinks');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-aluq-open]")).filter'), 'grayscale(1)', 'Open launcher is grayscale');
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".aluq-launcher > span")).visibility'), 'hidden', 'Open launcher label is hidden');
    assert.equal(await evaluate('document.querySelector("[data-aluq-open]").getAttribute("aria-label")'), 'Close ALUQ assistant');
    const layers = await evaluate('(() => ({ widget: Number(getComputedStyle(document.querySelector(".aluq-widget")).zIndex), nav: Number(getComputedStyle(document.querySelector("header.arbor-nav")).zIndex), window: Number(getComputedStyle(document.querySelector(".aluq-window")).zIndex), trigger: Number(getComputedStyle(document.querySelector("[data-aluq-open]")).zIndex) }))()');
    assert.ok(layers.widget > layers.nav, 'Chat widget stacks above the navbar');
    assert.ok(layers.window > layers.trigger, 'Chat window stacks above its trigger');
    const bounds = await evaluate('(() => { const p = document.querySelector("#aluq-chat").getBoundingClientRect(); return { left: p.left, right: p.right, top: p.top, bottom: p.bottom, width: innerWidth, height: innerHeight }; })()');
    assert.ok(bounds.left >= 0 && bounds.right <= bounds.width + 1 && bounds.top >= 0 && bounds.bottom <= bounds.height, `Panel stays in ${size.width}px viewport`);
    assert.match(await evaluate('document.querySelector(".aluq-footer").textContent'), /Guided preview/);
    assert.ok(await evaluate('Boolean(document.querySelector(".aluq-brand-logo"))'), 'Alumex logo in header');
    await clickText('.aluq-quick-replies button', 'Sliding window for my house');
    assert.ok(await evaluate('Boolean(document.querySelector(".aluq-typing"))'), 'Typing indicator appears before the reply');
    assert.equal(await evaluate('document.querySelector(".aluq-typing")?.getAttribute("aria-label")'), 'ALUQ is typing');
    await until(() => evaluate('[...document.querySelectorAll(".aluq-quick-replies button")].some(node => node.textContent === "Living Room")'), 'first delayed reply');
    await clickText('.aluq-quick-replies button', 'Living Room');
    await until(() => evaluate('[...document.querySelectorAll(".aluq-quick-replies button")].some(node => node.textContent === "Black")'), 'second delayed reply');
    await clickText('.aluq-quick-replies button', 'Black');
    await until(() => evaluate('[...document.querySelectorAll(".aluq-product h3")].some(node => node.textContent === "Dwelling")'), 'delayed recommendation');
    assert.ok(await evaluate('[...document.querySelectorAll(".aluq-product-actions a")].some(node => node.getAttribute("href") === "/products/dwelling")'));
    const overflow = await evaluate('(() => { const p = document.querySelector(".aluq-body"); return p.scrollWidth > p.clientWidth + 1; })()');
    assert.equal(overflow, false, 'No horizontal chat overflow');
    await clickText('.aluq-product-actions button', '+ Add to inquiry');
    await clickText('.aluq-tabs button', 'Inquiry (1)');
    await fill('.aluq-inquiry input[type="email"]', 'demo@example.com');
    await fill('.aluq-inquiry input[type="tel"]', '+94 77 123 4567');
    await evaluate(`(() => { const fields = [...document.querySelectorAll('.aluq-inquiry fieldset')].at(-1).querySelectorAll('input'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(fields[0], 'Demo Customer'); fields[0].dispatchEvent(new Event('input', {bubbles:true})); set.call(fields[3], 'Colombo'); fields[3].dispatchEvent(new Event('input', {bubbles:true})); })()`);
    await pause(150);
    await evaluate('document.querySelector(".aluq-consent input").click()');
    await pause(120);
    await evaluate('document.querySelector(".aluq-inquiry").requestSubmit()');
    await until(() => evaluate('Boolean(document.querySelector(".aluq-receipt"))'), 'demo completion');
    const receipt = await evaluate('document.querySelector(".aluq-receipt").textContent');
    assert.match(receipt, /has not been sent/);
    assert.match(receipt, /DEMO-/);
    assert.equal(await evaluate('document.querySelectorAll(".aluq-inquiry").length'), 0, 'Submission cannot be repeated on completion');
    await evaluate('document.querySelector(".aluq-header button:last-child").click()');
    assert.ok(await evaluate('document.querySelector(".aluq-window").classList.contains("aluq-window-closing")'), 'Close starts the exit animation');
    assert.equal(await evaluate('document.querySelector(".aluq-window").hidden'), false, 'Panel stays visible during exit');
    assert.ok(await evaluate('document.querySelector(".aluq-window").inert'), 'Closing panel is not interactive');
    await pause(120);
    assert.ok(await evaluate('document.querySelector("[data-aluq-open]").getBoundingClientRect().width > compactWidth'), 'Launcher expands when closed');
    await evaluate('document.querySelector("[data-aluq-open]").click()');
    assert.ok(await evaluate('Boolean(document.querySelector(".aluq-receipt"))'), 'Quick reopen preserves the demo state');
    await pause(300);
    assert.equal(await evaluate('document.querySelector(".aluq-window").hidden'), false, 'Reopening cancels the scheduled hide');
    await evaluate('document.querySelector("#aluq-chat").dispatchEvent(new KeyboardEvent("keydown", {key:"Escape", bubbles:true}))');
    await until(() => evaluate('Boolean(document.querySelector("#aluq-chat").closest("[hidden]"))'), 'Escape closes the panel after animation');
    await until(() => evaluate('document.querySelector("[data-aluq-open]").getBoundingClientRect().width >= ' + (launcherWidth - 1)), 'launcher restores full size');
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".aluq-launcher > span")).visibility'), 'visible', 'Launcher label returns after close');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-aluq-open]")).filter'), 'none', 'Launcher color returns after close');
    console.log(`PASS ${size.width}x${size.height}: hero launch, guided selection, verified links, review, demo submit, close/reopen, Escape, no overflow`);
  }
  assert.equal(apiRequests.length, 0, 'Demo sends no AI or inquiry requests');
  assert.equal(exceptions.length, 0, `No browser exceptions: ${exceptions.join(', ')}`);
  console.log('PASS: no backend/AI requests and no browser exceptions');
}

run().catch(async error => {
  console.error(error);
  console.error(await evaluate('JSON.stringify({url:location.href, buttons:[...document.querySelectorAll("button")].map(node=>node.textContent).slice(-10)})').catch(() => 'Browser unavailable'));
  process.exitCode = 1;
}).finally(async () => {
  if (socket?.readyState === WebSocket.OPEN) await send('Browser.close').catch(() => {});
  socket?.close();
  browser.kill();
  await pause(500);
  // Delete only the exact temporary profile created above, after checking its absolute boundary.
  const absolute = path.resolve(profile);
  const temp = path.resolve(os.tmpdir()) + path.sep;
  if (absolute.startsWith(temp) && path.basename(absolute).startsWith('aluq-browser-check-')) {
    try { fs.rmSync(absolute, { recursive: true, force: true, maxRetries: 3 }); }
    catch { console.log('Browser temporary profile is still in use; Windows may clean it up later.'); }
  }
});
