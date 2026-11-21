import type { Metadata } from 'next';
import { SITE_URL, site, hours } from '@/data/site';

export function pageMeta({ title, description, path, image = '/og.jpg' }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: 'Grind Burger Kitchen — burgers, fries and house-made sides on a dark wood table' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export function restaurantJsonLd() {
  const dayMap: Record<string, string> = {
    Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: site.name,
    alternateName: 'Grind',
    description: site.description,
    url: `${SITE_URL}/`,
    image: [`${SITE_URL}/og.jpg`, `${SITE_URL}/img/hero-1920.webp`],
    logo: `${SITE_URL}/img/logo-ink.png`,
    telephone: site.phone.tel,
    email: site.email,
    priceRange: '$$',
    servesCuisine: ['Burgers', 'American', 'Sandwiches'],
    acceptsReservations: true,
    hasMenu: `${SITE_URL}/food-menu/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.links.mapsPlace,
    openingHoursSpecification: hours
      .filter((h) => h.open)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: dayMap[h.day], opens: h.open, closes: h.close })),
    founder: site.owners.map((o) => ({ '@type': 'Person', name: o.name })),
    potentialAction: [
      { '@type': 'OrderAction', target: { '@type': 'EntryPoint', urlTemplate: site.links.order, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] }, deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp' },
      { '@type': 'ReserveAction', target: { '@type': 'EntryPoint', urlTemplate: site.links.reserve }, result: { '@type': 'FoodEstablishmentReservation', name: 'Table at Grind Burger Kitchen' } },
    ],
    sameAs: [site.links.facebook, site.links.instagram],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
