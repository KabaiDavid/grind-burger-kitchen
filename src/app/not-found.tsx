import Link from 'next/link';
import { GrinderPlate } from '@/components/GrinderPlate';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf grain">
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <GrinderPlate />
        <p className="eyebrow">404</p>
        <h1 className="display h-3xl" style={{ margin: '1rem 0' }}>
          This page went through the grinder.
        </h1>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Link className="btn btn--red" href="/">
            Back home
          </Link>
          <Link className="btn btn--ghost" href="/food-menu/">
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
