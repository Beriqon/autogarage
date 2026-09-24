import { z } from "zod";

export function normalizeLicensePlate(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function parseMileage(value: string): number | null {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const mileage = Number(digits);
  if (!Number.isFinite(mileage)) return null;
  return mileage;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""));

export const sellCarSchema = z.object({
  licensePlate: z
    .string()
    .trim()
    .min(4, "Vul een kenteken in.")
    .max(12, "Kenteken is te lang.")
    .refine((value) => {
      const plate = normalizeLicensePlate(value);
      return (
        plate.length >= 5 &&
        plate.length <= 8 &&
        /[A-Z]/.test(plate) &&
        /\d/.test(plate)
      );
    }, "Vul een geldig Nederlands kenteken in."),
  mileage: z
    .string()
    .trim()
    .min(1, "Vul de kilometerstand in.")
    .refine((value) => {
      const mileage = parseMileage(value);
      return mileage !== null && mileage >= 0 && mileage <= 2_000_000;
    }, "Vul een geldige kilometerstand in."),
  name: z
    .string()
    .trim()
    .min(2, "Vul uw naam in (minimaal 2 tekens).")
    .max(100, "Naam is te lang."),
  email: z
    .string()
    .trim()
    .email("Vul een geldig e-mailadres in.")
    .max(120, "E-mailadres is te lang."),
  phone: z
    .string()
    .trim()
    .min(8, "Vul een geldig telefoonnummer in.")
    .max(30, "Telefoonnummer is te lang."),
  message: optionalText(2000),
  make: optionalText(80),
  model: optionalText(80),
  year: optionalText(4),
  fuel: optionalText(40),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Ga akkoord met de privacyverklaring om door te gaan.",
  }),
  company: z.string().max(200).optional().or(z.literal("")),
});

export type SellCarInput = z.infer<typeof sellCarSchema>;

export type RdwVehicle = {
  licensePlate: string;
  make: string;
  model: string;
  year: string;
  fuel: string;
  color: string;
};
