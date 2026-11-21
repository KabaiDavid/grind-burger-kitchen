import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Picture } from '@/components/Picture';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { storyFull, timeline, press } from '@/data/story';
import { site, SITE_URL } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Our Story — From Food Truck to NuLu',
  description:
    'Liz and Jesse Huot started Grind Gourmet Burger Truck in 2012 and opened Grind Burger Kitchen in NuLu in 2014. Our story, awards and press.',
  path: '/about-us/',
});

const aboutLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_URL}/about-us/`,
  name: 'About Grind Burger Kitchen',
  about: { '@id': `${SITE_URL}/#restaurant` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Our story"
        eyebrow="About us"
        title={
          <>
            Good food. <span className="text-red">Good people.</span>
          </>
        }
        lede="What started as a burger truck in 2012 is now a NuLu institution — run by the same two people."
      />

      <section className="section grain" style={{ paddingTop: 0 }} aria-labelledby="story-h">
        <div className="wrap about-intro" style={{ position: 'relative', zIndex: 2 }}>
          <figure>
            <div className="media" data-reveal="mask">
              <Picture name="owners" alt="Owners Liz and Jesse Huot standing in front of the Grind grinder-plate mural" sizes="(min-width: 900px) 34vw, 90vw" />
            </div>
            <figcaption className="caption">Liz & Jesse Huot</figcaption>
          </figure>
          <div>
            <h2 id="story-h" className="eyebrow">
              The story
            </h2>
            <div className="prose stack" style={{ marginTop: '1.5rem', fontSize: 'var(--t-lg)' }}>
              {storyFull.map((p, i) => (
                <p key={i} className={i === 0 ? 'dropcap' : ''} data-reveal>
                  {p}
                </p>
              ))}
            </div>
            <div className="owners" data-reveal>
              {site.owners.map((o) => (
                <p key={o.name}>
                  <strong>{o.name}</strong>
                  <span className="muted">{o.role}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section paper-2 grain" aria-labelledby="tl-h">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Timeline</p>
          <h2 id="tl-h" className="display h-4xl" style={{ marginTop: '1rem' }}>
            The grind, <span className="text-red">so far.</span>
          </h2>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={t.title} data-reveal style={{ ['--d' as string]: i }}>
                <p className="label timeline__kicker">{t.kicker}</p>
                <p className="timeline__year">{t.year}</p>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section grain" aria-labelledby="duo-h">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <h2 id="duo-h" className="display h-3xl" style={{ marginBottom: '2.5rem' }}>
            Two we’re known for.
          </h2>
          <div className="duo">
            <figure>
              <div className="media" data-reveal="mask">
                <Picture name="chain-burger" alt="The Chain burger: diner-style patties, American cheese and pickles" sizes="(min-width: 900px) 45vw, 90vw" />
              </div>
              <figcaption>
                <strong>The Chain</strong>
                <span>All your favorite things you grew up loving at those chain restaurants without all the things you don’t like as an adult.</span>
              </figcaption>
            </figure>
            <figure>
              <div className="media" data-reveal="mask">
                <Picture name="southern-burger" alt="The Southern burger with pimento cheese and bacon beside house-cut fries" sizes="(min-width: 900px) 45vw, 90vw" />
              </div>
              <figcaption>
                <strong>The Southern</strong>
                <span>Pimento cheese, crisp bacon and spicy housemade dill pickles. This thing can’t be stopped.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section red-bg grain" aria-labelledby="press-h">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Awards & press</p>
          <h2 id="press-h" className="display h-4xl" style={{ margin: '1rem 0 2.5rem' }}>
            Local & national attention.
          </h2>
          <ul className="press__list">
            {press.map((p) => {
              const inner = (
                <>
                  <span className="press__outlet">{p.outlet}</span>
                  <span className="press__title">{p.title}</span>
                  <span className="press__year">
                    {p.year}
                    {p.href ? <Icon name="arrow-up-right" /> : null}
                  </span>
                </>
              );
              return (
                <li key={p.title}>
                  {p.href ? (
                    <a className="press__row" href={p.href} target="_blank" rel="noopener">
                      {inner}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className="press__row">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--paper" href="/food-menu/">
              See the menu <Icon name="arrow" className="arrow" />
            </Link>
            <Link className="btn btn--ghost-light" href="/jobs/">
              Join Team Grind
            </Link>
          </div>
        </div>
      </section>
      <JsonLd data={aboutLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'About Us', path: '/about-us/' }])} />
    </>
  );
}
