import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { GrinderPlate } from '@/components/GrinderPlate';
import { OpenStatus } from '@/components/OpenStatus';
import { site, visitNotes, hoursGrouped } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Order Online for Pickup',
  description:
    'Order Grind Burger Kitchen online for pickup at 829 E. Market St, Louisville. Quick notes on allergies, gift cards and large orders, then order on Toast.',
  path: '/order-online/',
});

const rules = [
  {
    t: 'Stick to the menu’s items and options.',
    d: 'If there’s something you think we should offer, tell us at the counter when you pick up. Adding items not listed may result in additional charges when you arrive.',
  },
  {
    t: 'Allergy? Put it in the notes.',
    d: 'Please make any allergy clear in the notes. Refunds will not be issued if allergy information is left off by the customer.',
  },
  {
    t: 'Use the notes field — not the phone.',
    d: 'Each item has a spot for additional notes for the staff and kitchen. Please use it instead of calling or emailing.',
  },
  { t: 'Don’t see an item?', d: 'It’s most likely out of stock in the restaurant right now.' },
  { t: 'Gift cards can’t be used online.', d: 'At this time we can’t accept gift cards for online orders. We apologize for the inconvenience.' },
  {
    t: 'Orders over $200 will be declined.',
    d: `For a larger order, email ${site.email} 48 hours in advance to coordinate.`,
  },
  { t: 'Picking up?', d: visitNotes.onlinePickup.replace('Picking up an online order? ', '') },
];

export default function OrderPage() {
  return (
    <>
      <PageHero
        dark
        crumb="Order online"
        eyebrow="Pickup · 829 E. Market St"
        title={
          <>
            Order ahead. <span className="text-red">Skip the wait.</span>
          </>
        }
        lede="We cook every order to order. Read these quick notes, then place your pickup order on Toast."
      >
        <div className="btn-row" style={{ marginTop: '2rem' }} data-reveal>
          <a className="btn btn--red" href="#before-you-order">
            Read before ordering
          </a>
          <a className="btn btn--ghost-light" href={site.links.order} target="_blank" rel="noopener">
            Go straight to Toast <Icon name="arrow-up-right" className="arrow" />
          </a>
        </div>
      </PageHero>

      <section className="section grain" id="before-you-order" aria-labelledby="rules-title">
        <div className="wrap order-grid" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <p className="eyebrow">Please read before placing your order</p>
            <h2 id="rules-title" className="display h-3xl" style={{ margin: '1rem 0 2rem' }}>
              Seven quick notes.
            </h2>
            <ol className="rules">
              {rules.map((r) => (
                <li key={r.t}>
                  <div>
                    <h3>{r.t}</h3>
                    <p>{r.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="warning">
              Please note we are not responsible for orders incorrectly placed. Please double check your order before confirmation and payment. Refunds
              will not be issued upon arrival if the order given matches the order placed.
            </p>
          </div>
          <aside className="order-card on-dark" aria-label="Start your order">
            <GrinderPlate className="plate" />
            <p className="label" style={{ color: 'var(--cream-muted)' }}>
              Pickup at Grind
            </p>
            <p className="display h-2xl" style={{ marginTop: '0.75rem' }}>
              Ready when you are.
            </p>
            <OpenStatus className="order-status" />
            <ul style={{ marginTop: '1rem', fontSize: 'var(--t-sm)', color: 'var(--cream-muted)' }}>
              {hoursGrouped.map((h) => (
                <li key={h.days}>
                  {h.days} · {h.label}
                </li>
              ))}
            </ul>
            <a className="btn btn--red" style={{ width: '100%', marginTop: '1.75rem' }} href={site.links.order} target="_blank" rel="noopener">
              Start my order on Toast <Icon name="arrow-up-right" className="arrow" />
            </a>
            <p style={{ marginTop: '1.25rem', fontSize: 'var(--t-xs)', color: 'var(--cream-muted)' }}>
              Online ordering is handled securely by Toast and opens in a new tab.{' '}
              <Link className="link" href="/food-menu/">
                Browse the menu first
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Order Online', path: '/order-online/' }])} />
    </>
  );
}
