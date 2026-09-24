import type { Vehicle } from "@/types/vehicle";
import { cn } from "@/lib/cn";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Reveal } from "@/components/shared/reveal";

type VehicleGridProps = {
  vehicles: Vehicle[];
  className?: string;
  priorityCount?: number;
  compactTitle?: boolean;
};

export function VehicleGrid({
  vehicles,
  className,
  priorityCount = 0,
  compactTitle = false,
}: VehicleGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12",
        className,
      )}
    >
      {vehicles.map((vehicle, index) => (
        <li key={vehicle.id} className="min-w-0">
          <Reveal delay={0.04 * Math.min(index, 8)} className="h-full min-w-0">
            <VehicleCard
              vehicle={vehicle}
              priority={index < priorityCount}
              compactTitle={compactTitle}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
