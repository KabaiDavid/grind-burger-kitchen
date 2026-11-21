import Link from 'next/link';
import { site, hoursGrouped, fullAddress, nav } from '@/data/site';
import { Icon } from './Icon';
import { Marquee } from './Marquee';
import { OpenStatus } from './OpenStatus';

export function Footer() {
  return (
    <footer className="site-footer grain dark on-dark">
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-cta">
          <h2 className="display h-3xl">
            Hungry yet<span className="text-red">?</span>
          </h2>
          <div className="btn-row">
            <a className="btn btn--red" href={site.links.order} target="_blank" rel="noopener">
              Order pickup <Icon name="arrow-up-right" className="arrow" />
            </a>
            <a className="btn btn--ghost-light" href={site.links.reserve} target="_blank" rel="noopener">
              Reserve a table
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/img/logo-cream.webp" alt="Grind Burger Kitchen" width={640} height={211} loading="lazy" />
            <p className="voice" style={{ fontSize: 'var(--t-xl)', marginTop: '1.25rem', lineHeight: 1.2 }}>
              {site.tagline}
            </p>
            <div className="social">
              <a href={site.links.instagram} target="_blank" rel="noopener" aria-label="Grind on Instagram">
                <Icon name="instagram" />
              </a>
              <a href={site.links.facebook} target="_blank" rel="noopener" aria-label="Grind on Facebook">
                <Icon name="facebook" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="label">Visit</h3>
            <address>
              <a href={site.links.directions} target="_blank" rel="noopener">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postal}
              </a>
            </address>
            <ul style={{ marginTop: '1rem' }}>
              {hoursGrouped.map((h) => (
                <li key={h.days}>
                  {h.days} · {h.label}
                </li>
              ))}
            </ul>
            <OpenStatus className="footer-status" />
          </div>
          <div>
            <h3 className="label">Explore</h3>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label === 'Bar' ? 'Bar & Beer' : n.label === 'Visit' ? 'Visit & Contact' : n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/order-online/">Order online</Link>
              </li>
              <li>
                <Link href="/jobs/">Join Team Grind</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="label">Say hi</h3>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.links.giftCards} target="_blank" rel="noopener">
                  Gift cards
                </a>
              </li>
              <li>
                <a href={site.links.reserve} target="_blank" rel="noopener">
                  Reservations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Marquee items={['Fresh ground', 'Hand crafted', 'Grass fed', 'NuLu · Louisville']} className="footer-marquee" />
      <div className="wrap" style={{ position: 'relative', zIndex: 2, marginTop: '1.5rem' }}>
        <div className="footer-base">
          <p>© {new Date().getFullYear()} {site.legal} · {fullAddress}</p>
          <p>We cook to order — thanks for your patience at peak times.</p>
        </div>
      </div>
    </footer>
  );
}
