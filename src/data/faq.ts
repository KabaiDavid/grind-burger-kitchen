// FAQ answers are taken from the original FAQ, Home, Contact and Order Online pages.
import { site } from './site';

export type Faq = { q: string; a: string; group: 'Visiting' | 'Ordering' | 'Food' | 'Events' };

export const faqs: Faq[] = [
  {
    group: 'Food',
    q: 'Do you offer gluten-free or vegan items?',
    a: 'We do offer gluten-free items! While we are not a dedicated gluten-free facility and don’t encourage anyone with a life-threatening allergy to dine with us, we have many, many customers with celiac and other gluten sensitivities who dine with us safely on a frequent basis. Our burgers are gluten free and we always have buns from Annie May’s Sweet Cafe (a dedicated gluten-free bakery here in Louisville) available. Other items on our menu may be gluten free, but it’s always best to double check with our well-trained team when ordering. Our veggie burger and kale salad can be made vegan — please let the staff know when ordering.',
  },
  {
    group: 'Visiting',
    q: 'Do you take reservations?',
    a: `Yes — reservations are available through OpenTable. The patio is not available for reservations and is first come, first served. For parties larger than 8, please email ${site.email}. Parties of 10 or more will have a 20% gratuity added to the final bill.`,
  },
  {
    group: 'Visiting',
    q: 'Where do I park?',
    a: 'We have limited private parking in front of the restaurant, and parking is available on the surrounding streets.',
  },
  {
    group: 'Visiting',
    q: 'What’s the best way to reach you?',
    a: `Email ${site.email} or message us on Facebook. To keep every team member focused on the guests in house, our phone runs through frequently asked questions and then to voicemail, which we listen to once a day — it does not ring through to a live person.`,
  },
  {
    group: 'Ordering',
    q: 'Can I use a gift card for an online order?',
    a: 'At this time we are not able to accept gift cards for online orders. We apologize for any inconvenience. Gift cards can be purchased online and used in the restaurant.',
  },
  {
    group: 'Ordering',
    q: 'Is there a limit on online orders?',
    a: `Orders over $200 will be declined. If you need an order over that amount, please email ${site.email} 48 hours in advance to coordinate.`,
  },
  {
    group: 'Events',
    q: 'Do you guys still run the food truck?',
    a: 'We do not. We stopped running it at the end of 2014 and have no plans to reopen it.',
  },
  { group: 'Events', q: 'Do you cater?', a: 'We do not currently offer catering.' },
  {
    group: 'Events',
    q: 'Do you rent out your restaurant?',
    a: `You may buy out a portion of the entire restaurant. Prices for a buyout depend on historical sales for that day, week, month and season. Please email ${site.email} for details and pricing.`,
  },
];
