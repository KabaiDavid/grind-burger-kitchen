import { useId } from 'react';

/** Hole geometry redrawn from the Grind logo's grinder plate (see scripts/grinder-plate.mjs). */
export function plateHoles() {
  const holes = [{ x: 50, y: 50, r: 8.5 }];
  for (let i = 0; i < 10; i++) {
    const a1 = ((18 + i * 36) * Math.PI) / 180;
    holes.push({ x: 50 + 21.5 * Math.cos(a1), y: 50 - 21.5 * Math.sin(a1), r: 3.7 });
    const a2 = (i * 36 * Math.PI) / 180;
    holes.push({ x: 50 + 31.5 * Math.cos(a2), y: 50 - 31.5 * Math.sin(a2), r: 3.9 });
  }
  return holes.map((h) => ({ x: +h.x.toFixed(2), y: +h.y.toFixed(2), r: h.r }));
}

export function GrinderPlate({ className, lugs = true, title }: { className?: string; lugs?: boolean; title?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 100 100" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      <mask id={`gp${id}`}>
        {lugs ? <rect x="5" y="45.5" width="90" height="9" fill="#fff" /> : null}
        <circle cx="50" cy="50" r="39" fill="#fff" />
        {plateHoles().map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r={h.r} fill="#000" />
        ))}
      </mask>
      <rect width="100" height="100" fill="currentColor" mask={`url(#gp${id})`} />
    </svg>
  );
}
