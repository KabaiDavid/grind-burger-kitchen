import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { MenuExplorer } from '@/components/menu/MenuExplorer';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { menu, menuFootnotes, doneness } from '@/data/menu';
import { site, SITE_URL, visitNotes } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Food Menu — Burgers, Sandwiches, Sides & Prices',
  description:
    'The full Grind menu with prices: Southern, B&B, Chain and Veggie burgers, the Triple D Cuban, house-cut fries and more. Gluten-free buns and vegan options.',
  path: '/food-menu/',
});

const menuLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Grind Burger Kitchen Menu',
  url: `${SITE_URL}/food-menu/`,
  inLanguage: 'en-US',
  hasMenuSection: menu.map((s) => ({
    '@type': 'MenuSection',
    name: s.title,
    description: s.intro,
    hasMenuItem: s.items.map((i) => ({
      '@type': 'MenuItem',
      name: i.name,
      description: i.description,
      ...(i.price ? { offers: { '@type': 'Offer', price: i.price.startsWith('.') ? '0' + i.price : i.price, priceCurrency: 'USD' } } : {}),
      ...(i.tags?.includes('vegan-option') ? { suitableForDiet: 'https://schema.org/VeganDiet' } : {}),
    })),
  })),
};

export default function FoodMenuPage() {
  return (
    <>
      <PageHero
        crumb="Menu"
        eyebrow="Food menu"
        title={
          <>
            Burgers, <span className="text-red">ground daily.</span>
          </>
        }
        lede="All beef is trimmed and ground fresh daily. All burgers come with your choice of side. Our burgers are gluten free — just ask for an Annie May’s bun."
      >
        <div className="btn-row" style={{ marginTop: '2rem' }} data-reveal>
          <a className="btn btn--red" href={site.links.order} target="_blank" rel="noopener">
            Order pickup <Icon name="arrow-up-right" className="arrow" />
          </a>
          <a className="btn btn--ghost" href={site.links.reserve} target="_blank" rel="noopener">
            Reserve a table
          </a>
        </div>
        <ul className="menu-temps" aria-label="Burger temperatures">
          {doneness.map((d) => (
            <li key={d.name}>
              <i style={{ background: d.color }} aria-hidden="true" />
              <b>{d.name}</b> <span className="muted">{d.note}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <MenuExplorer sections={menu} />

      <section className="section" aria-label="Menu notes">
        <div className="wrap">
          <div className="menu-aside">
            <div className="card">
              <h2 className="label">Gluten free & vegan</h2>
              <p style={{ marginTop: '0.75rem', fontSize: 'var(--t-sm)' }}>
                Our burgers are gluten free and we always have buns from Annie May’s Sweet Cafe, a dedicated gluten-free bakery in Louisville. The Veggie
                and kale salad can be made vegan. We’re not a dedicated gluten-free facility —{' '}
                <Link className="link" href="/faq/">
                  read more
                </Link>
                .
              </p>
            </div>
            <div className="card">
              <h2 className="label">Cooked to order</h2>
              <p style={{ marginTop: '0.75rem', fontSize: 'var(--t-sm)' }}>{visitNotes.cookToOrder}</p>
            </div>
            <div className="card">
              <h2 className="label">The fine print</h2>
              {menuFootnotes.map((f) => (
                <p key={f} className="muted" style={{ marginTop: '0.75rem', fontSize: 'var(--t-xs)' }}>
                  {f}
                </p>
              ))}
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: '3rem', justifyContent: 'center' }}>
            <Link className="btn btn--ghost" href="/beer-menu/">
              Beer, bourbon & cocktails <Icon name="arrow" className="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <JsonLd data={menuLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Food Menu', path: '/food-menu/' }])} />
    </>
  );
}
