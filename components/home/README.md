# Home page

`app/page.tsx` composes the page in the same order as the supplied Main.png reference.

- `header.tsx`: fixed glass capsule navigation, animated expanding menu,
  rolling link labels, mobile layout, focus trap, and page search.
- `hero.tsx`: full-screen video with live animated heading, description, quote CTA,
  expert contact link, and bottom caption.
- `brand-strip.tsx`: independent brand logo links.
- `manufacturing.tsx`: accessible interactive aluminium finish tabs.
- `products.tsx`: Sunvane-inspired pinned horizontal product track, scroll spring, and heading reveal.
- `product-card.tsx`, `products-data.ts`: reusable image cards and product content.
- `reasons.tsx`: manufacturer benefits and sustainability imagery.
- `projects.tsx`: project portfolio cards.
- `partners.tsx`: export markets, clients, and strategic partners.
- `footer.tsx`: company details and navigation.
- `shared.tsx`, `social-icon.tsx`: shared presentation components.

Home components use Tailwind utilities in JSX for layout, responsive styles,
interaction states, and animation declarations. Inline styles are reserved for
runtime values such as animation indices and scroll progress.
`app/globals.css` contains theme tokens, base defaults, and shared keyframes. Reference-derived WebP images are in
`public/images/home`. The document and section backgrounds span the viewport.
Content and footer use a shared fluid gutter aligned with the hero text: its 11px
frame plus 2.9% inner inset on desktop, and 32px on mobile (8px frame + 24px inset).
Sections use standard font sizes and content-driven heights. Layout breakpoints at 1150px,
960px, and 600px reflow the navigation and grids without scaling the entire page.

Section headings, card captions, CTAs, and globe country labels are HTML/CSS.
Photography and individual logo assets are extracted from the reference, with the
original header logo sourced from https://alumexgroup.com/. The export map is a
client-rendered Three.js AtomicGlobe adapted from the user-provided Framer module,
with animated routes, draggable rotation, cursor effects, and market cards.
See `globe/README.md` for source provenance and integration details.
The hero uses `hero_vid.mp4` as its background; the text and CTAs are live HTML. The home page's
links navigate to sections or existing email/phone contact channels; dedicated
product, project, policy, search, and newsletter backend pages are not included.

Validation: `pnpm exec tsc --noEmit` and `pnpm exec next build --webpack`.
The default Turbopack build requires permission to bind a local worker port.

## Expertise motion reference

https://sunvane.framer.website/#solutions

At 1200px and above, vertical scrolling moves a row of 420px cards inside
a sticky full-viewport section. The scroll spring uses stiffness 229 and damping
60, matching the reference configuration. Heading letters rise through a blur
reveal, cards enter with a stagger, and card borders, shadows, and arrows respond on hover/focus.
Photographs stay capped at their original 300px width inside the wider desktop
cards, preserving the horizontal travel without stretching image detail.
Images retain their native aspect ratio without upscaling, cropping, dark overlays,
or hover zoom; captions sit below the photos. Scroll distance follows the actual
track overflow to avoid an unnecessarily long pinned section.
Tablet uses a two-column grid; below 810px the cards stack vertically. Keyboard
focus brings off-screen cards into view. Reduced motion removes pinning and
scroll transforms and displays a regular grid. No extra animation dependency.

## Navigation reference

https://belgradearbor.rs/en

The navigation floats at the top center over the hero and follows the viewport.
The desktop capsule expands to reveal the existing Alumex section links. Mobile
uses a left-aligned logo, right-aligned menu toggle, and an internal Inquire CTA.
Escape and outside click close the menu. Keyboard focus stays inside the open
menu, closed links are inert, body scrolling is restored on close, and all
transitions honor reduced motion.

## Smooth scrolling

`components/providers/smooth-scroll.tsx` initializes one Lenis instance in the root
layout with its own RAF loop, smooth wheel interpolation, and native touch scrolling.
`lib/scroll.ts` coordinates programmatic navigation and menu scroll locking. Same-page
links use Lenis without native anchor jumps. The existing card and timeline effects
continue to follow native scroll events. Reduced motion destroys Lenis and uses native
scrolling; changing the preference at runtime recreates or cleans up the instance.
