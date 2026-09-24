export const sellCarFileLimits = {
  maxCount: 8,
  maxBytes: 10 * 1024 * 1024,
  maxTotalBytes: 40 * 1024 * 1024,
} as const;

const allowedExtensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "heif",
  "pdf",
]);

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

export const sellCarFileAccept =
  "image/jpeg,image/png,image/webp,image/heic,image/heif,.pdf,application/pdf";

type FileLike = {
  name: string;
  type: string;
  size: number;
};

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return "";
  return name.slice(dot + 1).toLowerCase();
}

export function isAllowedSellCarFile(file: FileLike): boolean {
  if (!allowedExtensions.has(extensionOf(file.name))) return false;
  if (!file.type) return true;
  return allowedTypes.has(file.type);
}

export function validateSellCarFiles(files: FileLike[]): string | null {
  if (files.length > sellCarFileLimits.maxCount) {
    return `U kunt maximaal ${sellCarFileLimits.maxCount} bestanden toevoegen.`;
  }

  let total = 0;

  for (const file of files) {
    if (file.size <= 0) {
      return "Een van de bestanden is leeg.";
    }
    if (file.size > sellCarFileLimits.maxBytes) {
      return `"${file.name}" is te groot. Maximaal 10 MB per bestand.`;
    }
    if (!isAllowedSellCarFile(file)) {
      return `"${file.name}" kunnen we niet ontvangen. Gebruik JPG, PNG, WEBP, HEIC of PDF.`;
    }
    total += file.size;
  }

  if (total > sellCarFileLimits.maxTotalBytes) {
    return "De bestanden samen zijn te groot. Maximaal 40 MB in totaal.";
  }

  return null;
}
