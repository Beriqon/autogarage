import type { SpecSection, Vehicle } from "@/types/vehicle";
import { formatMileage } from "@/lib/format";
import {
  bodyLabel,
  fuelLabel,
  transmissionLabel,
} from "@/lib/vehicles/labels";
import { cn } from "@/lib/cn";

type SpecRow = {
  label: string;
  value: string;
};

type VehicleSpecsProps = {
  vehicle: Vehicle;
  className?: string;
};

function fallbackSections(vehicle: Vehicle): SpecSection[] {
  const { specifications } = vehicle;
  const general: SpecRow[] = [
    { label: "Bouwjaar", value: String(vehicle.year) },
    { label: "Kilometerstand", value: formatMileage(vehicle.mileage) },
    { label: "Carrosserie", value: bodyLabel(vehicle.bodyType) },
    { label: "Kleur", value: vehicle.color },
  ];
  const motor: SpecRow[] = [
    { label: "Brandstof", value: fuelLabel(vehicle.fuel) },
    { label: "Transmissie", value: transmissionLabel(vehicle.transmission) },
    { label: "Vermogen", value: `${vehicle.power} pk` },
  ];

  const push = (rows: SpecRow[], label: string, value?: string | number) => {
    if (value == null || value === "") return;
    rows.push({ label, value: String(value) });
  };

  push(general, "Kenteken", specifications.licensePlate);
  push(general, "BTW of marge", specifications.vatOrMargin);
  push(general, "Eerste toelating", specifications.registrationDate);
  push(
    general,
    "Eerste toelating (internationaal)",
    specifications.registrationDateIntl,
  );
  push(general, "APK tot", specifications.apkUntil);
  push(general, "Deuren", specifications.doors);
  push(general, "Zitplaatsen", specifications.seats);
  push(general, "Gewicht", specifications.weight);
  push(general, "Wegenbelasting", specifications.roadTax);
  push(general, "Sleutels", specifications.keys);
  push(general, "Handzenders", specifications.remotes);
  push(general, "Interieur", specifications.colorInterior);
  push(motor, "Motorinhoud", specifications.engineSize ? `${specifications.engineSize} L` : undefined);
  push(motor, "Cilinders", specifications.cylinders);
  push(motor, "Vermogen (kW)", specifications.powerKw);
  push(motor, "Koppel", specifications.torque);
  push(motor, "Max. toeren", specifications.maxRpm);
  push(motor, "Topsnelheid", specifications.topSpeed);
  push(motor, "0–100 km/u", specifications.acceleration);
  push(motor, "Verbruik", specifications.consumption);
  push(motor, "Emissieklasse", specifications.emissionClass);

  return [
    { title: "Algemeen", rows: general },
    { title: "Motor en transmissie", rows: motor },
  ].filter((section) => section.rows.length > 0);
}

function SpecGrid({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="grid border-t border-line sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={`${row.label}-${row.value}`}
          className="flex items-baseline justify-between gap-4 border-b border-line py-3 pr-4 sm:odd:pr-6 sm:even:pl-6"
        >
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="text-right text-sm font-semibold text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function VehicleSpecs({ vehicle, className }: VehicleSpecsProps) {
  const sections =
    vehicle.specSections && vehicle.specSections.length > 0
      ? vehicle.specSections
      : fallbackSections(vehicle);

  return (
    <div className={cn(className)}>
      <h2 className="font-display text-xl text-ink md:text-2xl">Specificaties</h2>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
              {section.title}
            </h3>
            <div className="mt-3">
              <SpecGrid rows={section.rows} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
