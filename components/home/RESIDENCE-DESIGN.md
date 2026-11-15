# Alumex residence design

The homepage in `residence-home.tsx` uses the editorial direction of https://www.era-residence.com/: plum, warm paper and powder blue; oversized serif typography; circular navigation; clipped architectural imagery; parallax photography; a draggable product gallery; and staggered viewport reveals.

All company copy, product destinations and imagery come from the existing Alumex project. Unavailable Cloudinary gallery images are replaced with local product images. No ERA property copy, branding, photos or proprietary scripts are shipped.

Shared navigation and footer serve the existing product, company, project and contact routes. The existing ALUQ assistant remains available. Motion uses the existing Motion and Lenis dependencies. Reduced-motion preferences disable scroll transformations and ornamental animation; tabs, navigation and gallery controls support keyboard interaction.

`app/residence.css` contains the new presentation styles. `public/fonts` contains locally hosted open-source fonts, so production builds do not need a Google Fonts connection. Font licensing is included alongside the files.

## Expanded motion sequences

`motion-scenes.tsx` adds the previously missing rising powder-blue dome with curved, rotating SVG text and spreading word spacing, scroll-lifted three-card composition, reversible pinned horizontal journey, 3D staggered character reveals, a cinematic arch-to-fullscreen video reveal, five scroll-selected detail photographs with a zoom-through exit, an image lightbox with zoom and keyboard controls, and separating architecture panels. The closing photograph shrinks into the plum background before the footer. Circles have magnetic pointer response; labels roll on hover; section rules draw in; hotspots pulse; the preloader opens through an elliptical aperture.

The original hero film is retained at `public/videos/alumex-original-hero.mp4`, downloaded unchanged from the project's original hero URL. Playback pauses offscreen and has an explicit play/pause control. Reduced-motion mode removes pinned travel, character rotation and decorative loops, while keeping the video manually playable and all detail tabs accessible.
