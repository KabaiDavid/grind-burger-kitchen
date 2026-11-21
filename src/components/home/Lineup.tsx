'use client';

import { useState } from 'react';
import { GrinderPlate } from '../GrinderPlate';
import { Picture } from '../Picture';

export type LineupItem = {
  name: string;
  price: string;
  description: string;
  tagline?: string;
  layers: string[];
  photo?: { name: 'chain-burger' | 'southern-burger'; alt: string };
};

function Frame({ item }: { item: LineupItem }) {
  if (item.photo) {
    return (
      <div className="media media--shade">
        <Picture name={item.photo.name} alt={item.photo.alt} sizes="(min-width: 1024px) 40vw, 90vw" />
      </div>
    );
  }
  return (
    <div className="plate-card" role="img" aria-label={`${item.name}: ${item.layers.join(', ')}`}>
      <GrinderPlate className="plate-card__plate" />
      <p className="label" style={{ position: 'relative' }}>
        Built in-house
      </p>
      <div style={{ position: 'relative' }}>
        <p className="plate-card__name">{item.name}</p>
        <ul className="plate-card__layers" style={{ marginTop: '1.25rem' }}>
          {item.layers.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Lineup({ items }: { items: LineupItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="lineup__body">
      <ul className="lineup__list">
        {items.map((item, i) => {
          const open = active === i;
          const id = `lineup-${i}`;
          return (
            <li className="lineup__item" key={item.name}>
              <h3>
                <button
                  className="lineup__btn"
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="lineup__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lineup__name">{item.name}</span>
                  <span className="lineup__price">
                    <span className="sr-only">$</span>
                    {item.price}
                  </span>
                </button>
              </h3>
              <div className="lineup__panel" id={id} data-open={open} role="region" aria-label={item.name}>
                <div>
                  <p>
                    {item.description}
                    {item.tagline ? <span className="tagline">{item.tagline}</span> : null}
                  </p>
                  {item.photo ? (
                    <div className="lineup__mobile-media media">
                      <Picture name={item.photo.name} alt={item.photo.alt} sizes="90vw" />
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="lineup__stage" aria-hidden="true">
        {items.map((item, i) => (
          <figure className="lineup__frame" data-active={active === i} key={item.name}>
            <Frame item={item} />
            {item.photo ? <figcaption className="label">The {item.name}</figcaption> : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
