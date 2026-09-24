"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Info } from "lucide-react";
import { leaseSchema, type LeaseInput } from "@/lib/forms/lease-schema";
import {
  LEASE_DEFAULT_TERM,
  LEASE_TERMS,
  buildLeaseQuote,
  defaultBalloon,
  formatLeaseApr,
  formatNominalRate,
  type LeaseTerm,
} from "@/lib/lease";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/forms/field";

const numberFormatter = new Intl.NumberFormat("nl-NL");

type LeaseCalculatorProps = {
  purchasePrice: number;
  vehicleSlug: string;
  vehicleTitle: string;
  className?: string;
};

type CustomerType = LeaseInput["customerType"];
type Visited = LeaseInput["visited"];

function parseEuro(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function EuroRow({
  id,
  label,
  value,
  onChange,
  readOnly,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#d5dde8] py-3">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm text-ink">
        {label}
        {hint ? (
          <span className="text-muted" title={hint}>
            <Info className="size-3.5" aria-hidden />
            <span className="sr-only">{hint}</span>
          </span>
        ) : null}
      </label>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted" aria-hidden>
          €
        </span>
        <input
          id={id}
          inputMode="numeric"
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          value={numberFormatter.format(value)}
          onChange={(event) => onChange?.(parseEuro(event.target.value))}
          className={cn(
            "w-28 bg-transparent text-right text-sm tabular-nums text-ink outline-none",
            readOnly ? "font-medium" : "rounded-md border border-[#d5dde8] bg-white px-2 py-1.5",
          )}
        />
      </div>
    </div>
  );
}

function Choice({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm leading-snug text-ink">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 shrink-0 accent-accent"
      />
      <span>{label}</span>
    </label>
  );
}

const perks = [
  "Zakelijk en particulier: financial lease en autofinanciering",
  "Vrijblijvende offerte, meestal binnen 24 uur",
  "Aanbetaling, inruil en slottermijn zelf in te stellen",
];

export function LeaseCalculator({
  purchasePrice,
  vehicleSlug,
  vehicleTitle,
  className,
}: LeaseCalculatorProps) {
  const [customerType, setCustomerType] = React.useState<CustomerType>("ondernemer");
  const [visited, setVisited] = React.useState<Visited>("nog-niet");
  const [downPayment, setDownPayment] = React.useState(0);
  const [balloon, setBalloon] = React.useState(() => defaultBalloon(purchasePrice));
  const [months, setMonths] = React.useState<LeaseTerm>(LEASE_DEFAULT_TERM);
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const quote = buildLeaseQuote({
    purchase: purchasePrice,
    downPayment,
    balloon,
    months,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeaseInput>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      customerType: "ondernemer",
      visited: "nog-niet",
      vehicleSlug,
      downPayment: 0,
      balloon: defaultBalloon(purchasePrice),
      months: LEASE_DEFAULT_TERM,
      name: "",
      email: "",
      phone: "",
      privacy: false,
      company: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/lease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          customerType,
          visited,
          vehicleSlug,
          downPayment: quote.downPayment,
          balloon: quote.balloon,
          months,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        issues?: Partial<Record<keyof LeaseInput, string[]>>;
      };

      if (!response.ok || !data.ok) {
        const fieldErrors = data.issues;
        if (fieldErrors) {
          (Object.keys(fieldErrors) as (keyof LeaseInput)[]).forEach((key) => {
            const message = fieldErrors[key]?.[0];
            if (message) setError(key, { message });
          });
        }
        setError("root", {
          message: data.error ?? "De offerte kon niet worden verstuurd.",
        });
        return;
      }

      setSent(true);
    } catch {
      setError("root", {
        message: "Er ging iets mis. Controleer uw verbinding en probeer opnieuw.",
      });
    }
  });

  return (
    <section
      id="lease"
      aria-labelledby="lease-heading"
      className={cn(
        "scroll-mt-28 border border-[#d5dde8] bg-[#f3f6fa] p-5 md:p-6",
        className,
      )}
    >
      <p className="text-sm font-medium text-accent">Lease aanvraag</p>
      <h2
        id="lease-heading"
        className="mt-1 font-display text-xl leading-snug text-ink md:text-2xl"
      >
        Bereken financial lease of autofinanciering
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Bereken de financiering voor de {vehicleTitle} en vraag vrijblijvend
        een offerte aan.
      </p>

      <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Situatie</legend>
        <Choice
          name="customerType"
          value="ondernemer"
          checked={customerType === "ondernemer"}
          onChange={() => setCustomerType("ondernemer")}
          label="Ik ben ondernemer"
        />
        <Choice
          name="customerType"
          value="loondienst"
          checked={customerType === "loondienst"}
          onChange={() => setCustomerType("loondienst")}
          label="Ik ben in loondienst"
        />
        <Choice
          name="visited"
          value="gezien"
          checked={visited === "gezien"}
          onChange={() => setVisited("gezien")}
          label="Ik heb de auto al bekeken"
        />
        <Choice
          name="visited"
          value="nog-niet"
          checked={visited === "nog-niet"}
          onChange={() => setVisited("nog-niet")}
          label="Ik heb de auto nog niet bekeken"
        />
      </fieldset>

      <div className="mt-4">
        <EuroRow
          id="lease-purchase"
          label="Aankoopbedrag"
          value={quote.purchase}
          readOnly
        />
        <EuroRow
          id="lease-down"
          label="Aanbetaling / inruil"
          value={downPayment}
          onChange={(value) => setDownPayment(Math.min(value, purchasePrice))}
        />
        <EuroRow
          id="lease-balloon"
          label="Slottermijn"
          hint="Restbedrag dat u aan het einde van de looptijd betaalt."
          value={balloon}
          onChange={(value) =>
            setBalloon(Math.min(value, Math.max(0, purchasePrice - downPayment)))
          }
        />
        <EuroRow
          id="lease-finance"
          label="Totaal financieringsbedrag"
          value={quote.finance}
          readOnly
        />

        <div className="flex items-center justify-between gap-4 border-b border-[#d5dde8] py-3">
          <label htmlFor="lease-term" className="text-sm text-ink">
            Looptijd
          </label>
          <select
            id="lease-term"
            value={months}
            onChange={(event) => setMonths(Number(event.target.value) as LeaseTerm)}
            className="rounded-md border border-[#d5dde8] bg-white px-3 py-1.5 text-sm text-ink"
          >
            {LEASE_TERMS.map((term) => (
              <option key={term} value={term}>
                {term} maanden
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-sm text-ink">Maandlasten</p>
        <p className="font-display text-3xl tracking-tight text-ink">
          {formatPrice(quote.monthly)}
        </p>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Indicatie bij {formatNominalRate()} nominale rente, JKP{" "}
        {formatLeaseApr()}. Totaal te betalen {formatPrice(quote.totalPayable)},
        waarvan {formatPrice(quote.creditCost)} kredietkosten. Geen aanbod.
      </p>

      {sent ? (
        <p className="mt-5 border border-[#d5dde8] bg-white px-4 py-3 text-sm leading-relaxed text-ink">
          Bedankt. We nemen contact op voor een vrijblijvende offerte, meestal
          binnen 24 uur.
        </p>
      ) : quoteOpen ? (
        <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
          <Field id="lease-name" label="Naam" required error={errors.name?.message}>
            <Input autoComplete="name" placeholder="Uw naam" {...register("name")} />
          </Field>
          <Field id="lease-email" label="E-mail" required error={errors.email?.message}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="uw@email.nl"
              {...register("email")}
            />
          </Field>
          <Field
            id="lease-phone"
            label="Telefoon"
            required
            error={errors.phone?.message}
          >
            <Input
              type="tel"
              autoComplete="tel"
              placeholder="06 …"
              {...register("phone")}
            />
          </Field>
          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 border border-line accent-accent"
                {...register("privacy")}
              />
              <span>
                Ik ga akkoord met de{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-ink underline-offset-2 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </span>
            </label>
            {errors.privacy?.message ? (
              <p className="text-sm text-accent" role="alert">
                {errors.privacy.message}
              </p>
            ) : null}
          </div>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
            <label htmlFor="lease-company">Laat dit veld leeg</label>
            <input
              id="lease-company"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>
          {errors.root?.message ? (
            <p className="text-sm text-accent" role="alert">
              {errors.root.message}
            </p>
          ) : null}
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Versturen…" : "Offerte aanvragen"}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </form>
      ) : (
        <Button
          type="button"
          size="lg"
          className="mt-5 w-full"
          onClick={() => setQuoteOpen(true)}
        >
          Gratis offerte aanvragen
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      )}

      <ul className="mt-5 space-y-2">
        {perks.map((perk) => (
          <li key={perk} className="flex gap-2 text-sm text-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 border border-ink/15 bg-white px-3 py-2 text-center text-sm font-medium text-ink">
        Let op! Geld lenen kost geld
      </p>
    </section>
  );
}
