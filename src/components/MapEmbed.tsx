import { site, fullAddress } from '@/data/site';
import { Icon } from './Icon';

export function MapEmbed({ height = 480 }: { height?: number }) {
  const q = encodeURIComponent(`Grind Burger Kitchen, ${fullAddress}`);
  return (
    <div className="visit__map" style={{ minHeight: height }}>
      <iframe
        title="Map showing Grind Burger Kitchen at 829 E. Market St, Louisville"
        src={`https://www.google.com/maps?q=${q}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="visit__pin on-dark">
        <div>
          <p className="label" style={{ color: 'var(--cream-muted)' }}>
            Find us in NuLu
          </p>
          <p style={{ fontWeight: 650 }}>{fullAddress}</p>
        </div>
        <a className="btn btn--red btn--sm" href={site.links.directions} target="_blank" rel="noopener">
          Directions <Icon name="arrow-up-right" className="arrow" />
        </a>
      </div>
    </div>
  );
}
