// Aqari case-study assets: converts the supplied screenshots for the web.
//
//   node scripts/prepare-aqari.mjs ["../Portfolio/Aqari/"]
//
// Screenshots are used as supplied. Two edits only:
//  - the admin screenshot (E7) shows a personal email address in the top
//    bar and sidebar; that text is painted over with the surrounding colour;
//  - cover.webp is a straight crop of the home page hero (E1), no retouching.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "../Portfolio/Aqari/";
const OUT = "public/assets/projects/aqari";
// Start clean so no screenshot from an earlier set lingers. Filenames carry the
// language (-en) so image caches never serve an earlier set under the same URL.
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const MAP = {
  "E1.png": "home-en.webp",
  "E2.png": "buy-en.webp",
  "E3.png": "rent-en.webp",
  "E4.png": "contact-en.webp",
  "E5.png": "property-en.webp",
  "E6.png": "submit-en.webp",
  "E7.png": "admin-properties-en.webp",
};

// Measured bounding boxes of the email text, padded a few px.
const REDACT = {
  "E7.png": [
    { left: 1758, top: 22, width: 134, height: 22, color: { r: 255, g: 255, b: 255 } },
    { left: 20, top: 976, width: 114, height: 22, color: { r: 13, g: 25, b: 44 } },
  ],
};

for (const [src, dst] of Object.entries(MAP)) {
  const patches = (REDACT[src] ?? []).map(({ left, top, width, height, color }) => ({
    input: { create: { width, height, channels: 3, background: color } },
    left,
    top,
  }));
  const img = sharp(path.join(SRC, src)).flatten({ background: "#ffffff" });
  const { width, height } = await img
    .composite(patches)
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(OUT, dst));
  console.log(dst, width, height);
}

// Cover: the home page hero (navigation, headline, search) — 1910 × 670.
await sharp(path.join(SRC, "E1.png"))
  .flatten({ background: "#ffffff" })
  .extract({ left: 0, top: 0, width: 1910, height: 670 })
  .webp({ quality: 88, smartSubsample: true })
  .toFile(path.join(OUT, "cover-en.webp"));
console.log("cover-en.webp 1910 670");
