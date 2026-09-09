/**
 * Importer: Ap van Beek occasions → src/data/vehicles.ts + local images.
 * Source: https://apvanbeek.nl/occasions
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://apvanbeek.nl";
const LISTING = `${BASE}/occasions`;
const IMAGES_ROOT = path.join(ROOT, "public", "images", "cars");
const GARAGE_ROOT = path.join(ROOT, "public", "images", "garage");
const BRAND_ROOT = path.join(ROOT, "public", "images", "brand");
const OUT_FILE = path.join(ROOT, "src", "data", "vehicles.ts");
const MAX_IMAGES = 3;
const CONCURRENCY = 4;

const LOGO_URL =
  "https://dt-dev1.s3.eu-central-1.amazonaws.com/files/75/c3/75c3925d79b05c98d02de19090e20578?position=centered";

/** Site photography from apvanbeek.nl (CDN thumbs of S3 originals). */
const GARAGE_ASSETS = [
  {
    file: "hero.jpg",
    url: "https://cdn.autosociaal.nl/dtweb/images/thumb/b2560x1330/ZHQtZGV2MS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9maWxlcy9hNy81My9hNzUzNWU1MC0zNTdjLTExZWYtODgxMi0wZjc2MDIzMGExZWE=.webp",
  },
  {
    file: "workshop.jpg",
    url: "https://cdn.autosociaal.nl/dtweb/images/thumb/w1090/ZHQtZGV2MS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9maWxlcy9hZC8wZS9hZDBlY2ExMC0zNTdiLTExZWYtOWFhNC05ZDMxZGEyZWVkNWU=.webp",
  },
  {
    file: "showroom-cars.jpg",
    url: "https://cdn.autosociaal.nl/dtweb/images/thumb/w1000/ZHQtZGV2MS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9maWxlcy8wYy9hMi8wY2EyMmE1MC0zNTdkLTExZWYtOWZmYy02OWNkYjk5OGY0M2Q=.webp",
  },
  {
    file: "maintenance.jpg",
    url: "https://cdn.autosociaal.nl/dtweb/images/thumb/w1000/ZHQtZGV2MS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9maWxlcy8yMC9hZi8yMGFmMTNjMC0zNTdkLTExZWYtOTRkMC00ZDNjZDE3NWYzZTc=.webp",
  },
  {
    file: "team.jpg",
    url: "https://cdn.autosociaal.nl/dtweb/images/thumb/w1000/ZHQtZGV2MS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9maWxlcy84ZC8wZS84ZDBlNjYyMC01OTNmLTExZWYtYjU5YS0yYmNlYTMwYzQ5MzE=.webp",
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AutogarageImporter/1.0; +local-dev)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 88);
}

function parseListingCards(html) {
  const re =
    /href="(https:\/\/apvanbeek\.nl\/occasions\/([^/]+)\/([^/]+)\/(\d+))"/gi;
  const cars = [];
  const seen = new Set();
  let m;
  while ((m = re.exec(html))) {
    const [, href, brandSlug, modelSlug, id] = m;
    if (seen.has(id)) continue;
    seen.add(id);
    cars.push({
      id,
      href,
      brandSlug,
      modelSlug,
      brand: brandSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
        .replace(/\bOpel\b/i, "Opel")
        .replace(/\bFord\b/i, "Ford"),
      model: modelSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
        .replace(/\bX\b/, "X"),
    });
  }
  return cars;
}

function field(html, label) {
  const re = new RegExp(
    `<span class="col-6">\\s*${label}\\s*</span>\\s*<strong[^>]*>\\s*([^<]+)`,
    "i",
  );
  const m = html.match(re);
  return m ? decode(m[1].trim()) : "";
}

function mapFuel(raw) {
  const v = String(raw).toLowerCase();
  if (v.includes("elektr")) return "elektrisch";
  if (v.includes("plug") || v.includes("hybride") || v.includes("hybrid"))
    return "hybride";
  if (v.includes("diesel")) return "diesel";
  if (v.includes("lpg")) return "lpg";
  return "benzine";
}

