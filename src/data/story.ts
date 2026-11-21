// Sourced from grindburgerkitchen.com/about-us and /faq. No additions.

export const storyQuote =
  'It’s our mission to serve a superior, chef-driven burger using the best local and regional ingredients available, prepared and served by happy employees that are paid a fair wage.';

export const storyFull = [
  'My husband Jesse and I began as Grind Gourmet Burger Truck in the Spring of 2012, and by June of 2014 we had grown into a permanent location.',
  'We went all in when we moved to a brick and mortar location in the popular NuLu neighborhood and turned it into a thriving restaurant that has received local and national attention.',
  'It’s our mission to serve a superior, chef-driven burger using the best local and regional ingredients available, prepared and served by happy employees that are paid a fair wage. We look forward to sharing our passion for good food and good people with you.',
];

export const timeline = [
  {
    year: '2012',
    kicker: 'Spring',
    title: 'The truck',
    body: 'Liz and Jesse Huot start Grind Gourmet Burger Truck and take it to the streets of Louisville.',
  },
  {
    year: '2014',
    kicker: 'June',
    title: 'Brick & mortar',
    body: 'The truck grows into a permanent home on East Market Street in NuLu. That same year: Louisville Magazine’s Best of Louisville food truck (1st), and Thrillist’s 15 Best New Burgers in the Country.',
  },
  {
    year: '2014',
    kicker: 'Year end',
    title: 'Truck retired',
    body: 'The truck makes its last run at the end of 2014. Everything goes into the restaurant.',
  },
  {
    year: '2016',
    kicker: 'December',
    title: 'Triple D',
    body: 'Food Network’s Diners, Drive-Ins and Dives comes to NuLu. The Cuban and the Veggie make the show.',
  },
  {
    year: '2017–18',
    kicker: 'Back to back',
    title: 'Best Burger',
    body: 'LEO Weekly readers name Grind the Best Burger in Louisville — in 2017, then again in 2018.',
  },
  {
    year: 'Today',
    kicker: 'NuLu',
    title: 'The Grind',
    body: 'Still trimming and grinding the beef in-house every day. Still cooking every burger to order.',
  },
];

// `source` = the link the original site used. These 2014–2015 URLs could not be verified
// (LEO Weekly 404s, tasteofinnovation.com is a parked domain, others block automated checks),
// so they are NOT rendered as links. Set `href` once a live URL is confirmed.
export type PressItem = { outlet: string; title: string; year: string; href?: string; source?: string };

export const press: PressItem[] = [
  { outlet: 'LEO Weekly', title: 'Best Burger in Louisville', year: '2017 · 2018' },
  { outlet: 'Food Network', title: 'Diners, Drive-Ins and Dives', year: 'Dec 2016' },
  { outlet: 'Louisville CVB', title: 'Lookin’ at Louisville', year: '2015', source: 'https://www.youtube.com/watch?v=6An0kVnODGg' },
  { outlet: 'Thrillist', title: '15 Best New Burgers in the Country', year: '2014', source: 'http://www.thrillist.com/eat/nation/thrillist-s-best-new-burgers-2014' },
  { outlet: 'Thrillist', title: 'Best New Louisville Restaurants', year: '2014', source: 'http://www.thrillist.com/eat/louisville/best-new-louisville-restaurants-of-the-year-2014-openings' },
  { outlet: 'Taste of Innovation', title: 'Orange Fork Award', year: '2014', source: 'http://www.tasteofinnovation.com/index.php?option=com_content&view=article&id=66&Itemid=63' },
  { outlet: 'Louisville Magazine', title: '“Best of Louisville” — Food Truck (1st)', year: '2014' },
  { outlet: 'LEO Weekly', title: 'Dining Issue — “The Daily Grind Pays Off”', year: '2014', source: 'http://leoweekly.com/dining/daily-grind-pays-liz-and-jesse-huot' },
  { outlet: 'Eater National', title: '30 Hot New Burgers', year: '', source: 'http://www.eater.com/maps/30-hot-new-burgers-for-labor-day-weekend' },
];
