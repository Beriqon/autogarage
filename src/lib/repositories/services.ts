import { services } from "@/data/services";
import type { Service, ServiceCategory } from "@/types/service";

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}

export function getFeaturedServices(
  limit = 3,
  category?: ServiceCategory,
): Service[] {
  return services
    .filter(
      (service) =>
        service.featured &&
        (category == null || service.category === category),
    )
    .slice(0, limit);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];

  const related = service.relatedSlugs
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is Service => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = services.filter(
    (item) =>
      item.slug !== slug && !service.relatedSlugs.includes(item.slug),
  );

  return [...related, ...extras].slice(0, limit);
}
