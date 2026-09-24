export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceCategory = "workshop" | "mobility";

export type ServicePrice = {
  label: string;
  amount: number;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  featured: boolean;
  category: ServiceCategory;
  priceFrom?: number;
  priceLabel?: string;
  prices?: ServicePrice[];
  highlights: string[];
  whenNeeded: string[];
  whyUs: string[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
  /** Emergency services lead with a phone call instead of an appointment. */
  cta?: "appointment" | "phone";
};
