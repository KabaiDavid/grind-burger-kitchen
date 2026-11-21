// Transcribed verbatim from Grind's current printed menu
// ("Main Menu, 8.5x14 Grind Burger_11062024"), published on grindburgerkitchen.com/food-menu.
// Prices in USD. Menu subject to change without notice.

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  note?: string;
  tags?: Array<'ddd' | 'vegan-option' | 'gf-option' | 'build-your-own' | 'no-subs'>;
};
export type MenuSection = {
  id: string;
  title: string;
  intro?: string;
  items: MenuItem[];
  compact?: boolean;
};

export const doneness = [
  { name: 'Medium rare', note: 'warm red', color: '#9b2335' },
  { name: 'Medium', note: 'warm pink', color: '#c0545c' },
  { name: 'Medium well', note: 'a little pink', color: '#b07a6a' },
  { name: 'Diner style', note: '2 thin patties, well', color: '#6b4a3a' },
];

export const menu: MenuSection[] = [
  {
    id: 'burgers',
    title: 'Burgers',
    intro: 'All burgers come with choice of side. All beef is trimmed and ground fresh daily.',
    items: [
      {
        name: 'Grind',
        price: '17',
        note: 'Our build-your-own option',
        description:
          'Burger, lettuce, tomato, red onion, choice of one cheese: American, cheddar, white cheddar spread, pepper jack, swiss, pimiento, brie.',
        tags: ['build-your-own'],
      },
      {
        name: 'B&B',
        price: '17',
        description: 'Burger, brie cheese, bacon, smoked habanero jam. That means no lettuce or tomato either. Trust us. It’s awesome.',
        note: 'No substitutions to this one',
        tags: ['no-subs'],
      },
      { name: 'Southern', price: '17', description: 'Burger, sharp cheddar pimento cheese, bacon, spicy dill pickles.' },
      {
        name: 'Chain',
        price: '16',
        description: 'Burger (cooked diner style), American cheese, spicy dill pickles, smoked ketchup, yellow mustard and red onion.',
      },
      {
        name: 'Shroom & Cheddar',
        price: '17',
        description: 'Burger, marinated and grilled portabella mushrooms, herby white cheddar spread, arugula, dijonnaise.',
      },
      {
        name: 'Veggie',
        price: '16',
        description:
          'House made patty. A blend of chickpeas, lentils, quinoa, mushrooms and roasted veggies with smoked ketchup, lettuce, tomato, onion. Vegan bun available. Add cheese +1.',
        note: 'Featured on Food Network’s Diners, Drive-ins and Dives',
        tags: ['ddd', 'vegan-option'],
      },
    ],
  },
  {
    id: 'sandwiches-salads',
    title: 'Sandwiches + Salads',
    items: [
      {
        name: 'Cuban',
        price: '17',
        description: 'Pork belly, Kentucky ham, Swiss cheese, spicy dill pickles, roasted garlic mayo, yellow mustard on authentic Cuban-style bread.',
        note: 'Featured on Food Network’s Diners, Drive-ins and Dives',
        tags: ['ddd'],
      },
      {
        name: 'Italian Pork Sandwich',
        price: '16',
        description:
          'Pork slow roasted with Italian herbs and garlic, braised greens, spicy giardiniera, garlic mayo, Provolone on Smør Nordic Bakery Brioche.',
      },
      {
        name: 'Adult Grilled Cheese',
        price: '14',
        description:
          'Gruyere cheese, whipped ricotta and feta spread, chorizo spiced shredded carrot, toasted pepita and arugula pesto on sourdough bread.',
      },
      {
        name: 'Fish Sandwich',
        price: '16',
        description: 'Pretzel breaded cod, Green Goddess slaw, tomato, roasted garlic mayo on Smør Nordic Bakery Brioche.',
      },
      {
        name: 'Chicken Sandwich',
        price: '15',
        description: 'Thigh cooked in adobo then seared, roasted poblano and charred corn crema, arugula, pepper jack on Smør Nordic Bakery Brioche.',
      },
      {
        name: 'What the Kale!? Salad',
        price: '10',
        description: 'Green Goddess dressing, radish, pumpkin seeds, shallots, parmesan. Add adobo chicken +4.',
        note: 'Vegan vinaigrette upon request',
        tags: ['vegan-option'],
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'House-cut Fries', price: '5' },
      {
        name: 'What the Kale Salad',
        price: '5.5',
        description: 'Green Goddess dressing, radish, pepitas, pickled shallots, parmesan.',
        note: 'Can be made vegan upon request',
        tags: ['vegan-option'],
      },
      { name: 'Brown Butter Brussels Sprouts', price: '6', description: 'Citrus and brown butter vinaigrette.' },
    ],
  },
  {
    id: 'add-ons',
    title: 'Add-ons',
    compact: true,
    items: [
      { name: 'Bacon', price: '1.50' },
      { name: 'Gluten free bun', price: '2.50', tags: ['gf-option'] },
      { name: 'Smoked Ketchup', price: '.50' },
      { name: 'Extra Cheese', price: '1.50' },
      { name: 'Spicy Dill Pickles', price: '.50' },
      { name: 'Fried Egg', price: '2', note: 'Sunny side or hard' },
      { name: 'Ghost Chili Mayo', price: '.50' },
      { name: 'Pork Belly', price: '3' },
    ],
  },
  {
    id: 'extras',
    title: 'Extras',
    intro: 'Served in a 2 oz ramekin.',
    compact: true,
    items: [
      { name: 'Grind Smoked Ketchup', price: '1' },
      { name: 'Smoked Habanero Honey', price: '2' },
      { name: 'Ghost Chili Mayo', price: '1' },
      { name: 'Garlic Mayo', price: '1' },
      { name: 'Arugula Ranch', price: '1' },
      { name: 'Habanero Jam', price: '2' },
      { name: 'Dill Pickle Hot Sauce', price: '1' },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    compact: true,
    items: [
      { name: 'Fountain Drinks', price: '2.50', note: 'Coke products' },
      {
        name: 'Bottled Sodas',
        price: '3.75',
        description: 'Mexican Coca-Cola, Sprecher’s Root Beer, Orange Cream, Cream Soda, Ale-8.',
      },
      { name: 'Premium Sparkling Mineral Water', price: '2.50' },
      { name: 'Premium Bottled Water', price: '2.50' },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert',
    intro: 'From Smør Nordic Bakery.',
    items: [
      { name: 'Smork — Chocolate chip toffee cookie', price: '' },
      { name: 'Kladdkaka — Swedish sticky chocolate cake', price: '' },
    ],
  },
];

export const menuFootnotes = [
  '*Menu subject to change without notice.',
  '*Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness. Ask your server about which items can be served with raw or undercooked ingredients.',
];

export const signatureBurgers = ['Grind', 'B&B', 'Southern', 'Chain', 'Shroom & Cheddar', 'Veggie'];
