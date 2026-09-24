import { z } from "zod";
import { LEASE_TERMS } from "@/lib/lease";

export const leaseSchema = z.object({
  customerType: z.enum(["ondernemer", "loondienst"]),
  visited: z.enum(["gezien", "nog-niet"]),
  vehicleSlug: z.string().trim().min(1).max(200),
  downPayment: z.number().int().min(0).max(2_000_000),
  balloon: z.number().int().min(0).max(2_000_000),
  months: z.union([
    z.literal(LEASE_TERMS[0]),
    z.literal(LEASE_TERMS[1]),
    z.literal(LEASE_TERMS[2]),
    z.literal(LEASE_TERMS[3]),
    z.literal(LEASE_TERMS[4]),
    z.literal(LEASE_TERMS[5]),
  ]),
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
    .min(8, "Vul een telefoonnummer in.")
    .max(30, "Telefoonnummer is te lang."),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Ga akkoord met de privacyverklaring om door te gaan.",
  }),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LeaseInput = z.infer<typeof leaseSchema>;
