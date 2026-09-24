import type { Vehicle } from "@/types/vehicle";
import { cn } from "@/lib/cn";

type VehicleOptionsProps = {
  vehicle: Vehicle;
  className?: string;
};

export function VehicleOptions({ vehicle, className }: VehicleOptionsProps) {
  const groups =
    vehicle.optionGroups && vehicle.optionGroups.length > 0
      ? vehicle.optionGroups
      : vehicle.options.length > 0
        ? [{ title: "Opties", items: vehicle.options }]
        : [];

  if (groups.length === 0) return null;

  return (
    <div className={cn(className)}>
      <h2 className="font-display text-xl text-ink md:text-2xl">Opties</h2>
      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <section key={group.title}>
            <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
              {group.title}
            </h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={`${group.title}-${item}`}
                  className="flex gap-2 text-sm text-muted before:mt-[0.55em] before:size-1 before:shrink-0 before:bg-accent before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
