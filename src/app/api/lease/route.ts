import { NextResponse } from "next/server";
import { leaseSchema } from "@/lib/forms/lease-schema";
import { buildLeaseQuote } from "@/lib/lease";
import { getVehicleBySlug } from "@/lib/repositories/vehicles";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  const parsed = leaseSchema.safeParse(body);

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
      message: "Bedankt. We sturen een vrijblijvende offerte.",
    });
  }

  const vehicle = getVehicleBySlug(parsed.data.vehicleSlug);

  if (!vehicle || vehicle.status === "sold" || vehicle.price <= 0) {
    return NextResponse.json(
      { ok: false, error: "Deze occasion is niet beschikbaar voor een lease-offerte." },
      { status: 400 },
    );
  }

  const quote = buildLeaseQuote({
    purchase: vehicle.price,
    downPayment: parsed.data.downPayment,
    balloon: parsed.data.balloon,
    months: parsed.data.months,
  });

  // Stub: geen e-mailprovider gekoppeld. Offerte wordt later verstuurd.
  return NextResponse.json({
    ok: true,
    message: "Bedankt. We sturen een vrijblijvende offerte, meestal binnen 24 uur.",
    quote: {
      monthly: quote.monthly,
      months: quote.months,
      finance: quote.finance,
    },
  });
}
