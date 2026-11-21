// Typed access to the TapHunter snapshot (regenerate with `npm run sync:beer`).
import raw from './beer.json';

export type Drink = {
  name: string;
  style?: string;
  abv?: string;
  ibu?: string;
  brewery?: string;
  location?: string;
  description?: string;
  ingredients?: string;
};
export type DrinkList = { title: string; count: number; categories: { title: string; items: Drink[] }[] };

export const beer = raw as unknown as { source: string; updated: string; syncedAt: string; lists: DrinkList[] };
export const cocktails = beer.lists.find((l) => l.title === 'Cocktails')?.categories.flatMap((c) => c.items) ?? [];
export const draftCount = beer.lists.find((l) => l.title.startsWith('Draft'))?.count ?? 0;
