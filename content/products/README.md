# Editing product pages

Each `.md` file in this directory is one product. Its filename becomes the URL:
`slenderline.md` → `/products/slenderline`.

Copy `slenderline.md` to add a product. Use lowercase letters, numbers and hyphens
in filenames, e.g. `sliding-windows.md`. `README.md` is documentation and is not
published as a product.

The YAML frontmatter between the `---` lines holds:

- `name`, `headline`, `summary`: the page heading and introduction.
- `seoDescription`: optional search metadata; defaults to the summary.
- `gallery`: exactly four images, each with `src` and `alt`.
- `specificationsImage`, optional `specificationsSecondaryImage`, and `benefitsImage`: images for the lower sections.
- `catalogueUrl`: optional PDF path or public URL. Without it, the catalogue
  button offers an email request for that product.

Local image/PDF paths start with `/` and refer to files under `public/`.
Remote images must use a hostname allowed in `next.config.ts`.
A quoted headline can use `\n` for a line break.

Keep these level-two section headings exactly as written:

```md
## Overview

Write the product introduction here. **Bold text** and [links](https://example.com)
are supported.

## Specifications

### Profile

- First specification
- Second specification

Optional explanation below the bullets.

### Performance

- Another specification

## Benefits

- First benefit
- Second benefit
```

Add as many level-three specification groups as needed. The shared template
numbers them automatically. Standard Markdown is supported inside each section;
raw HTML is not enabled.

Finally, set the appropriate Expertise card's `href` in
`components/home/products-data.ts` to the new URL. Build/redeploy to publish the
content change. Missing required fields produce a build error with the filename;
unknown product URLs return 404.

Implementation: `lib/products.ts` reads and validates Markdown;
`app/products/[slug]/page.tsx` selects the product; and
`components/products/product-detail-page.tsx` renders the shared design.

## Products listing

`/products` automatically lists every product Markdown file. Optional frontmatter:

```yaml
listingOrder: 1
listingImage:
  src: "/images/home/expertise1.png"
  alt: "Household aluminium solutions"
```

`name` and `summary` provide the card title and description. Cards use
`listingImage`, falling back to the first gallery image. Files without
`listingOrder` appear after ordered entries, alphabetically by name.
Every card links to its own `/products/<filename>` details page.
