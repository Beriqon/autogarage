import fs from "node:fs";
import path from "node:path";

const LISTING =
  "https://occasions.mobilox.nl/2636325-car-service-nederland";
const OUT_DIR = path.resolve("public/images/cars");
const DATA_FILE = path.resolve("src/data/vehicles.ts");
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; CSNOccasionImport/1.0)",
  Accept: "text/html",
};

const BRANDS = [
  "Mercedes-Benz",
  "Land Rover",
  "Alfa Romeo",
  "Aston Martin",
  "Volkswagen",
  "Rolls-Royce",
  "BMW",
  "Mini",
  "Audi",
  "Cupra",
  "Seat",
  "Skoda",
  "Ford",
  "Opel",
  "Peugeot",
  "Renault",
  "Citroen",
  "Toyota",
  "Hyundai",
  "Kia",
  "Volvo",
  "Jeep",
  "Fiat",
  "Suzuki",
  "Mazda",
  "Nissan",
  "Honda",
  "Mitsubishi",
  "Porsche",
  "Tesla",
  "Dacia",
  "Jaguar",
  "Lexus",
  "Subaru",
  "Chevrolet",
  "Dodge",
  "Smart",
  "Polestar",
  "BYD",
  "DS",
  "MG",
];

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textOf(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

async function fetchText(url) {
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

function listingCards(html) {
  const cards = [];
  const rowRe =
    /<div class="d-flex mb-4 mox-product-row[\s\S]*?(?=<div class="d-flex mb-4 mox-product-row|class="pagination|<\/main)/gi;
  const rows = html.match(rowRe) ?? [];
  for (const row of rows) {
    const path = row.match(
      /href=([^\s>]*2636325-car-service-nederland\/[0-9]+-[^"'\s>]+)/i,
    )?.[1];
    if (!path) continue;
    const href = path.startsWith("http")
      ? path
      : `https://occasions.mobilox.nl${path.startsWith("/") ? path : `/${path}`}`;
    const title = textOf(
      row.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? "",
    );
    const sold = /verkocht\.png/i.test(row);
    const price = bestPrice(textOf(row));
    const btw = /Incl\.\s*BTW|BTW-auto/i.test(textOf(row));
    if (!cards.some((card) => card.href === href)) {
      cards.push({ href, title, sold, price, btw });
    }
  }
  return cards;
}

function lastPage(html) {
  const pages = [...html.matchAll(/[?&]page=(\d+)/g)].map((match) =>
    Number(match[1]),
  );
  return Math.max(1, ...pages, 1);
}

function bestPrice(source, fallback = 0) {
  const labeled = source.match(
    /(?:Marge|Incl\.\s*BTW|BTW)\s*€\s*(?:&nbsp;)?\s*([\d.]+)/i,
  );
  if (labeled) return Number(labeled[1].replace(/\./g, ""));
  const values = [...source.matchAll(/€\s*(?:&nbsp;)?\s*([\d.]+)/g)]
    .map((match) => Number(match[1].replace(/\./g, "")))
    .filter((value) => value >= 1000);
  if (values.length) return Math.max(...values);
  return fallback;
}

function grab(text, pattern) {
  return text.match(pattern)?.[1]?.trim();
}

function mapFuel(raw) {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("elektr")) return "elektrisch";
  if (value.includes("hybride") || value.includes("plug")) return "hybride";
  if (value.includes("diesel")) return "diesel";
  if (value.includes("lpg")) return "lpg";
  return "benzine";
}

function mapTransmission(raw) {
  return /hand/i.test(raw ?? "") ? "handgeschakeld" : "automaat";
}

function mapBody(raw, title) {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("station") || value.includes("variant")) return "stationwagen";
  if (value.includes("hatch") || value.includes("liftback")) return "hatchback";
  if (value.includes("sedan") || value.includes("limousine")) return "sedan";
  if (value.includes("suv") || value.includes("terrein") || value.includes("crossover")) {
    return "suv";
  }
  if (value.includes("mpv") || value.includes("bus") || value.includes("personenbus")) {
    return "mpv";
  }
  if (value.includes("coup")) return "coupe";
  if (value.includes("cabrio") || value.includes("roadster")) return "cabriolet";
  if (value.includes("bestel")) return "bestelwagen";
  const name = title.toLowerCase();
  if (/touring|variant|avant|sports tourer|sportstourer/.test(name)) return "stationwagen";
  if (/glc|gla|gle|compass|suv|x1|x3|x5|q3|q5|q7|kuga|tiguan|tucson/.test(name)) {
    return "suv";
  }
  if (/zafira|touran|berlingo|caddy|mpv/.test(name)) return "mpv";
  if (/cabrio|roadster/.test(name)) return "cabriolet";
  if (/coupe|coupé|cla/.test(name)) return "coupe";
  if (/limousine|e-klasse|s-klasse|5-serie|3-serie|a6|a4|s-350/.test(name)) {
    return "sedan";
  }
  return "hatchback";
}

function parseIdentity(title) {
  const cleaned = title.replace(/\s+/g, " ").trim();
  const normalized = cleaned.replace(
    /^mercedes(?:\s*-\s*|\s+)benz/i,
    "Mercedes-Benz",
  );
  const brand =
    BRANDS.find((item) =>
      normalized.toLowerCase().startsWith(item.toLowerCase()),
    ) ?? normalized.split(" ")[0];
  let rest = normalized.slice(brand.length).trim();
  const modelMatch = rest.match(
    /^(Up!|\d-serie(?:\s+Touring)?|Passat(?:\s+Variant)?|A\d(?:\s+Limousine|\s+Sportback|\s+Avant)?|Zafira(?:\s+Tourer)?|E-klasse|A-klasse|C-klasse|S-klasse|GLC|GLA|GLE|GLB|CLA|Golf|Polo|Tiguan|Caddy|Touran|Corsa|Astra|Mokka|Fiesta|Focus(?:\s+Wagon)?|Ibiza|Leon|Compass|Renegade|[A-Za-z0-9][A-Za-z0-9.+!-]*)/i,
  );
  const model = (modelMatch?.[1] ?? rest.split(/[\s|/]/)[0] ?? "Occasion").trim();
  rest = rest.slice(model.length).replace(/^[\s|/:-]+/, "").trim();
  const variant = rest.replace(/\s+/g, " ");
  return { brand, model, variant: variant || model };
}

function powerFrom(text, title) {
  const pk = grab(text, /Vermogen\s+(\d+)\s*kW\s*\/\s*(\d+)\s*PK/i);
  if (pk) return Number(text.match(/Vermogen\s+\d+\s*kW\s*\/\s*(\d+)\s*PK/i)[1]);
  const titlePk = title.match(/(\d+)\s*PK/i);
  if (titlePk) return Number(titlePk[1]);
  const titleKw = title.match(/(\d+)\s*KW/i);
  if (titleKw) return Math.round(Number(titleKw[1]) * 1.35962);
  const kwOnly = text.match(/Vermogen\s+(\d+)\s*kW/i);
  if (kwOnly) return Math.round(Number(kwOnly[1]) * 1.35962);
  return null;
}

function slugFrom(href, title) {
  const tail = href.split("/").pop() ?? "";
  const slug = tail
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function imageUrls(html) {
  const urls = [];
  for (const match of html.matchAll(
    /https:\/\/api\.mobilox\.nl\/media\/cache\/resolve\/[^"'\s]+/gi,
  )) {
    const url = decode(match[0]);
    if (!/\.(?:jpeg|jpg|webp)(?:\?|$)/i.test(url)) continue;
    if (!urls.includes(url)) urls.push(url);
  }
  const clean = urls.filter((url) => !/verkocht\.png/i.test(url));
  return (clean.length ? clean : urls).slice(0, 3);
}

function optionsFrom(variant) {
  return [
    ...new Set(
      variant
        .split(/[|/]/)
        .map((part) => part.trim())
        .filter((part) => part.length > 1 && part.length < 42),
    ),
  ].slice(0, 8);
}

function formatKm(mileage) {
  return new Intl.NumberFormat("nl-NL").format(mileage);
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

async function download(url, file) {
  const response = await fetch(url, {
    headers: {
      ...HEADERS,
      Accept: "image/avif,image/webp,image/*,*/*",
      Referer: "https://www.csnauto.nl/",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buffer);
}

function tsString(value) {
  return JSON.stringify(value);
}

async function main() {
  const firstHtml = await fetchText(LISTING);
  const pages = lastPage(firstHtml);
  const htmls = [firstHtml];
  for (let page = 2; page <= pages; page += 1) {
    htmls.push(await fetchText(`${LISTING}?page=${page}`));
  }
  const cards = htmls.flatMap(listingCards);
  const known = new Set(cards.map((card) => card.href));
  for (const html of htmls) {
    for (const match of html.matchAll(
      /2636325-car-service-nederland\/(\d+-[a-z0-9-]+)/gi,
    )) {
      const href = `https://occasions.mobilox.nl/2636325-car-service-nederland/${match[1]}`;
      if (!known.has(href)) {
        known.add(href);
        cards.push({ href, title: "", sold: false, price: 0, btw: false });
      }
    }
  }
  console.log(`pages=${pages} cars=${cards.length}`);
  if (cards.length < 20) {
    throw new Error("Too few cars parsed from listing");
  }

  const detailed = await mapPool(cards, 6, async (card, index) => {
    const html = await fetchText(card.href);
    const text = textOf(html);
    const title =
      textOf(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "") ||
      card.title;
    const identity = parseIdentity(title);
    const mileage = Number(
      (grab(text, /Tellerstand\s+([\d.]+)\s*KM/i) ?? "0").replace(/\./g, ""),
    );
    const year = Number(
      grab(text, /Bouwjaar\s+((?:19|20)\d{2})/i) ??
        grab(text, /eerste toelating \(internationaal\)\s+\d{2}-\d{2}-((?:19|20)\d{2})/i) ??
        "0",
    );
    const fuel = mapFuel(
      grab(text, /Motor en transmissie\s+Brandstof\s+([A-Za-z][A-Za-z -]+?)(?=\s+Transmissie|\s+Aantal)/i) ??
        grab(text, /Brandstof\s+(Benzine|Diesel|Hybride(?:\s+Benzine)?|Elektrisch|LPG)/i),
    );
    const transmission = mapTransmission(
      grab(text, /Transmissie\s+(Automaat|Handgeschakeld|Handmatig)/i),
    );
    const bodyType = mapBody(
      grab(text, /Carrosserie\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ /+-]+?)(?=\s+Kleur|\s+Aantal|\s+Gewicht)/i),
      title,
    );
    const color =
      grab(
        text,
        /Kleur\s+([A-Za-zÀ-ÿ]+(?:\s+(?!bekleding|interieur)[A-Za-zÀ-ÿ]+)?)(?=\s+bekleding|\s+interieur|\s+Aantal|\s+Gewicht|\s+Motor)/i,
      ) ?? "Onbekend";
    const doors = Number(grab(text, /Aantal deuren\s+(\d+)/i) ?? "");
    const seats = Number(grab(text, /Aantal zitplaatsen\s+(\d+)/i) ?? "");
    const cc = Number(grab(text, /Cilinderinhoud\s+(\d+)\s*cc/i) ?? "");
    const topSpeed = grab(text, /Topsnelheid\s+(\d+)\s*km\/h/i);
    const acceleration = grab(text, /Acceleratie \(0-100 km\/h\)\s+([\d.]+)\s*seconden/i);
    const consumption = grab(text, /Gemiddeld verbruik\s+([\d.,]+)\s*l\/100km/i);
    const weight = grab(text, /Gewicht\s+(\d+)\s*kg/i);
    const price = bestPrice(text, card.price);
    const btw = /BTW of Marge\s+BTW/i.test(text) || card.btw;
    const sold = card.sold || /\bverkocht\b/i.test(text.slice(0, 800));
    const power = powerFrom(text, title) ?? 0;
    const slug = slugFrom(card.href, title);
    const images = imageUrls(html);
    const fuelLabel =
      fuel === "hybride"
        ? "Hybride"
        : fuel === "elektrisch"
          ? "Elektrisch"
          : fuel === "diesel"
            ? "Diesel"
            : fuel === "lpg"
              ? "LPG"
              : "Benzine";
    const transmissionLabel =
      transmission === "automaat" ? "automaat" : "handgeschakeld";
    console.log(
      `${index + 1}/${cards.length} ${identity.brand} ${identity.model} €${price} ${sold ? "SOLD" : "ok"} imgs=${images.length}`,
    );
    return {
      card,
      title,
      identity,
      mileage,
      year,
      fuel,
      transmission,
      bodyType,
      color,
      doors,
      seats,
      cc,
      topSpeed,
      acceleration,
      consumption,
      weight,
      price,
      btw,
      sold,
      power,
      slug,
      images,
      fuelLabel,
      transmissionLabel,
    };
  });

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const vehicles = [];
  let featuredLeft = 4;
  for (const [index, item] of detailed.entries()) {
    const localImages = [];
    for (const [imageIndex, url] of item.images.entries()) {
      const filename = String(imageIndex + 1).padStart(2, "0") + ".jpg";
      const relative = `/images/cars/${item.slug}/${filename}`;
      try {
        await download(url, path.join("public", relative));
        localImages.push(relative);
      } catch (error) {
        console.warn("image failed", item.slug, error.message);
      }
    }
    const featured = !item.sold && featuredLeft > 0;
    if (featured) featuredLeft -= 1;
    const specs = {};
    if (Number.isFinite(item.doors) && item.doors > 0) specs.doors = item.doors;
    if (Number.isFinite(item.seats) && item.seats > 0) specs.seats = item.seats;
    if (Number.isFinite(item.cc) && item.cc > 0) {
      specs.engineSize = (item.cc / 1000).toFixed(1).replace(".", ",");
    }
    if (item.weight) specs.weight = `${item.weight} kg`;
    if (item.consumption) specs.consumption = `${item.consumption.replace(".", ",")} l/100 km`;
    if (item.acceleration) specs.acceleration = `${item.acceleration.replace(".", ",")} s`;
    if (item.topSpeed) specs.topSpeed = `${item.topSpeed} km/u`;

    const created = new Date(Date.UTC(2026, 8, 23, 12, 0, 0) - index * 60_000);
    vehicles.push({
      id: `v-${String(index + 1).padStart(3, "0")}`,
      slug: item.slug,
      brand: item.identity.brand,
      model: item.identity.model,
      variant: item.identity.variant,
      price: item.price,
      year: item.year,
      mileage: item.mileage,
      fuel: item.fuel,
      transmission: item.transmission,
      power: item.power,
      bodyType: item.bodyType,
      color: item.color,
      images: localImages,
      featured,
      status: item.sold ? "sold" : "available",
      labels: item.btw ? ["btw-auto"] : [],
      description: `${item.identity.brand} ${item.identity.model} ${item.identity.variant} (${item.year}, ${formatKm(item.mileage)} km). ${item.fuelLabel}, ${item.transmissionLabel}, kleur ${item.color.toLowerCase()}. Staat bij Car Service Nederland in Apeldoorn.`,
      specifications: specs,
      options: optionsFrom(item.identity.variant),
      createdAt: created.toISOString(),
    });
  }

  const body = vehicles
    .map((vehicle) => {
      const lines = [
        "  {",
        `    id: ${tsString(vehicle.id)},`,
        `    slug: ${tsString(vehicle.slug)},`,
        `    brand: ${tsString(vehicle.brand)},`,
        `    model: ${tsString(vehicle.model)},`,
        `    variant: ${tsString(vehicle.variant)},`,
        `    price: ${vehicle.price},`,
        `    year: ${vehicle.year},`,
        `    mileage: ${vehicle.mileage},`,
        `    fuel: ${tsString(vehicle.fuel)},`,
        `    transmission: ${tsString(vehicle.transmission)},`,
        `    power: ${vehicle.power},`,
        `    bodyType: ${tsString(vehicle.bodyType)},`,
        `    color: ${tsString(vehicle.color)},`,
        `    images: ${tsString(vehicle.images)},`,
        `    featured: ${vehicle.featured},`,
        `    status: ${tsString(vehicle.status)},`,
        `    labels: ${tsString(vehicle.labels)},`,
        `    description: ${tsString(vehicle.description)},`,
        `    specifications: ${tsString(vehicle.specifications)},`,
        `    options: ${tsString(vehicle.options)},`,
        `    createdAt: ${tsString(vehicle.createdAt)},`,
        "  },",
      ];
      return lines.join("\n");
    })
    .join("\n");

  const file = `import type { Vehicle } from "@/types/vehicle";

/** Occasions from Car Service Nederland (https://www.csnauto.nl/occasions). */
export const vehicles: Vehicle[] = [
${body}
];
`;
  fs.writeFileSync(DATA_FILE, file);
  const available = vehicles.filter((vehicle) => vehicle.status === "available").length;
  console.log(`wrote ${vehicles.length} vehicles, available ${available}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