function mapTransmission(raw) {
  return String(raw).toLowerCase().includes("hand")
    ? "handgeschakeld"
    : "automaat";
}

function mapBody(raw, title) {
  const v = `${raw} ${title}`.toLowerCase();
  if (/station|sports tourer|touring|variant|combi/.test(v))
    return "stationwagen";
  if (/suv|crossover|mokka|crossland|grandland|zafira/.test(v)) return "suv";
  if (/coupe|coup/.test(v)) return "coupe";
  if (/cabrio/.test(v)) return "cabriolet";
  if (/mpv|touran/.test(v)) return "mpv";
  if (/bestel|\bvan\b/.test(v)) return "bestelwagen";
  if (/sedan|limousine/.test(v)) return "sedan";
  return "hatchback";
}

function estimatePower({ fuel, variant, powerRaw }) {
  const n = Number(String(powerRaw).replace(/[^\d]/g, ""));
  if (n > 20 && n < 800) return n;
  const t = `${variant}`.toLowerCase();
  if (/130pk|130 pk/.test(t)) return 130;
  if (/1\.6.*gse|plug.?in/.test(t)) return 180;
  if (/1\.2 turbo|1\.2/.test(t)) return 100;
  if (/1\.0 turbo|1\.0 ecoboost|1\.0/.test(t)) return 90;
  if (/1\.4/.test(t)) return 90;
  if (fuel === "hybride") return 145;
  return 100;
}

function extractImages(html) {
  const sizes = ["b1440x1080", "b740x555", "b400x300"];
  for (const size of sizes) {
    const re = new RegExp(
      `https://cdn\\.autosociaal\\.nl/dtweb/\\d+/[^"'?\\s]+_${size}-1x\\.jpg`,
      "gi",
    );
    const urls = [];
    const seen = new Set();
    let m;
    while ((m = re.exec(html))) {
      const url = m[0];
      if (seen.has(url)) continue;
      seen.add(url);
      urls.push(url);
    }
    if (urls.length) return urls.slice(0, MAX_IMAGES);
  }
  return [];
}

function extractVariant(html, model) {
  const subtitle = html.match(
    /section-subtitle[\s\S]{0,200}?<h3[^>]*>\s*([\s\S]*?)\s*<\/h3>/i,
  );
  if (subtitle) {
    const t = stripTags(subtitle[1]);
    if (t && t.length < 120 && !/specificaties|welkom|gelegen/i.test(t)) {
      return t;
    }
  }

  const h2 = html.match(/<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>/i);
  if (h2) {
    const t = stripTags(h2[1]);
    if (
      t &&
      t.length < 120 &&
      !/welkom|gelegen|vestiging|specificaties/i.test(t)
    ) {
      return t;
    }
  }

  return model;
}

function extractPrice(html) {
  const m = html.match(/€\s*([\d.]+)\s*,-/);
  if (m) return Number(m[1].replace(/\./g, ""));
  const m2 = html.match(/€\s*([\d.]+)/);
  return m2 ? Number(m2[1].replace(/\./g, "")) : 0;
}

