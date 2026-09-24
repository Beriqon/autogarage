/** Indicative financial lease / autofinanciering. Not a binding credit offer. */

export const LEASE_NOMINAL_RATE = 0.0799;
export const LEASE_BALLOON_RATIO = 0.15;
export const LEASE_DEFAULT_TERM = 72;
export const LEASE_TERMS = [12, 24, 36, 48, 60, 72] as const;

export type LeaseTerm = (typeof LEASE_TERMS)[number];

const rateFormatter = new Intl.NumberFormat("nl-NL", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const aprFormatter = new Intl.NumberFormat("nl-NL", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatNominalRate(rate = LEASE_NOMINAL_RATE): string {
  return rateFormatter.format(rate);
}

export function leaseApr(nominal = LEASE_NOMINAL_RATE): number {
  const monthly = nominal / 12;
  return (1 + monthly) ** 12 - 1;
}

export function formatLeaseApr(nominal = LEASE_NOMINAL_RATE): string {
  return aprFormatter.format(leaseApr(nominal));
}

export function defaultBalloon(purchase: number): number {
  return Math.round(purchase * LEASE_BALLOON_RATIO);
}

export function financeAmount(purchase: number, downPayment: number): number {
  return Math.max(0, Math.round(purchase) - Math.max(0, Math.round(downPayment)));
}

export function monthlyPayment(input: {
  purchase: number;
  downPayment: number;
  balloon: number;
  months: number;
  nominalRate?: number;
}): number {
  const principal = financeAmount(input.purchase, input.downPayment);
  const months = input.months;
  if (principal <= 0 || months <= 0) return 0;

  const balloon = Math.min(Math.max(0, Math.round(input.balloon)), principal);
  const monthlyRate = (input.nominalRate ?? LEASE_NOMINAL_RATE) / 12;

  if (monthlyRate === 0) {
    return Math.round((principal - balloon) / months);
  }

  const factor = (1 + monthlyRate) ** months;
  const payment = ((principal * factor - balloon) * monthlyRate) / (factor - 1);
  return Math.max(0, Math.round(payment));
}

export function leaseFromPrice(purchase: number): number {
  if (!purchase || purchase <= 0) return 0;
  return monthlyPayment({
    purchase,
    downPayment: 0,
    balloon: defaultBalloon(purchase),
    months: LEASE_DEFAULT_TERM,
  });
}

export type LeaseQuote = {
  purchase: number;
  downPayment: number;
  balloon: number;
  months: number;
  finance: number;
  monthly: number;
  totalPayable: number;
  creditCost: number;
};

export function buildLeaseQuote(input: {
  purchase: number;
  downPayment: number;
  balloon: number;
  months: number;
}): LeaseQuote {
  const purchase = Math.max(0, Math.round(input.purchase));
  const downPayment = Math.min(
    Math.max(0, Math.round(input.downPayment)),
    purchase,
  );
  const finance = financeAmount(purchase, downPayment);
  const balloon = Math.min(Math.max(0, Math.round(input.balloon)), finance);
  const months = input.months;
  const monthly = monthlyPayment({
    purchase,
    downPayment,
    balloon,
    months,
  });
  const totalPayable = monthly * months + balloon + downPayment;

  return {
    purchase,
    downPayment,
    balloon,
    months,
    finance,
    monthly,
    totalPayable,
    creditCost: totalPayable - purchase,
  };
}

export function isLeaseTerm(value: number): value is LeaseTerm {
  return (LEASE_TERMS as readonly number[]).includes(value);
}
