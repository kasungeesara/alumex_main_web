/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS is required for this dependency-free TypeScript test loader. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const matter = require('gray-matter');

// Exercise the actual TypeScript demo logic without another test dependency.
require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  module._compile(code, filename);
};
const { demoReply, matchProducts, validateDemoInquiry } = require('../lib/aluq/demo.ts');
const { emptyRequirements } = require('../types/aluq.ts');
const { nextInquiryStep, validateInquiryAnswer } = require('../lib/aluq/inquiry-conversation.ts');
const catalog = fs.readdirSync(path.join(__dirname, '../content/products')).filter(file => /^[a-z0-9-]+\.md$/.test(file)).map(file => {
  const { data } = matter(fs.readFileSync(path.join(__dirname, '../content/products', file), 'utf8'));
  return { slug: file.slice(0, -3), name: data.name, summary: data.summary, image: data.listingImage ?? data.gallery[0], href: `/products/${file.slice(0, -3)}`, specifications: [] };
});
const topics = matter(fs.readFileSync(path.join(__dirname, '../content/aluq/website-knowledge.md'), 'utf8')).data.topics;

test('sliding-window flow collects room and finish, then recommends real ranges', () => {
  const messages = [{ role: 'user', content: 'I need an aluminium sliding window for my house' }];
  const first = demoReply(messages, emptyRequirements, catalog);
  assert.match(first.message, /install/i);
  assert.equal(first.requirements.productType, 'Sliding window');
  assert.equal(first.requirements.application, 'Residential');
  messages.push({ role: 'assistant', content: first.message }, { role: 'user', content: 'Living Room' });
  const second = demoReply(messages, first.requirements, catalog);
  assert.match(second.message, /finish/i);
  messages.push({ role: 'assistant', content: second.message }, { role: 'user', content: 'Black' });
  const third = demoReply(messages, second.requirements, catalog);
  assert.equal(third.requirements.installationArea, 'Living Room');
  assert.equal(third.requirements.finish, 'Black');
  assert.ok(third.recommendations.some(product => product.slug === 'dwelling'));
  assert.ok(third.recommendations.every(product => catalog.some(actual => actual.slug === product.slug)));
});
test('industrial inquiry does not force room and residential finish questions', () => {
  const reply = demoReply([{ role: 'user', content: 'Industrial profiles for a factory' }], emptyRequirements, catalog);
  assert.ok(reply.recommendations.some(product => product.slug === 'industrial'));
  assert.equal(reply.requirements.application, 'Industrial');
});
test('skipped questions are not repeatedly asked', () => {
  let requirements = { ...emptyRequirements, productType: 'Window', application: 'Residential' };
  const first = demoReply([{ role: 'assistant', content: 'Where will you install it?' }, { role: 'user', content: 'Skip' }], requirements, catalog);
  assert.equal(first.requirements.installationArea, 'Not specified');
  const second = demoReply([{ role: 'assistant', content: first.message }, { role: 'user', content: 'Not sure' }], first.requirements, catalog);
  assert.equal(second.requirements.finish, 'Not specified');
  assert.ok(second.recommendations.length);
});
test('free-text corrections and dimensions update preferences', () => {
  const reply = demoReply([{ role: 'user', content: 'Change finish to White, dimensions 1200 x 1500 mm' }], { ...emptyRequirements, productType: 'Window', installationArea: 'Bedroom', finish: 'Black' }, catalog);
  assert.equal(reply.requirements.finish, 'White');
  assert.equal(reply.requirements.dimensions, '1200 x 1500 mm');
  assert.equal(reply.requirements.installationArea, 'Bedroom');
});
test('comparison uses only actual ranges and unknown products are not fabricated', () => {
  const compared = demoReply([{ role: 'user', content: 'Compare Dwelling and SlenderLine' }], emptyRequirements, catalog);
  assert.ok(compared.recommendations.some(product => product.slug === 'dwelling'));
  assert.ok(compared.recommendations.some(product => product.slug === 'slenderline'));
  assert.deepEqual(matchProducts('copper solar panels', catalog), []);
  const unknown = demoReply([{ role: 'user', content: 'Show me copper solar panels' }], emptyRequirements, catalog);
  assert.equal(unknown.recommendations.length, 0);
  assert.match(unknown.message, /couldn’t match/);
});
test('reset clears inferred project requirements', () => {
  const reply = demoReply([{ role: 'user', content: 'Start over' }], { ...emptyRequirements, finish: 'Bronze' }, catalog);
  assert.deepEqual(reply.requirements, emptyRequirements);
});
test('inquiry review validates existing products, contact details and demo consent', () => {
  const draft = { productSlugs: ['dwelling'], requirements: { ...emptyRequirements }, customer: { name: 'Demo Customer', email: 'demo@example.com', phone: '+94 77 123 4567', location: 'Colombo', message: '' }, consent: true, website: '' };
  assert.equal(validateDemoInquiry(draft, catalog), null);
  assert.match(validateDemoInquiry({ ...draft, productSlugs: ['fictional-window'] }, catalog), /existing/);
  assert.match(validateDemoInquiry({ ...draft, consent: false }, catalog), /demo/);
  assert.match(validateDemoInquiry({ ...draft, customer: { ...draft.customer, email: 'invalid' } }, catalog), /email/);
  assert.match(validateDemoInquiry({ ...draft, customer: { ...draft.customer, name: '   ' } }, catalog), /name/);
});

