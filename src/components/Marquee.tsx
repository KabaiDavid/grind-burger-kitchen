import { GrinderPlate } from './GrinderPlate';

export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <span className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span className="marquee__item" key={i}>
          {t}
          <GrinderPlate lugs={false} />
        </span>
      ))}
    </span>
  );
  return (
    <div className={`marquee ${className}`}>
      <span className="sr-only">{items.join(' · ')}</span>
      <div style={{ display: 'inline-flex' }} aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
