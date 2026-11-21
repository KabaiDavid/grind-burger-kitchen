'use client';

import { useState } from 'react';
import type { DrinkList } from '@/data/beer';

const label = (t: string) => (t.startsWith('Draft') ? 'On draft' : t.startsWith('Bottles') ? 'Cans & bottles' : t);

export function BeerBoard({ lists }: { lists: DrinkList[] }) {
  const [tab, setTab] = useState(0);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = lists.length;
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };
  return (
    <div className="beer">
      <div role="tablist" aria-label="Drink lists" className="beer__tabs">
        {lists.map((l, i) => (
          <button
            key={l.title}
            id={`tab-${i}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`panel-${i}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {label(l.title)} <span className="beer__count">{l.categories.reduce((n, c) => n + c.items.length, 0)}</span>
          </button>
        ))}
      </div>
      {lists.map((l, i) => (
        <div key={l.title} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} hidden={tab !== i} className="beer__panel">
          <h2 className="sr-only">{label(l.title)}</h2>
          {l.categories.map((c) => (
            <section key={c.title} className="beer__cat">
              <h3 className="label beer__cat-title">{c.title}</h3>
              <ul className="beer__list">
                {c.items.map((d) => (
                  <li key={d.name} className="beer__item">
                    <p className="beer__name">{d.name}</p>
                    {d.style || d.abv ? (
                      <p className="beer__specs">
                        {[d.style, d.abv && `${d.abv} ABV`, d.ibu && `${d.ibu} IBU`].filter(Boolean).join(' · ')}
                      </p>
                    ) : null}
                    {d.brewery ? (
                      <p className="beer__brewery">
                        {d.brewery}
                        {d.location ? <span> — {d.location}</span> : null}
                      </p>
                    ) : null}
                    {d.ingredients ? <p className="beer__desc">{d.ingredients}</p> : null}
                    {d.description ? <p className="beer__desc">{d.description}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ))}
    </div>
  );
}
