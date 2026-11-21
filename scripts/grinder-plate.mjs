// The Grind grinder-plate mark, redrawn as geometry from the original logo:
// a die with lugs, a centre bore, and two staggered rings of ten holes.
export function plateHoles() {
  const holes = [{ x: 50, y: 50, r: 8.5 }];
  for (let i = 0; i < 10; i++) {
    const a1 = ((18 + i * 36) * Math.PI) / 180;
    holes.push({ x: 50 + 21.5 * Math.cos(a1), y: 50 - 21.5 * Math.sin(a1), r: 3.7 });
    const a2 = ((i * 36) * Math.PI) / 180;
    holes.push({ x: 50 + 31.5 * Math.cos(a2), y: 50 - 31.5 * Math.sin(a2), r: 3.9 });
  }
  return holes;
}
export function grinderPlateSVG({ fill = '#141110', bg = null } = {}) {
  const holes = plateHoles().map((h) => `<circle cx="${h.x.toFixed(2)}" cy="${h.y.toFixed(2)}" r="${h.r}" fill="#000"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${bg ? `<rect width="100" height="100" rx="22" fill="${bg}"/>` : ''}<mask id="m"><rect x="5" y="45.5" width="90" height="9" fill="#fff"/><circle cx="50" cy="50" r="39" fill="#fff"/>${holes}</mask><rect width="100" height="100" fill="${fill}" mask="url(#m)"/></svg>`;
}
