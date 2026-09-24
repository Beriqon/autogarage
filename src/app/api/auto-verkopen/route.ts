import { NextResponse } from "next/server";
import { validateSellCarFiles } from "@/lib/forms/sell-car-files";
import { sellCarSchema } from "@/lib/forms/sell-car-schema";

function textField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  const files = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.name !== "");

  const fileError = validateSellCarFiles(files);
  if (fileError) {
    return NextResponse.json({ ok: false, error: fileError }, { status: 400 });
  }

  const body = {
    licensePlate: textField(formData, "licensePlate"),
    mileage: textField(formData, "mileage"),
    name: textField(formData, "name"),
    email: textField(formData, "email"),
    phone: textField(formData, "phone"),
    message: textField(formData, "message"),
    make: textField(formData, "make"),
    model: textField(formData, "model"),
    year: textField(formData, "year"),
    fuel: textField(formData, "fuel"),
    privacy: textField(formData, "privacy") === "true",
    company: textField(formData, "company"),
  };

  const parsed = sellCarSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Controleer de ingevulde velden.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({
      ok: true,
      message:
        "Bedankt. We bekijken uw auto en nemen zo snel mogelijk contact op met een vrijblijvend bod.",
    });
  }

  // Stub: geen e-mailprovider gekoppeld. Architectuur klaar voor later.
  return NextResponse.json({
    ok: true,
    message:
      "Bedankt. We bekijken uw auto en nemen zo snel mogelijk contact op met een vrijblijvend bod.",
  });
}
