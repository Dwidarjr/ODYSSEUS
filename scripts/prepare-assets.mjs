// Asset pipeline: copies the supplied source assets into public/assets with
// semantic names, separates the hero statue from its baked-in terracotta disc
// so the two can live on independent layers, and derives every logo size
// (nav mark, favicon, apple touch icon) from the single logo source.
//
//   node scripts/prepare-assets.mjs ["../img/"]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "../img/";
const OUT = "public/assets";
fs.mkdirSync(OUT, { recursive: true });

const MAP = {
  "me.png": "hero-me-source.png",
  "ChatGPT Image Sep 18, 2026, 11_01_17 PM.png": "call-bust.png",
  "ChatGPT Image Sep 19, 2026, 12_12_23 AM.png": "tool-code.png",
  "ChatGPT Image Sep 19, 2026, 12_12_19 AM.png": "tool-design.png",
  "ChatGPT Image Sep 19, 2026, 12_12_11 AM.png": "tool-business.png",
  "ChatGPT Image Sep 19, 2026, 12_12_14 AM.png": "tool-numbers.png",
  "ChatGPT Image Sep 19, 2026, 12_12_07 AM.png": "journey-wide.png",
  "ChatGPT Image Sep 19, 2026, 12_12_03 AM.png": "journey-tall.png",
  "ChatGPT Image Sep 19, 2026, 12_11_55 AM.png": "horizon-wide.png",
  "ChatGPT Image Sep 19, 2026, 12_11_50 AM.png": "horizon-lighthouse.png",
};

// Transparent pixels in the sources still carry RGB "glow" data; zero it so
// resampling never bleeds it back in at the edges.
async function cleanAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) data[i] = data[i + 1] = data[i + 2] = 0;
  }
  return { data, info };
}

for (const [src, dst] of Object.entries(MAP)) {
  const from = path.join(SRC, src);
  const to = path.join(OUT, dst);
  const meta = await sharp(from).metadata();
  if (meta.hasAlpha) {
    const { data, info } = await cleanAlpha(from);
    await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(to);
  } else {
    fs.copyFileSync(from, to);
  }
  console.log("copied", dst);
}

/* ---------- Hero backdrop: ruins + column (background.png) ---------- */

await sharp(path.join(SRC, "background.png"))
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(OUT, "hero-background.jpg"));
console.log("hero-background.jpg");

/* ---------- Hero: separate statue (me.png) from its terracotta disc ---------- */

// Measured in me.png: marble sits at r/g ≤ 1.3 (sat ≤ 0.35), the disc at
// r/g ≥ 1.7 (sat ≥ 0.6) — nothing in between, so a soft ramp separates them.
const DISC = { cx: 525.5, cy: 286.5, r: 261.5 };
const ramp = (v, a, b) => Math.min(1, Math.max(0, (v - a) / (b - a)));
const terracottaAmount = (r, g, b) => {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (!max || r < g || r < b) return 0;
  return ramp(r / Math.max(g, 1), 1.45, 1.65) * ramp((max - min) / max, 0.4, 0.55);
};

{
  const { data, info } = await cleanAlpha(path.join(OUT, "hero-me-source.png"));
  const { width: W, height: H } = info;
  const statue = Buffer.from(data);
  const discMask = new Uint8Array(W * H);

  for (let p = 0, i = 0; p < W * H; p++, i += 4) {
    const a = data[i + 3];
    if (!a) continue;
    const x = p % W, y = (p / W) | 0;
    const inside = (x - DISC.cx) ** 2 + (y - DISC.cy) ** 2 <= (DISC.r + 4) ** 2;
    const t = inside ? terracottaAmount(data[i], data[i + 1], data[i + 2]) : 0;
    if (t > 0.6) discMask[p] = 1;
    statue[i + 3] = Math.round(a * (1 - t));
  }

  // Drop isolated specks left in the statue layer.
  const a0 = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) a0[p] = statue[p * 4 + 3];
  const R = 3;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (!a0[p]) continue;
      let solid = 0, total = 0;
      for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
        total++;
        if (a0[yy * W + xx] > 128) solid++;
      }
      if (solid / total < 0.35) statue[p * 4 + 3] = 0;
    }
  }
  await sharp(statue, { raw: info }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "hero-me.png"));

  // Rebuild a complete disc: visible terracotta, the hidden part filled with a
  // soft blur of it (only ever seen if parallax exposes an edge), clipped round.
  const { cx, cy, r } = DISC;
  const minX = cx - r, minY = cy - r;
  const eroded = new Uint8Array(W * H);
  const E = 3;
  for (let y = E; y < H - E; y++) for (let x = E; x < W - E; x++) {
    let ok = discMask[y * W + x];
    for (let dy = -E; ok && dy <= E; dy++) for (let dx = -E; ok && dx <= E; dx++) if (!discMask[(y + dy) * W + x + dx]) ok = 0;
    eroded[y * W + x] = ok;
  }
  const D = Math.ceil(r * 2);
  const discPx = Buffer.alloc(D * D * 4);
  for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
    const sx = Math.round(minX + x), sy = Math.round(minY + y);
    const o = (y * D + x) * 4;
    if (sx >= 0 && sy >= 0 && sx < W && sy < H && eroded[sy * W + sx]) {
      const i = (sy * W + sx) * 4;
      discPx[o] = data[i]; discPx[o + 1] = data[i + 1]; discPx[o + 2] = data[i + 2]; discPx[o + 3] = 255;
    }
  }
  let sr = 0, sg = 0, sb = 0, n = 0;
  for (let o = 0; o < discPx.length; o += 4) if (discPx[o + 3]) { sr += discPx[o]; sg += discPx[o + 1]; sb += discPx[o + 2]; n++; }
  const avg = { r: Math.round(sr / n), g: Math.round(sg / n), b: Math.round(sb / n) };
  const visible = await sharp(discPx, { raw: { width: D, height: D, channels: 4 } }).png().toBuffer();
  const blurred = await sharp(discPx, { raw: { width: D, height: D, channels: 4 } })
    .flatten({ background: avg })
    .blur(24)
    .png()
    .toBuffer();
  const circleMask = Buffer.from(
    `<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2 - 1}" fill="#fff"/></svg>`
  );
  await sharp({ create: { width: D, height: D, channels: 4, background: { ...avg, alpha: 1 } } })
    .composite([{ input: blurred }, { input: visible }, { input: circleMask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "hero-me-disc.png"));
  console.log("hero-me.png + hero-me-disc.png", { disc: DISC, avg });
  fs.rmSync(path.join(OUT, "hero-me-source.png"), { force: true });
}

