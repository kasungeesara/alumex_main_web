# ALUQ frontend demo

## Website knowledge prompt

`content/aluq/website-knowledge.md` is the editable site-wide prompt and knowledge
base. Its topics cover company information, contact details, finishes, fabrication,
quality labels, warranty, sustainability, export destinations, projects, partners,
brands, careers, social media, resources and information the website does not
publish. `getAluqWebsiteKnowledge()` validates these topics and supplies them to
the local conversation logic. Site answers include actual section links and keep
the user's existing product preferences intact. Product detail content continues
to come directly from `content/products/*.md`.

This is still the requested frontend preview. A live model is not invoked; the
prompt's structured facts drive local topic matching. Update the Markdown when
website facts change. A future live backend can also use the prompt as context.

This is a **local guided demo**, as requested. It does not call an AI provider,
send inquiries, store customer details on a server, or require environment keys.
Every panel clearly identifies this mode, and the completion screen explicitly
says the inquiry was not sent. Use sample details when demonstrating it.

## Existing systems reused

- The hero's **Ask ALUQ** icon and label have moved into one floating action button
  at the bottom-right, available across the site. There is no duplicate hero button.
- `lib/products.ts` reads the existing `content/products/*.md` files. The server
  passes a small catalogue of names, images, descriptions and actual specifications
  into the client launcher. Product cards link to existing `/products/<slug>` pages.
- No 3D viewer, inquiry API, CRM, or live AI integration exists in this checkout.
  No fictional links or model-level specifications are added.

## Try the demo

1. Open the floating **Ask ALUQ** button.
2. Choose **Sliding window for my house**, then a room and finish. Free text,
   **Skip**, finish corrections and dimensions such as `1200 x 1500 mm` work too.
3. Inspect recommended existing ranges. Open their real product pages, or add
   up to four ranges to the inquiry. Use the catalogue tab to browse alternatives.
4. Adding a range starts guided inquiry collection in the chat: name, email,
   phone, project location, missing project requirements, optional message and
   preview consent. Known requirements are not asked again. Email and phone are
   validated; optional questions support Skip and Cancel keeps entered details.
   Finally review/edit the prefilled Inquiry form and submit the preview.
5. The local completion screen shows a `DEMO-…` reference. **It is not a real
   submission or a message to Alumex.** Repeated submission is blocked until reset.
6. Close and reopen to continue. The root layout preserves state during client
   navigation. Reloading or opening another tab starts fresh. Nothing is written
   to localStorage, sessionStorage, cookies or a database.

Inquiry preview submission includes a brief local preparation animation and a
customer-visible summary. It is labelled as a preview, never a network delivery.
Guided responses are synchronous rules in `lib/aluq/demo.ts`, not generated AI answers.
The chat UI briefly displays a typing indicator before showing each local response;
this delay is only a presentation effect, not a model or network request.
These cover common residential/industrial/hardware requests and comparisons;
arbitrary natural-language understanding is intentionally limited in demo mode.

## Files

- `components/aluq/launcher.tsx`: lightweight launcher, existing hero activation,
  dynamically loaded conversation window.
- `components/aluq/chat-window.tsx`: conversation, catalogue, editable inquiry,
  validation and explicit demo completion.
- `components/aluq/aluq.css`: scoped desktop/mobile styling and reduced motion.
- `lib/aluq/catalog.ts`: adapts existing Markdown data without duplicating it.
- `lib/aluq/demo.ts`: local guided replies, matching and inquiry validation.
- `types/aluq.ts`: shared data types.
- `app/layout.tsx`: mounts the widget across the existing website.
- `components/home/hero.tsx`: connects the existing Ask ALUQ link.
- `scripts/aluq-demo.test.cjs`: focused flow and validation tests.
- `scripts/aluq-browser-check.cjs`: dependency-free local Chrome checks at desktop
  and mobile sizes (uses Node's WebSocket support and a temporary browser profile).

## Checks

```sh
node --test scripts/aluq-demo.test.cjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js components/aluq lib/aluq types/aluq.ts app/layout.tsx components/home/hero.tsx
pnpm build
```

For browser checks, start `pnpm start --port 3107` after building, then run
`node scripts/aluq-browser-check.cjs`. The script defaults to Chrome on Windows;
set `ALUQ_BROWSER` for another Chromium executable, and `ALUQ_PREVIEW_URL` to
override the preview URL. It uses sample contact data and performs no real inquiry.

Verified: seven guided-flow/validation tests, production build with TypeScript,
and scoped lint pass. Browser checks pass at 1365×900, 390×844 and 320×640 for
hero activation, guided selection, actual product links, inquiry review, local
demo completion, duplicate-submit prevention, close/reopen, Escape and horizontal
overflow. No backend/AI requests or browser exceptions were observed.

Full-project `pnpm lint` was also run. It remains blocked by pre-existing errors
outside the ALUQ integration (including `components/home/footer.tsx` and the
existing globe implementation). ALUQ source and test files pass scoped lint.

Desktop/mobile manual review: check launcher placement, panel size, internal
scroll, touch targets, email/telephone input, Escape/close and focus return. The
panel uses `100dvh`, safe-area spacing and 16px mobile inputs. Existing navigation
stays above the widget. The window is nonmodal so the rest of the site remains
usable. No new dependencies are required.

For a future live implementation, replace the local reply/submission handlers
with authenticated server routes and connect an actual inquiry backend. Remove
demo labels only after real delivery, abuse controls and error handling are
implemented and verified. No external-service credentials are needed for this demo.
