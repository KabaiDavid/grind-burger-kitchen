'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import { Icon } from '../Icon';
import { OpenStatus } from '../OpenStatus';
import { plateHoles } from '../GrinderPlate';
import images from '@/data/images.json';

const holes = plateHoles();
// Disc with every hole punched out (even-odd), so the photo shows through.
const discPath =
  'M50 11a39 39 0 1 0 0.001 0Z ' +
  holes.map((h) => `M${h.x - h.r} ${h.y}a${h.r} ${h.r} 0 1 0 ${h.r * 2} 0a${h.r} ${h.r} 0 1 0 ${-h.r * 2} 0Z`).join(' ');

export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const plate = el.querySelector<HTMLElement>('.hero__plate')!;
        const svg = el.querySelector<SVGElement>('.hero__plate svg')!;
        // Scale needed for the 8.5% centre bore to swallow the whole viewport.
        const coverScale = () => {
          const r = plate.getBoundingClientRect();
          const size = r.width / (Number(gsap.getProperty(plate, 'scale')) || 1);
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const far = Math.max(
            Math.hypot(cx, cy),
            Math.hypot(window.innerWidth - cx, cy),
            Math.hypot(cx, window.innerHeight - cy),
            Math.hypot(window.innerWidth - cx, window.innerHeight - cy),
          );
          return (far / (size * 0.085)) * 1.05;
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=140%',
            pin: el.querySelector('.hero__stage'),
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to('.hero__content', { autoAlpha: 0, y: -60, duration: 0.25 }, 0)
          .to('.hero__scroll', { autoAlpha: 0, duration: 0.1 }, 0)
          .to(svg, { rotate: 72, duration: 0.75, ease: 'power1.in' }, 0)
          .to(plate, { scale: coverScale, duration: 0.75, ease: 'power3.in' }, 0)
          .fromTo('.hero__photo', { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
          .to('.hero__shade', { opacity: 0.25, duration: 0.35 }, 0.55)
          .fromTo('.hero__reveal', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.72)
          .to({}, { duration: 0.15 });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const hero = images.hero;
  const portrait = images['hero-portrait'];
  const set = (name: string, widths: number[], ext: string) => widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');

  return (
    <section className="hero on-dark" ref={root} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__photo">
          <picture>
            <source media="(max-aspect-ratio: 4/5)" type="image/avif" srcSet={set('hero-portrait', portrait.widths, 'avif')} sizes="100vw" />
            <source media="(max-aspect-ratio: 4/5)" type="image/webp" srcSet={set('hero-portrait', portrait.widths, 'webp')} sizes="100vw" />
            <source type="image/avif" srcSet={set('hero', hero.widths, 'avif')} sizes="100vw" />
            <source type="image/webp" srcSet={set('hero', hero.widths, 'webp')} sizes="100vw" />
            <img
              src="/img/hero-1440.webp"
              alt="Overhead view of a Grind table: burgers on wooden boards, a plate of house-cut fries, pimento cheese, spicy dill pickles, a fried-egg burger and a kale salad"
              width={hero.width}
              height={hero.height}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        </div>
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__plate" aria-hidden="true">
          <div className="hero__plate-in">
          <svg viewBox="0 0 100 100">
            <path d={discPath} fillRule="evenodd" className="hero__disc" />
            <rect x="4" y="45.5" width="8" height="9" className="hero__disc" />
            <rect x="88" y="45.5" width="8" height="9" className="hero__disc" />
          </svg>
          </div>
        </div>

        <div className="hero__content wrap">
          <p className="eyebrow">NuLu · Louisville, Kentucky</p>
          <h1 id="hero-title" className="display hero__title">
            <span className="line">From the</span>
            <span className="line">
              grind <span className="text-red">up.</span>
            </span>
          </h1>
          <p className="hero__lede">
            Chef-driven burgers from a proprietary blend of grass-fed beef — trimmed and ground fresh daily, cooked to order on East Market Street.
          </p>
          <div className="btn-row">
            <Link className="btn btn--red" href="/food-menu/">
              Explore the menu <Icon name="arrow" className="arrow" />
            </Link>
            <a className="btn btn--ghost-light" href={site.links.order} target="_blank" rel="noopener">
              Order pickup <Icon name="arrow-up-right" className="arrow" />
            </a>
          </div>
          <OpenStatus className="hero__status" />
        </div>

        <div className="hero__reveal wrap" aria-hidden="true">
          <p className="display hero__reveal-title">
            <span>Fresh ground.</span>
            <span className="voice">Hand crafted.</span>
            <span>Grass fed.</span>
          </p>
        </div>

        <p className="hero__scroll label" aria-hidden="true">
          <span /> Scroll
        </p>
      </div>
    </section>
  );
}