/* ---------- Open Graph card: backdrop + disc + statue ---------- */
{
  const bg = sharp(path.join(OUT, "hero-background.jpg"));
  const { width: BW, height: BH } = await bg.metadata();
  // 1200×630 crop from the right-hand part of the backdrop, statue centred at 62%.
  const scale = 630 / BH;
  const bgW = Math.round(BW * scale);
  const backdrop = await sharp(path.join(OUT, "hero-background.jpg")).resize(bgW, 630).toBuffer();
  const left = Math.max(0, Math.min(bgW - 1200, Math.round(bgW * 0.55 - 600)));
  const base = await sharp(backdrop).extract({ left, top: 0, width: 1200, height: 630 }).toBuffer();
  const sH = 600, sW = Math.round(sH / 1.5);
  const sx = Math.round(1200 * 0.62 - sW / 2), sy = 630 - sH;
  const statue = await sharp(path.join(OUT, "hero-me.png")).resize(sW, sH).png().toBuffer();
  const discD = Math.round((sW * 2 * DISC.r) / 1024);
  const disc = await sharp(path.join(OUT, "hero-me-disc.png")).resize(discD, discD).png().toBuffer();
  await sharp(base)
    .composite([
      { input: disc, left: sx + Math.round(((DISC.cx - DISC.r) / 1024) * sW), top: sy + Math.round(((DISC.cy - DISC.r) / 1536) * sH) },
      { input: statue, left: sx, top: sy },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile("public/og.jpg");
  console.log("og.jpg");
}

/* ---------- Logo: one source → nav mark + favicon + apple icon ---------- */
{
  // Trim the transparent margin once; every size is derived from this.
  const logo = await sharp(path.join(SRC, "logo.png")).trim({ threshold: 1 }).png().toBuffer();
  const { width, height } = await sharp(logo).metadata();
  // Nav / footer mark: 2× the largest display size (48px tall).
  await sharp(logo).resize({ height: 96 }).webp({ quality: 90 }).toFile(path.join(OUT, "logo.webp"));
  // Favicon & apple icon: Next serves app/icon.png and app/apple-icon.png automatically.
  const square = (size, bg) =>
    sharp(logo)
      .resize(Math.round(size * 0.84), Math.round(size * 0.84), { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: Math.round(size * 0.08), bottom: size - Math.round(size * 0.84) - Math.round(size * 0.08),
        left: Math.round(size * 0.08), right: size - Math.round(size * 0.84) - Math.round(size * 0.08),
        background: bg,
      })
      .flatten(bg.alpha === 0 ? false : { background: bg })
      .png({ compressionLevel: 9 });
  // Favicon keeps the logo's own transparency. The apple icon stays on the ink
  // background: iOS fills transparent touch icons with black anyway.
  await square(64, { r: 0, g: 0, b: 0, alpha: 0 }).toFile("app/icon.png");
  await square(180, { r: 18, g: 17, b: 15, alpha: 1 }).toFile("app/apple-icon.png");
  console.log("logo.webp, app/icon.png, app/apple-icon.png", { trimmed: [width, height] });
}

/* ---------- Tool busts: trim empty margins so all four share one scale ---------- */
for (const name of ["tool-code", "tool-design", "tool-business", "tool-numbers"]) {
  const file = path.join(OUT, name + ".png");
  const buf = await sharp(file).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(file, buf);
  const m = await sharp(buf).metadata();
  console.log("trimmed", name, m.width, m.height);
}

console.log("done");
