// Bake the original deterministic AtomicGlobe fields for the configured balanced density.
// Run after changing the supplied globe's coastline or sampling algorithm.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../components/home/globe/atomic-globe.jsx", import.meta.url), "utf8");
const sampling = source.slice(source.indexOf("const GRID_COLS="), source.indexOf("/* ------------------------------------------------------------------ *\n * Shaders"));
await mkdir(new URL("../public/data/", import.meta.url), { recursive: true });
for (const requested of [72000, 32400]) {
  const field = runInNewContext(`${sampling}; globalThis.field = scatterLandDots(${requested});`, {});
  const output = Buffer.alloc(8 + field.count * 20);
  output.writeUInt32LE(requested, 0);
  output.writeUInt32LE(field.count, 4);
  let offset = 8;
  for (const array of [field.position, field.seed, field.coast]) {
    Buffer.from(array.buffer, array.byteOffset, array.byteLength).copy(output, offset);
    offset += array.byteLength;
  }
  await writeFile(new URL(`../public/data/globe-${requested}.bin`, import.meta.url), output);
  console.log(`Globe ${requested}: ${field.count} original dots, ${output.byteLength} bytes`);
}
