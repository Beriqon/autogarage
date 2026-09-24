import fs from "node:fs";

const DATA_FILE = "src/data/vehicles.ts";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; CSNOccasionImport/1.0)",
  Accept: "text/html",
};

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function attributesIn(html) {
  const rows = [];
  const re =
    /<span class="mox-attribute-label[^"]*">([^<]*)<\/span>\s*<b class="mox-attribute-value[^"]*">([\s\S]*?)<\/b>/gi;
  for (const match of html.matchAll(re)) {
    const label = decode(match[1]);
    const value = decode(match[2]);
    if (!label || !value || value === "-" || value === "–") continue;
    rows.push({ label, value });
  }
  return rows;
}

function uniqueRows(rows) {
  const seen = new Set();
  const result = [];
  for (const row of rows) {
    const key = `${row.label}|${row.value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(row);
  }
  return result;
}

function optionGroupsFrom(html) {
  const groups = [];
  const parts = html.split('<div class=mox-accessorygroup>');
  for (const part of parts.slice(1)) {
    const title = decode(part.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? "");
    const items = [];
    const seen = new Set();
    for (const match of part.matchAll(/mox-accessory-name">([\s\S]*?)</gi)) {
      const item = decode(match[1]);
      if (!item || seen.has(item)) continue;
      seen.add(item);
      items.push(item);
    }
    if (title && items.length > 0) groups.push({ title, items });
  }
  return groups;
}

function numberFrom(value) {
  const digits = value?.replace(/[^\d]/g, "");
  const parsed = Number(digits);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function specsFrom(rows, plate) {
  const find = (label) =>
    rows.find((row) => row.label.toLowerCase() === label.toLowerCase())?.value;
  const doors = numberFrom(find("Aantal deuren"));
  const seats = numberFrom(find("Aantal zitplaatsen"));
  const cc = numberFrom(find("Cilinderinhoud"));
  const cylinders = numberFrom(find("Aantal cilinders"));
  const keys = numberFrom(find("Aantal sleutels"));
  const remotes = numberFrom(find("Aantal handzenders"));
  const power = find("Vermogen") ?? "";
  const kw = Number(power.match(/(\d+)\s*kW/i)?.[1] ?? "");
  const specs = {};
  if (doors) specs.doors = doors;
  if (seats) specs.seats = seats;
  if (cc) specs.engineSize = (cc / 1000).toFixed(1).replace(".", ",");
  if (find("Gewicht")) specs.weight = find("Gewicht");
  if (find("Gemiddeld verbruik")) {
    specs.consumption = find("Gemiddeld verbruik").replace(".", ",");
  }
  if (find("Acceleratie (0-100 km/h)")) {
    specs.acceleration = find("Acceleratie (0-100 km/h)")
      .replace(" seconden", " s")
      .replace(".", ",");
  }
  if (find("Topsnelheid")) {
    specs.topSpeed = find("Topsnelheid").replace("km/h", "km/u");
  }
  if (plate) specs.licensePlate = plate;
  if (find("BTW of Marge")) specs.vatOrMargin = find("BTW of Marge");
  if (find("Datum eerste toelating")) {
    specs.registrationDate = find("Datum eerste toelating");
  }
  if (find("Datum eerste toelating (internationaal)")) {
    specs.registrationDateIntl = find("Datum eerste toelating (internationaal)");
  }
  if (find("APK vervaldatum")) specs.apkUntil = find("APK vervaldatum");
  if (cylinders) specs.cylinders = cylinders;
  if (Number.isFinite(kw) && kw > 0) specs.powerKw = kw;
  if (find("Koppel")) specs.torque = find("Koppel");
  if (find("Maximum aantal toeren per minuut")) {
    specs.maxRpm = find("Maximum aantal toeren per minuut");
  }
  if (find("Motorrijtuigenbelasting")) specs.roadTax = find("Motorrijtuigenbelasting");
  if (keys) specs.keys = keys;
  if (remotes) specs.remotes = remotes;
  return specs;
}

function sectionsFrom(generalHtml, motorHtml, plate) {
  const general = uniqueRows(attributesIn(generalHtml));
  const motor = uniqueRows(attributesIn(motorHtml));
  if (plate && !general.some((row) => row.label === "Kenteken")) {
    general.unshift({ label: "Kenteken", value: plate });
  }
  const sections = [];
  if (general.length > 0) sections.push({ title: "Algemeen", rows: general });
  if (motor.length > 0) sections.push({ title: "Motor en transmissie", rows: motor });
  return sections;
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

const source = fs.readFileSync(DATA_FILE, "utf8");
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
console.log(`cars=${slugs.length}`);

const details = await mapPool(slugs, 6, async (slug, index) => {
  const url = `https://occasions.mobilox.nl/2636325-car-service-nederland/${slug}`;
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) {
    console.warn(`${index + 1} FAIL ${response.status} ${slug}`);
    return { slug, specifications: null, specSections: [], optionGroups: [] };
  }
  const html = await response.text();
  const plate = decode(
    html.match(/mox-license-plate-body>([^<]+)</i)?.[1] ?? "",
  );
  const splitAt = html.indexOf("Motor en transmissie");
  const generalHtml = splitAt === -1 ? html : html.slice(0, splitAt);
  const motorHtml = splitAt === -1 ? "" : html.slice(splitAt);
  const rows = uniqueRows([
    ...(plate ? [{ label: "Kenteken", value: plate }] : []),
    ...attributesIn(html),
  ]);
  const specifications = specsFrom(rows, plate);
  const specSections = sectionsFrom(generalHtml, motorHtml, plate);
  const optionGroups = optionGroupsFrom(html);
  console.log(
    `${index + 1}/${slugs.length} ${slug} specs=${specSections.reduce((sum, section) => sum + section.rows.length, 0)} groups=${optionGroups.length}`,
  );
  return { slug, specifications, specSections, optionGroups };
});

let next = source;
for (const detail of details) {
  if (!detail.specifications) continue;
  const marker = `slug: ${JSON.stringify(detail.slug)}`;
  const slugAt = next.indexOf(marker);
  if (slugAt === -1) continue;
  const blockEnd = next.indexOf("\n  },", slugAt);
  if (blockEnd === -1) continue;
  let block = next.slice(slugAt, blockEnd);
  block = block.replace(
    /specifications: \{[^}]*\}/,
    `specifications: ${JSON.stringify(detail.specifications)}`,
  );
  const flatOptions = detail.optionGroups.flatMap((group) => group.items);
  block = block.replace(
    /options: \[[\s\S]*?\]/,
    `options: ${JSON.stringify(flatOptions)}`,
  );
  block = block.replace(/\n    specSections: .+\n    optionGroups: .+\n/, "\n");
  block = block.replace(
    /createdAt:/,
    `specSections: ${JSON.stringify(detail.specSections)},\n    optionGroups: ${JSON.stringify(detail.optionGroups)},\n    createdAt:`,
  );
  next = next.slice(0, slugAt) + block + next.slice(blockEnd);
}

fs.writeFileSync(DATA_FILE, next);
console.log("updated", DATA_FILE);
