// Single source of truth for business facts.
// Every value here was verified against grindburgerkitchen.com (audited Nov 2026).
// Anything inferred rather than stated is flagged with `// CONFIRM`.

export const SITE_URL = 'https://www.grindburgerkitchen.com';

export const site = {
  name: 'Grind Burger Kitchen',
  shortName: 'Grind',
  tagline: 'Fresh ground. Hand crafted. Grass fed.',
  description:
    'Chef-driven burgers in Louisville’s NuLu neighborhood. Grass-fed beef trimmed and ground fresh daily, house-made pickles and smoked ketchup, and a full bar with 75+ bourbons.',
  owners: [
    { name: 'Liz Huot', role: 'Owner' },
    { name: 'Jesse Huot', role: 'Owner / Chef' },
  ],
  legal: 'Huot Management Inc.',
  neighborhood: 'NuLu',
  address: {
    street: '829 E. Market St, Ste C',
    city: 'Louisville',
    region: 'KY',
    postal: '40206',
    country: 'US',
  },
  geo: { lat: 38.2536488, lng: -85.7364558 },
  email: 'Grind@UffdaHospitality.com',
  jobsEmail: 'JoinOurTeam@UffdaHospitality.com',
  phone: { display: '502-213-0277', tel: '+15022130277' },
  links: {
    order: 'https://order.toasttab.com/online/grind-burger-kitchen',
    // OpenTable restaurant id 1246489 comes from the reservation widget embedded on the original homepage.
    reserve: 'https://www.opentable.com/restref/client/?rid=1246489&restref=1246489',
    giftCards: 'https://swipeit.com/co-branded/merchant/grind-burger-kitchen-9869',
    facebook: 'https://www.facebook.com/grindburgerkitchen/',
    instagram: 'https://www.instagram.com/grindburgerkitchen/',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Grind+Burger+Kitchen,+829+E+Market+St,+Louisville,+KY+40206',
    mapsPlace: 'https://goo.gl/maps/8t1zeddYXkKiR88x7',
  },
} as const;

export type DayHours = { day: string; short: string; dow: number; open: string | null; close: string | null; label: string };

// Original site: "Tue - Thurs: 11a - 9p / Fri - Sat: 11a - 10p / Sun: 12pm-8pm".
export const hours: DayHours[] = [
  { day: 'Monday', short: 'Mon', dow: 1, open: null, close: null, label: 'Closed' }, // CONFIRM — Monday is omitted from published hours
  { day: 'Tuesday', short: 'Tue', dow: 2, open: '11:00', close: '21:00', label: '11a – 9p' },
  { day: 'Wednesday', short: 'Wed', dow: 3, open: '11:00', close: '21:00', label: '11a – 9p' },
  { day: 'Thursday', short: 'Thu', dow: 4, open: '11:00', close: '21:00', label: '11a – 9p' },
  { day: 'Friday', short: 'Fri', dow: 5, open: '11:00', close: '22:00', label: '11a – 10p' },
  { day: 'Saturday', short: 'Sat', dow: 6, open: '11:00', close: '22:00', label: '11a – 10p' },
  { day: 'Sunday', short: 'Sun', dow: 0, open: '12:00', close: '20:00', label: '12p – 8p' },
];

export const hoursGrouped = [
  { days: 'Tue – Thu', label: '11a – 9p' },
  { days: 'Fri – Sat', label: '11a – 10p' },
  { days: 'Sunday', label: '12p – 8p' },
];

export const holidayNote = 'Closed Easter, Thanksgiving, Christmas Day and New Year’s Day.';

export const visitNotes = {
  cookToOrder: 'We cook to order, so you may experience some wait during prime dining hours.',
  parking: 'Limited private parking in front of the restaurant; street parking is available on surrounding streets.',
  patio: 'The patio is not available for reservations — it’s first come, first served.',
  largeParty: 'For parties larger than 8, please email us.',
  gratuity: 'Parties of 10 or more will have a 20% gratuity added to the final bill.',
  onlinePickup: 'Picking up an online order? Please see the host when you arrive to sign your receipt.',
  phone:
    'Our phone line runs through frequently asked questions and then to voicemail, which we check once a day — it does not ring through to a live person. Email is the fastest way to reach us.',
  thirdParty:
    'Check our Facebook for the most up-to-date information and hours. We don’t manage third-party sites like Yelp or TripAdvisor, so please don’t rely on them.',
};

export const nav = [
  { href: '/food-menu/', label: 'Menu' },
  { href: '/beer-menu/', label: 'Bar' },
  { href: '/about-us/', label: 'Story' },
  { href: '/contact/', label: 'Visit' },
  { href: '/faq/', label: 'FAQ' },
];

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
