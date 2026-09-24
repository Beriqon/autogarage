import { NextResponse } from "next/server";
import {
  normalizeLicensePlate,
  type RdwVehicle,
} from "@/lib/forms/sell-car-schema";

type RdwRow = Record<string, string | undefined>;

function yearFromRdwDate(value: string | undefined): string {
  if (!value || value.length < 4) return "";
  return value.slice(0, 4);
}

function titleCase(value: string): string {
  return value
    .toLocaleLowerCase("nl-NL")
    .replace(/(^|[\s-])(\p{L})/gu, (_, separator: string, letter: string) => {
      return `${separator}${letter.toLocaleUpperCase("nl-NL")}`;
    });
}

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("kenteken") ?? "";
  const kenteken = normalizeLicensePlate(raw);

  if (
    kenteken.length < 5 ||
    kenteken.length > 8 ||
    !/[A-Z]/.test(kenteken) ||
    !/\d/.test(kenteken)
  ) {
    return NextResponse.json(
      { ok: false, error: "Vul een geldig kenteken in." },
      { status: 400 },
    );
  }

  try {
    const [vehicleResponse, fuelResponse] = await Promise.all([
      fetch(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${kenteken}`,
        { next: { revalidate: 60 * 60 * 24 } },
      ),
      fetch(
        `https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=${kenteken}`,
        { next: { revalidate: 60 * 60 * 24 } },
      ),
    ]);

    if (!vehicleResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Kentekencontrole is tijdelijk niet beschikbaar." },
        { status: 502 },
      );
    }

    const vehicles = (await vehicleResponse.json()) as RdwRow[];
    const vehicle = vehicles[0];

    if (!vehicle) {
      return NextResponse.json({ ok: true, found: false });
    }

    const fuels = fuelResponse.ok
      ? ((await fuelResponse.json()) as RdwRow[])
      : [];
    const fuel = fuels
      .map((row) => row.brandstof_omschrijving)
      .filter((value): value is string => Boolean(value))
      .map(titleCase)
      .join(" / ");

    const result: RdwVehicle = {
      licensePlate: kenteken,
      make: vehicle.merk ? titleCase(vehicle.merk) : "",
      model: vehicle.handelsbenaming ? titleCase(vehicle.handelsbenaming) : "",
      year: yearFromRdwDate(vehicle.datum_eerste_toelating),
      fuel,
      color: vehicle.eerste_kleur ? titleCase(vehicle.eerste_kleur) : "",
    };

    return NextResponse.json({ ok: true, found: true, vehicle: result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Kentekencontrole is tijdelijk niet beschikbaar." },
      { status: 502 },
    );
  }
}
