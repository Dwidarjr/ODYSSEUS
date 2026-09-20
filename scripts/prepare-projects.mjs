// Case-study assets for the WordPress projects, same treatment as prepare-aqari.mjs:
// screenshots converted to WebP as supplied, plus one cover crop per project taken
// from the top of its home page (same 2.85:1 framing the project pages use).
//
//   node scripts/prepare-projects.mjs ["../Portfolio/Wordpress/"]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "../Portfolio/Wordpress/";
const OUT = "public/assets/projects";
const COVER_ASPECT = 2.85;

const PROJECTS = [
  {
    slug: "jawalize",
    dir: "Jawalize",
    cover: "1.png",
    files: {
      "1.png": "home.webp",
      "2.png": "reviews.webp",
      "3.png": "product.webp",
      "4.png": "article.webp",
      "5.png": "news.webp",
    },
  },
  {
    slug: "woocommerce-gaming-store",
    dir: "Gemcity",
    cover: "1.jpg",
    files: {
      "1.jpg": "home.webp",
      "2.jpg": "home-full.webp",
      "3.jpg": "account.webp",
      "4.jpg": "cart.webp",
      "5.jpg": "wishlist.webp",
    },
  },
  {
    slug: "al-sakina-association",
    dir: "ElSakina",
    cover: "1.png",
    files: {
      "1.png": "home.webp",
      "2.png": "about.webp",
      "3.png": "news-contact.webp",
    },
  },
  {
    slug: "charity-organization",
    dir: "Charity example",
    cover: "1.jpg",
    files: {
      "1.jpg": "home.webp",
      // The reference theme's demo footer carries a foundation name, postal
      // address and phone number. This is a concept project, so the full-page
      // plate stops above that block rather than reproducing those details.
      "2.jpg": { out: "home-full.webp", crop: { left: 0, top: 0, width: 1872, height: 3150 } },
    },
  },
  {
    slug: "plan-b-store",
    dir: "plan-b",
    cover: "1.png",
    files: {
      "1.png": "home.webp",
      "2.png": "top-sellers.webp",
      "3.png": "releases.webp",
      "5.png": "shop.webp",
      "6.png": "product.webp",
    },
  },
];

const manifest = {};

for (const project of PROJECTS) {
  const dir = path.join(SRC, project.dir);
  const out = path.join(OUT, project.slug);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  manifest[project.slug] = {};

  for (const [src, spec] of Object.entries(project.files)) {
    const name = typeof spec === "string" ? spec : spec.out;
    const crop = typeof spec === "string" ? null : spec.crop;
    let img = sharp(path.join(dir, src)).flatten({ background: "#ffffff" });
    if (crop) img = img.extract(crop);
    const { width, height } = await img.webp({ quality: 88, smartSubsample: true }).toFile(path.join(out, name));
    manifest[project.slug][name] = { width, height };
    console.log(project.slug, name, width + "×" + height);
  }

  // Cover: the top of the home page, cropped to the same ratio as every project cover.
  const meta = await sharp(path.join(dir, project.cover)).metadata();
  const height = Math.round(meta.width / COVER_ASPECT);
  const { width: cw, height: ch } = await sharp(path.join(dir, project.cover))
    .flatten({ background: "#ffffff" })
    .extract({ left: 0, top: 0, width: meta.width, height: Math.min(height, meta.height) })
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(out, "cover.webp"));
  manifest[project.slug]["cover.webp"] = { width: cw, height: ch };
  console.log(project.slug, "cover.webp", cw + "×" + ch);
}

// Printed rather than written: these dimensions go into data/projects.ts by hand,
// so nothing generated is left behind in public/.
console.log("\n" + JSON.stringify(manifest, null, 2));
