# Export market map

`export-globe.tsx` now renders a flat dotted SVG world map, replacing the rotating
Three.js globe in the Market section. It retains all existing export destinations
and enquiry links. The original AtomicGlobe module remains available but is no
longer imported by this section.

Visual reference: https://worldmaparc.framer.website/ — curved route reveals,
pulsing location pins, and selectable market details, adapted to Alumex green
on white. Tailwind handles presentation; global keyframes handle route drawing,
pin pulses, and detail reveals. SVG motion paths carry particles along routes.
Reduced motion shows static routes and removes moving particles and pulses.

The map starts its entrance when it enters the viewport. CSS animations pause
outside the viewport. On narrow screens the map scrolls horizontally; country
buttons provide an alternative way to select every destination. Pins support
keyboard focus and selection, and details include email enquiry links.

`public/images/home/export-world-map.svg` is a bundled dotted land asset generated
from world-atlas countries-110m geography:
https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
Source project: https://github.com/topojson/world-atlas (ISC license; geography
from Natural Earth, public domain). Projection is equirectangular, longitude
−180…180 and latitude 85…−60, matching the route and marker coordinates.
No external map service or geography request is needed at runtime.

---

## Original globe implementation

# Export market globe

Source supplied by the user:
https://framer.com/m/AtomicGlobe-SnDdPL.js@BpxtjRcprRbfudB8iUUS

Resolved source:
https://framerusercontent.com/modules/XyVMghtHL6KMTfaGxKNh/BpxtjRcprRbfudB8iUUS/AtomicGlobe.js

`atomic-globe.jsx` retains the supplied component's runtime, baked coastline data,
shaders, entrance formations, pointer effects, rotation physics, route animations,
marker projection, and expandable cards. Only the Framer editor integration and
property controls were removed; keyboard marker controls were added. The original
module names its default component `MeridianGlobe`.

`export-globe.tsx` loads and warms it during idle time before the section enters the viewport. It supplies
an Alumex green palette, Sri Lanka as the route hub, and 19 export markets,
including the requested 17 countries plus the existing Pakistan and Brazil markers.
Default sweep entrance, sonar cursor effect, rotation,
comet routes, adaptive device quality, off-screen render suspension, and reduced
motion handling are retained. Configuration belongs in this wrapper.

Three.js is the only additional runtime dependency. There is no Framer runtime,
iframe, CDN script, or remote asset needed for the globe at page load.

## Scroll performance

The wrapper uses balanced density: approximately 72,000 dots on desktop and
32,400 on low-tier devices. Pixel ratio is capped at 1.5 and 1 respectively.
Original entrance, rotation, pointer effects, animated routes, and cards remain.

`public/data/globe-72000.bin` and `globe-32400.bin` hold deterministic samples
from the original algorithm. They are fetched during idle preparation; duplicate
field and route builds are skipped. Shaders and buffers are warmed before the
section enters view. The RAF loop is cancelled off-screen and restarted on entry.

Regenerate the assets with `node scripts/generate-globe-fields.mjs` after changing
the sampling algorithm or configured density. Custom densities retain the original
sampler as a fallback.
