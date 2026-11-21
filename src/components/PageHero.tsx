import Link from 'next/link';
import { GrinderPlate } from './GrinderPlate';

export function PageHero({
  eyebrow,
  title,
  lede,
  crumb,
  dark = false,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumb: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero grain ${dark ? 'dark' : ''}`}>
      <GrinderPlate className="page-hero__plate" />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <p className="eyebrow" style={{ marginTop: '2.5rem' }} data-reveal>
          {eyebrow}
        </p>
        <h1 className="display h-4xl" data-reveal style={{ ['--d' as string]: 1 }}>
          {title}
        </h1>
        {lede ? (
          <p className="lede" data-reveal style={{ ['--d' as string]: 2 }}>
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
