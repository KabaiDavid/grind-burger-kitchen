'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site, hoursGrouped, fullAddress } from '@/data/site';
import { Icon } from './Icon';
import { OpenStatus } from './OpenStatus';

/** Pages whose first screen is dark get a light header until scrolled. */
const DARK_TOP = ['/', '/beer-menu/', '/order-online/'];

export function Header() {
  const pathname = usePathname() || '/';
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > last + 4);
        if (y < last - 4) setHidden(false);
        setBarVisible(y > window.innerHeight * 0.6);
        // Which surface is under the header? Dark sections keep a dark header.
        const probe = document.elementsFromPoint(window.innerWidth / 2, 80).find((n) => !n.closest('.site-header, .drawer, .action-bar'));
        setOverDark(!!probe?.closest('.dark, .dark-2, .hero, .red-bg, .site-footer'));
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const first = drawerRef.current?.querySelector<HTMLElement>('a');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const els = [toggleRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>('a,button')].filter(Boolean) as HTMLElement[];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          els[els.length - 1].focus();
        } else if (!e.shiftKey && i === els.length - 1) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const tone = DARK_TOP.includes(path) ? 'dark' : 'light';
  const isCurrent = (href: string) => (path === href ? 'page' : undefined);

  return (
    <>
      <header
        className="site-header"
        data-tone={tone}
        data-scrolled={scrolled && !open}
        data-over={overDark ? 'dark' : 'light'}
        data-hidden={hidden && !open}
        data-menu={open ? 'open' : 'closed'}
      >
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Grind Burger Kitchen — home">
            <img className="logo-ink" src="/img/logo-ink.webp" alt="" width={640} height={211} />
            <img className="logo-cream" src="/img/logo-cream.webp" alt="" width={640} height={211} />
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isCurrent(n.href)}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <a className="btn btn--ghost btn--sm" href={site.links.reserve} target="_blank" rel="noopener">
              Reserve
            </a>
            <Link className="btn btn--red btn--sm" href="/order-online/">
              Order<span className="sr-only"> online for pickup</span>
            </Link>
            <button
              ref={toggleRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-drawer"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-drawer"
        className="drawer on-dark"
        data-open={open}
        ref={drawerRef}
        aria-hidden={!open}
        inert={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false);
        }}
      >
        <nav aria-label="Mobile">
          <ul>
            <li>
              <Link href="/" aria-current={isCurrent('/')}>Home</Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isCurrent(n.href)}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/jobs/" aria-current={isCurrent('/jobs/')}>Jobs</Link>
            </li>
          </ul>
        </nav>
        <div className="btn-row">
          <Link className="btn btn--red" href="/order-online/">
            Order pickup <Icon name="arrow" className="arrow" />
          </Link>
          <a className="btn btn--ghost-light" href={site.links.reserve} target="_blank" rel="noopener">
            Reserve a table
          </a>
        </div>
        <div className="drawer-meta">
          <OpenStatus />
          <p>
            {hoursGrouped.map((h) => (
              <span key={h.days} style={{ display: 'block' }}>
                {h.days} · {h.label}
              </span>
            ))}
          </p>
          <a href={site.links.directions} target="_blank" rel="noopener" className="link">
            {fullAddress}
          </a>
        </div>
      </div>

      <nav className="action-bar on-dark" data-visible={barVisible && !open} aria-label="Quick actions">
        <Link href="/food-menu/">
          <Icon name="menu" /> Menu
        </Link>
        <Link href="/order-online/" className="primary">
          <Icon name="bag" /> Order
        </Link>
        <a href={site.links.directions} target="_blank" rel="noopener">
          <Icon name="pin" /> Visit
        </a>
      </nav>
    </>
  );
}