function extractOptions(html, variant) {
  const fromVariant = String(variant || "")
    .split(/[\s/+-]+/)
    .map((w) => w.trim())
    .filter(
      (w) =>
        w.length > 2 &&
        !/^(met|van|and|the|de|het|een|pk|km)$/i.test(w),
    )
    .slice(0, 8);

  // Prefer dedicated option lists if present
  const panel =
    html.match(
      /(?:Opties|Accessoires|Uitrusting|Highlights)[\s\S]{0,80}?<ul[\s\S]*?<\/ul>/i,
    )?.[0] || "";

  const items = [];
  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(panel))) {
    const item = stripTags(m[1]);
    if (item && item.length > 2 && item.length < 85) items.push(item);
  }

  const combined = [...new Set([...fromVariant, ...items])].slice(0, 10);
  return combined.length
    ? combined
    : ["Airco", "Navigatie", "Bluetooth"];
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AutogarageImporter/1.0)",
      Accept: "image/*,*/*",
    },
  });
  if (!res.ok) throw new Error(`Image ${res.status}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return out;
}

function formatTs(vehicles) {
  const serialize = (v, pad = "  ") => {
    const lines = [`${pad}{`];
    const push = (k, val) => {
      if (typeof val === "string")
        lines.push(`${pad}  ${k}: ${JSON.stringify(val)},`);
      else if (Array.isArray(val) || (val && typeof val === "object"))
        lines.push(`${pad}  ${k}: ${JSON.stringify(val)},`);
      else lines.push(`${pad}  ${k}: ${val},`);
    };
    for (const [k, val] of Object.entries(v)) push(k, val);
    lines.push(`${pad}}`);
    return lines.join("\n");
  };

  return `import type { Vehicle } from "@/types/vehicle";

/** Occasions imported from Ap van Beek voorraad (https://apvanbeek.nl/occasions). */
export const vehicles: Vehicle[] = [
${vehicles.map((v) => serialize(v)).join(",\n")}
];
`;
}

async function processCar(entry, index) {
  await sleep(100 * (index % CONCURRENCY));
  let html = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      html = await fetchText(entry.href);
      break;
    } catch (err) {
      console.warn(`Detail fail ${entry.id} (${attempt}/3): ${err.message}`);
      await sleep(400 * attempt);
    }
  }

  const brand = entry.brand;
  let model = entry.model;
  if (/mokka.?x/i.test(entry.modelSlug)) model = "Mokka X";

  const variant =
    (html &&
      (field(html, "Uitvoering") ||
        field(html, "Type") ||
        extractVariant(html, model))) ||
    model;

  const year = Number(field(html, "Bouwjaar")) || new Date().getFullYear();
  const mileage =
    Number(String(field(html, "Kilometerstand")).replace(/[^\d]/g, "")) || 0;
  const fuelRaw =
    field(html, "Brandstof") || field(html, "Energie") || "Benzine";
  const fuel = mapFuel(fuelRaw);
  const transmission = mapTransmission(
    field(html, "Transmissie") || "Handgeschakeld",
  );
  const color = field(html, "Kleur") || "Onbekend";
  const bodyRaw = field(html, "Carrosserie");
  const powerRaw =
    field(html, "Vermogen") || field(html, "Vermogen (pk)") || "";
  const price = extractPrice(html);
  const bodyType = mapBody(bodyRaw, `${brand} ${model} ${variant}`);
  const power = estimatePower({ fuel, variant, powerRaw });

  const remoteImages = html ? extractImages(html) : [];
  const slug = slugify(`${brand}-${model}-${variant}-${entry.id}`);
  const dir = path.join(IMAGES_ROOT, slug);
  await fs.mkdir(dir, { recursive: true });

  const localImages = [];
  for (let i = 0; i < remoteImages.length; i++) {
    const file = `${String(i + 1).padStart(2, "0")}.jpg`;
    try {
      await downloadImage(remoteImages[i], path.join(dir, file));
      localImages.push(`/images/cars/${slug}/${file}`);
    } catch (err) {
      console.warn(`  img ${entry.id}#${i}: ${err.message}`);
    }
  }

  const options = html ? extractOptions(html, variant) : [];
  const labels = [];
  if (year >= 2025 || mileage < 15000) labels.push("nieuw-binnen");

  const fuelPhrase =
    fuel === "elektrisch"
      ? "Elektrische aandrijving"
      : fuel === "hybride"
        ? "Hybride aandrijving"
        : fuel === "diesel"
          ? "Diesel"
          : "Benzine-aandrijving";

  return {
    id: `v-${String(index + 1).padStart(3, "0")}`,
    slug,
    brand,
    model,
    variant,
    price,
    year,
    mileage,
    fuel,
    transmission,
    power,
    bodyType,
    color,
    images: localImages,
    featured: index < 6,
    status: "available",
    labels,
    description: `${brand} ${model} ${variant} (${year}, ${mileage.toLocaleString("nl-NL")} km). ${fuelPhrase}, ${transmission}, kleur ${color.toLowerCase()}. Beschikbaar bij Garage Ap van Beek in Apeldoorn.`,
    specifications: {
      doors: 5,
      seats: 5,
    },
    options,
    createdAt: new Date(Date.UTC(2026, 8, 9, 10, index)).toISOString(),
  };
}

