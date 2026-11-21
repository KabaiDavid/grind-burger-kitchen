import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { BeerBoard } from '@/components/inner/BeerBoard';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { beer, draftCount } from '@/data/beer';
import { site } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Beer, Bourbon & Cocktails — The Bar',
  description:
    'A full bar with 75+ bourbons, rotating Kentucky and regional drafts, cans, ciders and house cocktails like the Grind Smoked Bloody Mary. NuLu, Louisville.',
  path: '/beer-menu/',
});

const fmt = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function BeerPage() {
  return (
    <div className="dark">
      <PageHero
        dark
        crumb="Bar"
        eyebrow="Beer · Bourbon · Cocktails"
        title={
          <>
            75+ bourbons. <span className="text-red">Cold drafts.</span>
          </>
        }
        lede={`A full bar with more than 75 bourbons, ${draftCount} drafts that rotate with the season, and house cocktails built around Kentucky whiskey — and our smoked ketchup.`}
      />
      <section className="section grain dark" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="muted" style={{ fontSize: 'var(--t-sm)', marginBottom: '1.5rem' }}>
            Our list changes often. Last updated {beer.updated} via{' '}
TapHunter 
            (synced {fmt(beer.syncedAt)}). Must be 21+ to order alcohol.
          </p>
          <BeerBoard lists={beer.lists} />
          <div className="split" style={{ marginTop: 'var(--section)' }}>
            <div className="span-7">
              <h2 className="display h-3xl">
                Bourbon country. <span className="voice" style={{ textTransform: 'none' }}>Obviously.</span>
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }}>
                Ask your server or bartender about the 75+ bourbons behind the bar — the list is too good (and changes too often) to print.
              </p>
            </div>
            <div className="span-5" style={{ alignSelf: 'end' }}>
              <div className="btn-row">
                <a className="btn btn--red" href={site.links.reserve} target="_blank" rel="noopener">
                  Reserve a table
                </a>
                <Link className="btn btn--ghost" href="/food-menu/">
                  Food menu <Icon name="arrow" className="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Beer Menu', path: '/beer-menu/' }])} />
    </div>
  );
}
