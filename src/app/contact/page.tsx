import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { HoursTable } from '@/components/HoursTable';
import { MapEmbed } from '@/components/MapEmbed';
import { OpenStatus } from '@/components/OpenStatus';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { site, visitNotes, fullAddress } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Visit & Contact — Hours, Parking, Reservations',
  description:
    'Grind Burger Kitchen, 829 E. Market St, Ste C, Louisville, KY 40206. Hours, parking, OpenTable reservations, large parties and how to reach us.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Visit"
        eyebrow="Visit & contact"
        title={
          <>
            Find us <span className="text-red">in NuLu.</span>
          </>
        }
        lede={fullAddress}
      >
        <div style={{ marginTop: '1.25rem' }}>
          <OpenStatus />
        </div>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <a className="btn btn--red" href={site.links.directions} target="_blank" rel="noopener">
            <Icon name="pin" className="arrow" /> Get directions
          </a>
          <a className="btn btn--ghost" href={site.links.reserve} target="_blank" rel="noopener">
            <Icon name="calendar" className="arrow" /> Reserve a table
          </a>
        </div>
      </PageHero>

      <section className="section grain" style={{ paddingTop: 0 }}>
        <div className="wrap visit" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <h2 className="eyebrow" style={{ marginBottom: '1rem' }}>
              Hours
            </h2>
            <HoursTable />
            <p className="note" style={{ marginTop: '1.5rem' }}>
              {visitNotes.thirdParty}{' '}
              <a className="link" href={site.links.facebook} target="_blank" rel="noopener">
                Facebook
              </a>
            </p>
            <div className="visit__notes">
              <div>
                <h3 className="label">Parking</h3>
                <p>{visitNotes.parking}</p>
              </div>
              <div>
                <h3 className="label">Reservations</h3>
                <p>
                  Book on{' '}
                  <a className="link" href={site.links.reserve} target="_blank" rel="noopener">
                    OpenTable
                  </a>
                  . {visitNotes.patio}
                </p>
              </div>
              <div>
                <h3 className="label">Large parties</h3>
                <p>
                  {visitNotes.largeParty} {visitNotes.gratuity}
                </p>
              </div>
              <div>
                <h3 className="label">Online orders</h3>
                <p>{visitNotes.onlinePickup}</p>
              </div>
            </div>
          </div>
          <MapEmbed height={560} />
        </div>
      </section>

      <section className="section paper-2 grain" aria-labelledby="reach-h">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <h2 id="reach-h" className="display h-3xl" style={{ marginBottom: '2.5rem' }}>
            Reach us.
          </h2>
          <div className="contact-grid">
            <div className="card contact-card">
              <h3 className="label">Email — fastest</h3>
              <p className="big big--email">
                <a href={`mailto:${site.email}`} style={{ textDecoration: 'none' }}>
                  {site.email}
                </a>
              </p>
              <p className="muted" style={{ fontSize: 'var(--t-sm)' }}>
                Left something behind? Need immediate help or have a question? Email us or send a message on Facebook.
              </p>
              <a className="btn btn--red btn--sm" href={`mailto:${site.email}`}>
                <Icon name="mail" className="arrow" /> Email Grind
              </a>
            </div>
            <div className="card contact-card">
              <h3 className="label">Phone — please read first</h3>
              <p className="big">
                <a href={`tel:${site.phone.tel}`} style={{ textDecoration: 'none' }}>
                  {site.phone.display}
                </a>
              </p>
              <p className="muted" style={{ fontSize: 'var(--t-sm)' }}>
                {visitNotes.phone}
              </p>
            </div>
            <div className="card contact-card">
              <h3 className="label">Social</h3>
              <p className="big">@grindburgerkitchen</p>
              <div className="btn-row" style={{ marginTop: '1.5rem' }}>
                <a className="btn btn--ghost btn--sm" href={site.links.facebook} target="_blank" rel="noopener">
                  <Icon name="facebook" className="arrow" /> Facebook
                </a>
                <a className="btn btn--ghost btn--sm" href={site.links.instagram} target="_blank" rel="noopener">
                  <Icon name="instagram" className="arrow" /> Instagram
                </a>
              </div>
            </div>
          </div>
          <p style={{ marginTop: '2.5rem' }}>
            Have a question? Check our{' '}
            <Link className="link" href="/faq/">
              FAQ
            </Link>{' '}
            — and grab a{' '}
            <a className="link" href={site.links.giftCards} target="_blank" rel="noopener">
              gift card
            </a>{' '}
            while you’re here.
          </p>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', path: '/contact/' }])} />
    </>
  );
}