async function downloadBrandAssets() {
  await fs.mkdir(BRAND_ROOT, { recursive: true });
  await fs.mkdir(GARAGE_ROOT, { recursive: true });

  console.log("Downloading logo…");
  try {
    await downloadImage(LOGO_URL, path.join(BRAND_ROOT, "logo.png"));
  } catch (err) {
    console.warn("Logo download failed:", err.message);
  }

  // Copy logo as svg placeholder is replaced — header may expect .svg; write a note via png and update config to png.
  for (const asset of GARAGE_ASSETS) {
    console.log(`Downloading garage/${asset.file}…`);
    try {
      const dest = path.join(GARAGE_ROOT, asset.file);
      await downloadImage(asset.url, dest);
    } catch (err) {
      console.warn(`  ${asset.file}: ${err.message}`);
    }
  }

  // Reuse downloaded photos for remaining gallery/service slots
  const copies = [
    ["hero.jpg", "workshop-detail.jpg"],
    ["maintenance.jpg", "apk.jpg"],
    ["workshop.jpg", "diagnostics.jpg"],
    ["showroom-cars.jpg", "tires.jpg"],
    ["maintenance.jpg", "airco.jpg"],
    ["workshop.jpg", "brakes.jpg"],
    ["team.jpg", "team-erik.jpg"],
    ["team.jpg", "team-nadia.jpg"],
    ["workshop.jpg", "team-marc.jpg"],
    ["team.jpg", "team-sofie.jpg"],
  ];
  for (const [from, to] of copies) {
    try {
      await fs.copyFile(path.join(GARAGE_ROOT, from), path.join(GARAGE_ROOT, to));
    } catch {
      /* source missing */
    }
  }
}

async function main() {
  await downloadBrandAssets();

  console.log("Fetching listing…");
  const listingHtml = await fetchText(LISTING);
  const entries = parseListingCards(listingHtml);
  console.log(`Found ${entries.length} vehicles`);
  if (!entries.length) throw new Error("No cars parsed from listing");

  await fs.mkdir(IMAGES_ROOT, { recursive: true });
  for (const ent of await fs.readdir(IMAGES_ROOT, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      await fs.rm(path.join(IMAGES_ROOT, ent.name), {
        recursive: true,
        force: true,
      });
    }
  }

  console.log("Scraping details + images…");
  const vehicles = await mapPool(entries, CONCURRENCY, processCar);

  const slugCount = new Map();
  for (const v of vehicles) {
    const n = slugCount.get(v.slug) || 0;
    slugCount.set(v.slug, n + 1);
    if (n > 0) v.slug = `${v.slug}-${n + 1}`;
  }

  await fs.writeFile(OUT_FILE, formatTs(vehicles), "utf8");
  console.log(`Wrote ${vehicles.length} → ${path.relative(ROOT, OUT_FILE)}`);
  console.log(
    "No price:",
    vehicles.filter((v) => !v.price).map((v) => `${v.brand} ${v.model}`).join("; ") ||
      "none",
  );
  console.log(
    "No images:",
    vehicles.filter((v) => !v.images.length).map((v) => v.slug).join("; ") ||
      "none",
  );
  console.log(
    "Brands:",
    [...new Set(vehicles.map((v) => v.brand))].sort().join(", "),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