test('company, exports, contact, warranty and finish answers come from the Markdown knowledge base', () => {
  for (const [question, id] of [['Tell me about Alumex', 'company'], ['What are your export markets?', 'exports'], ['Contact details', 'contact'], ['What warranty is available?', 'warranty'], ['Available finishes', 'finishes']]) {
    const reply = demoReply([{ role: 'user', content: question }], emptyRequirements, catalog, topics);
    const topic = topics.find(item => item.id === id);
    assert.equal(reply.message, topic.answer);
    assert.equal(reply.links[0].href, topic.href);
    assert.equal(reply.recommendations.length, 0);
  }
});
test('website questions preserve existing project preferences', () => {
  const current = { ...emptyRequirements, productType: 'Sliding window', finish: 'Black', installationArea: 'Bedroom' };
  const reply = demoReply([{ role: 'user', content: 'What is your phone number?' }], current, catalog, topics);
  assert.deepEqual(reply.requirements, current);
  assert.match(reply.message, /2400333/);
});
test('finish choices still continue product selection instead of becoming website questions', () => {
  const reply = demoReply([{ role: 'assistant', content: 'Preferred finish?' }, { role: 'user', content: 'Wood Finish' }], { ...emptyRequirements, productType: 'Sliding window', installationArea: 'Living Room' }, catalog, topics);
  assert.equal(reply.requirements.finish, 'Wood Finish');
  assert.ok(reply.recommendations.length);
});
test('knowledge links target existing pages or homepage section IDs', () => {
  const ids = new Set(['manufacturing', 'products', 'reasons', 'sustainability', 'market', 'projects', 'partners', 'contact']);
  for (const topic of topics) {
    assert.ok(topic.answer.trim());
    assert.ok(topic.href === '/' || topic.href === '/products' || (topic.href.startsWith('/#') && ids.has(topic.href.slice(2))));
  }
});

test('inquiry conversation asks for every missing field and skips existing answers', () => {
  const requirements = { ...emptyRequirements, productType: 'Window', application: 'Residential', installationArea: 'Living Room', finish: 'Black' };
  const customer = { name: '', email: '', phone: '', location: '', message: '' };
  const skipped = new Set();
  const answers = ['Demo Customer', 'demo@example.com', '+94 77 123 4567', 'Colombo', '1200 x 1500 mm', 'Skip', 'Skip', 'Yes, continue'];
  const asked = [];
  let consent = false;
  for (const answer of answers) {
    const step = nextInquiryStep(requirements, customer, consent, skipped);
    assert.ok(step);
    asked.push(step.id);
    assert.equal(validateInquiryAnswer(step, answer), null);
    if (answer === 'Skip') skipped.add(step.id);
    else if (step.scope === 'customer') customer[step.field] = answer;
    else if (step.scope === 'requirements') requirements[step.field] = answer;
    else consent = true;
  }
  assert.deepEqual(asked, ['name', 'email', 'phone', 'location', 'dimensions', 'additionalRequirements', 'message', 'consent']);
  assert.equal(nextInquiryStep(requirements, customer, consent, skipped), undefined);
  assert.equal(customer.name, 'Demo Customer');
  assert.equal(requirements.finish, 'Black');
});
test('required contact answers cannot be skipped and invalid emails/phones are rejected', () => {
  const customer = { name: 'Demo', email: '', phone: '', location: '', message: '' };
  const email = nextInquiryStep(emptyRequirements, customer, false, new Set());
  assert.match(validateInquiryAnswer(email, 'bad-email'), /email/);
  assert.match(validateInquiryAnswer(email, 'Skip'), /email/);
  customer.email = 'demo@example.com';
  const phone = nextInquiryStep(emptyRequirements, customer, false, new Set());
  assert.match(validateInquiryAnswer(phone, '123'), /phone/);
});
