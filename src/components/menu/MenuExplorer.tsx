'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { MenuSection } from '@/data/menu';
import { Icon } from '../Icon';

const TAGS: Record<string, string> = {
  ddd: 'As seen on Triple D',
  'vegan-option': 'Vegan option',
  'gf-option': 'Gluten free',
  'build-your-own': 'Build your own',
  'no-subs': 'No substitutions',
};

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function MenuExplorer({ sections }: { sections: MenuSection[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(sections[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return sections;
    return sections
      .map((s) => ({ ...s, items: s.items.filter((i) => norm(`${i.name} ${i.description ?? ''} ${i.note ?? ''}`).includes(q)) }))
      .filter((s) => s.items.length);
  }, [query, sections]);
  const count = filtered.reduce((n, s) => n + s.items.length, 0);

  // Scroll-spy for the category rail.
  useEffect(() => {
    const els = filtered.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [filtered]);

  // Keep the active chip in view on small screens.
  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const rail = navRef.current?.querySelector<HTMLElement>('ul');
    if (chip && rail) rail.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="menu">
      <div className="menu__rail" ref={navRef}>
        <div className="wrap menu__rail-inner">
          <nav aria-label="Menu categories">
            <ul>
              {sections.map((s) => {
                const has = filtered.some((f) => f.id === s.id);
                return (
                  <li key={s.id}>
                    <a href={`#${s.id}`} data-id={s.id} aria-current={active === s.id ? 'true' : undefined} aria-disabled={!has || undefined} className={has ? '' : 'is-empty'}>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <label className="menu__search">
            <Icon name="search" />
            <span className="sr-only">Search the menu</span>
            <input type="search" placeholder="Search: bacon, vegan, brioche…" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="wrap">
        <p className="sr-only" aria-live="polite">
          {query ? `${count} item${count === 1 ? '' : 's'} match “${query}”` : ''}
        </p>
        {filtered.length === 0 ? (
          <div className="menu__empty">
            <p className="display h-2xl">Nothing on the grill for “{query}”.</p>
            <button className="btn btn--ghost" onClick={() => setQuery('')} style={{ marginTop: '1.5rem' }}>
              Clear search
            </button>
          </div>
        ) : null}
        {filtered.map((s) => (
          <section key={s.id} id={s.id} className={`menu__section ${s.compact ? 'is-compact' : ''}`} aria-labelledby={`${s.id}-h`}>
            <header className="menu__section-head">
              <h2 id={`${s.id}-h`} className="display h-3xl">
                {s.title}
              </h2>
              {s.intro ? <p className="menu__intro voice">{s.intro}</p> : null}
            </header>
            <ul className="menu__items">
              {s.items.map((i) => (
                <li key={i.name + i.price} className="menu__item">
                  <div className="menu__item-head">
                    <h3 className="menu__name">{i.name}</h3>
                    <span className="menu__leader" aria-hidden="true" />
                    {i.price ? (
                      <span className="menu__price">
                        <span className="sr-only">$</span>
                        {i.price}
                      </span>
                    ) : null}
                  </div>
                  {i.description ? <p className="menu__desc">{i.description}</p> : null}
                  {i.note || i.tags?.length ? (
                    <p className="menu__meta">
                      {i.tags?.map((t) => (
                        <span key={t} className={`tag tag--${t}`}>
                          {TAGS[t]}
                        </span>
                      ))}
                      {i.note && !i.note.includes('Diners') ? <span className="menu__note">{i.note}</span> : null}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
