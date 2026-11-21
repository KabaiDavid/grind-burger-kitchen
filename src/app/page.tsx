import Link from 'next/link';
import { HomeHero } from '@/components/home/HomeHero';
import { Lineup, type LineupItem } from '@/components/home/Lineup';
import { Picture } from '@/components/Picture';
import { Icon } from '@/components/Icon';
import { Marquee } from '@/components/Marquee';
import { HoursTable } from '@/components/HoursTable';
import { MapEmbed } from '@/components/MapEmbed';
import { site, visitNotes } from '@/data/site';
import { menu, doneness } from '@/data/menu';
import { press, timeline } from '@/data/story';
import { cocktails, draftCount } from '@/data/beer';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Grind Burger Kitchen — Chef-Driven Burgers in NuLu, Louisville KY',
  description:
    'Grass-fed beef trimmed and ground fresh daily, cooked to order in Louisville’s NuLu. As seen on Diners, Drive-Ins and Dives. Order pickup or book a table.',
  path: '/',
});

const price = (name: string) => menu[0].items.find((i) => i.name === name)?.price ?? '';
const desc = (name: string) => menu[0].items.find((i) => i.name === name)?.description ?? '';

const lineup: LineupItem[] = [
  {
    name: 'Southern',
    price: price('Southern'),
    description: desc('Southern'),
    tagline: 'Pimento cheese, crisp bacon and spicy house-made dill pickles. This thing can’t be stopped.',
    layers: ['Burger', 'Sharp cheddar pimento cheese', 'Bacon', 'Spicy dill pickles'],
    photo: { name: 'southern-burger', alt: 'The Southern burger with melted pimento cheese and bacon beside house-cut fries' },
  },
  {
    name: 'Chain',
    price: price('Chain'),
    description: desc('Chain'),
    tagline: 'All your favorite things you grew up loving at those chain restaurants — without all the things you don’t like as an adult.',
    layers: ['Diner-style burger', 'American cheese', 'Spicy dill pickles', 'Smoked ketchup', 'Yellow mustard', 'Red onion'],
    photo: { name: 'chain-burger', alt: 'The Chain: two thin diner-style patties with melted American cheese and pickles on a soft bun' },
  },
  {
    name: 'B&B',
    price: price('B&B'),
    description: 'Burger, brie cheese, bacon, smoked habanero jam. No substitutions on this one.',
    tagline: 'That means no lettuce or tomato either. Trust us. It’s awesome.',
    layers: ['Burger', 'Brie', 'Bacon', 'Smoked habanero jam'],
  },
  {
    name: 'Grind',
    price: price('Grind'),
    description: desc('Grind'),
    tagline: 'Our build-your-own option.',
    layers: ['Burger', 'Lettuce', 'Tomato', 'Red onion', 'Your cheese'],
  },
  {
    name: 'Shroom & Cheddar',
    price: price('Shroom & Cheddar'),
    description: desc('Shroom & Cheddar'),
    layers: ['Burger', 'Grilled portabella', 'Herby white cheddar', 'Arugula', 'Dijonnaise'],
  },
  {
    name: 'Veggie',
    price: price('Veggie'),
    description: desc('Veggie'),
    tagline: 'Featured on Food Network’s Diners, Drive-ins and Dives.',
    layers: ['Chickpeas', 'Lentils', 'Quinoa', 'Mushrooms', 'Roasted veggies'],
  },
];


export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ——— Manifesto ——— */}
      <section className="section manifesto grain" aria-labelledby="manifesto-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow" data-reveal>
            The mission
          </p>
          <h2 id="manifesto-title" className="sr-only">
            Our mission
          </h2>
          <blockquote style={{ marginTop: '2rem' }}>
            <p className="manifesto__quote" data-reveal style={{ ['--d' as string]: 1 }}>
              A superior, <span className="voice">chef-driven</span> burger. The best local & regional ingredients. Made and served by happy people{' '}
              <span className="voice">paid a fair wage.</span>
            </p>
            <footer className="manifesto__sign" data-reveal style={{ ['--d' as string]: 2 }}>
              <div className="avatar media">
                <Picture name="owners" alt="Owners Liz and Jesse Huot in front of the Grind grinder-plate mural" sizes="64px" />
              </div>
              <div>
                <p style={{ fontWeight: 750 }}>Liz & Jesse Huot</p>
                <p className="muted" style={{ fontSize: 'var(--t-sm)' }}>
                  Owner · Owner/Chef
                </p>
              </div>
              <Link className="text-link" href="/about-us/" style={{ marginLeft: 'auto' }}>
                Our story <Icon name="arrow" className="arrow" />
              </Link>
            </footer>
          </blockquote>

          <dl className="manifesto__facts" data-reveal>
            <div>
              <dt>Daily</dt>
              <dd>All beef trimmed and ground fresh, in-house</dd>
            </div>
            <div>
              <dt>2×</dt>
              <dd>LEO Weekly’s Best Burger in Louisville — 2017 & 2018</dd>
            </div>
            <div>
              <dt>75+</dt>
              <dd>Bourbons behind a full bar</dd>
            </div>
            <div>
              <dt>2012</dt>
              <dd>Started as Grind Gourmet Burger Truck</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ——— Lineup ——— */}
      <section className="section dark grain" aria-labelledby="lineup-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="lineup__head">
            <div>
              <p className="eyebrow" data-reveal>
                Signature burgers
              </p>
              <h2 id="lineup-title" className="display h-4xl" style={{ marginTop: '1rem' }} data-reveal>
                Six burgers.
                <br />
                <span className="text-red">One grind.</span>
              </h2>
            </div>
            <div data-reveal style={{ ['--d' as string]: 1 }}>
              <p className="lede">Every burger comes with your choice of side, cooked to order — and the Veggie patty is made in-house too.</p>
              <Link className="text-link" href="/food-menu/" style={{ marginTop: '1.5rem' }}>
                Full menu <Icon name="arrow" className="arrow" />
              </Link>
            </div>
          </div>

          <Lineup items={lineup} />

          <div className="doneness" data-reveal>
            <h3 className="eyebrow">How do you take it?</h3>
            <ul className="doneness__scale">
              {doneness.map((d) => (
                <li key={d.name}>
                  <span className="doneness__swatch" style={{ background: d.color }} aria-hidden="true" />
                  <p>
                    <strong>{d.name}</strong>
                    <span>{d.note}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Craft ——— */}
      <section className="section grain" aria-labelledby="craft-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 900, marginBottom: 'clamp(3rem, 2rem + 4vw, 7rem)' }}>
            <p className="eyebrow" data-reveal>
              The craft
            </p>
            <h2 id="craft-title" className="display h-4xl" style={{ marginTop: '1rem' }} data-reveal>
              Made here. <span className="text-red">By hand.</span>
            </h2>
          </div>

          <article className="craft__chapter">
            <figure className="craft__media media" data-reveal="mask">
              <Picture
                name="detail-pimento"
                alt="Overhead: a burger topped with melted pimento cheese next to its top bun with bacon and pickle chips, on a wooden board"
                sizes="(min-width: 900px) 58vw, 100vw"
              />
            </figure>
            <div className="craft__text" data-reveal>
              <p className="craft__num" aria-hidden="true">
                01
              </p>
              <h3 className="display h-2xl">Fresh ground</h3>
              <p>
                All of our beef is trimmed and ground fresh daily — a proprietary blend of grass-fed beef. Our burgers are gluten free, and every one is
                cooked to order, from a warm-red medium rare to two thin patties, diner style.
              </p>
            </div>
          </article>

          <article className="craft__chapter">
            <figure className="craft__media media" data-reveal="mask">
              <Picture
                name="detail-ramekins"
                alt="Ramekins of pimento cheese, ketchup and spicy dill pickles with hot sauce packets on a dark wood table"
                sizes="(min-width: 900px) 58vw, 100vw"
              />
            </figure>
            <div className="craft__text" data-reveal>
              <p className="craft__num" aria-hidden="true">
                02
              </p>
              <h3 className="display h-2xl">Hand crafted</h3>
              <p>The little things are made in our kitchen, too.</p>
              <ul className="craft__list">
                <li>
                  <span>Spicy dill pickles</span>
                  <span>house made</span>
                </li>
                <li>
                  <span>Grind smoked ketchup</span>
                  <span>our signature</span>
                </li>
                <li>
                  <span>Veggie patty</span>
                  <span>house made</span>
                </li>
                <li>
                  <span>Fries</span>
                  <span>house cut</span>
                </li>
              </ul>
            </div>
          </article>

          <article className="craft__chapter">
            <figure className="craft__media media" data-reveal="mask">
              <Picture
                name="detail-fries"
                alt="A white platter heaped with golden house-cut fries"
                sizes="(min-width: 900px) 58vw, 100vw"
              />
            </figure>
            <div className="craft__text" data-reveal>
              <p className="craft__num" aria-hidden="true">
                03
              </p>
              <h3 className="display h-2xl">Local hands</h3>
              <p>The best local and regional ingredients we can find — and the neighbors who make them.</p>
              <ul className="craft__list">
                <li>
                  <span>Brioche & desserts</span>
                  <span>Smør Nordic Bakery</span>
                </li>
                <li>
                  <span>Gluten-free buns</span>
                  <span>Annie May’s Sweet Cafe</span>
                </li>
                <li>
                  <span>Ham on the Cuban</span>
                  <span>Kentucky</span>
                </li>
                <li>
                  <span>On tap</span>
                  <span>Louisville & regional brewers</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <div className="red-bg" style={{ color: 'var(--paper)' }}>
        <Marquee items={['Fresh ground', 'Hand crafted', 'Grass fed']} />
      </div>

      {/* ——— Press ——— */}
      <section className="section red-bg grain" aria-labelledby="press-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow" data-reveal>
            Awards & press
          </p>
          <h2 id="press-title" className="display h-4xl" style={{ marginTop: '1rem', maxWidth: '13ch' }} data-reveal>
            Louisville voted. Twice.
          </h2>
          <div className="press__feature" data-reveal>
            <div>
              <p className="label">LEO Weekly · 2017 & 2018</p>
              <p className="press__big">Best Burger in Louisville</p>
              <p className="voice" style={{ fontSize: 'var(--t-xl)' }}>
                Back to back.
              </p>
            </div>
            <div>
              <p className="label">Food Network · December 2016</p>
              <p className="press__big">Diners, Drive-Ins and Dives</p>
              <p className="voice" style={{ fontSize: 'var(--t-xl)' }}>
                The Cuban and the Veggie made the show.
              </p>
            </div>
          </div>
          <ul className="press__list" data-reveal>
            {press.slice(2).map((p) => {
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
        </div>
      </section>

      {/* ——— Story ——— */}
      <section className="section grain paper-2" aria-labelledby="story-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split">
            <div className="span-7">
              <p className="eyebrow" data-reveal>
                Our story
              </p>
              <h2 id="story-title" className="display h-4xl" style={{ marginTop: '1rem' }} data-reveal>
                From a truck to <span className="text-red">NuLu.</span>
              </h2>
            </div>
            <div className="span-5" data-reveal style={{ alignSelf: 'end' }}>
              <p className="lede voice" style={{ fontSize: 'var(--t-xl)', lineHeight: 1.3 }}>
                “We went all in when we moved to a brick and mortar location in the popular NuLu neighborhood.”
              </p>
              <p className="muted" style={{ marginTop: '0.75rem', fontSize: 'var(--t-sm)' }}>
                — Liz Huot, owner
              </p>
            </div>
          </div>
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
          <div style={{ marginTop: '3rem' }}>
            <Link className="btn btn--ghost" href="/about-us/">
              Read the whole story <Icon name="arrow" className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Bar ——— */}
      <section className="section dark grain bar" aria-labelledby="bar-title">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split">
            <div className="span-6">
              <p className="eyebrow" data-reveal>
                The bar
              </p>
              <p className="bar__num" aria-hidden="true" data-reveal>
                75+
              </p>
              <h2 id="bar-title" className="display h-3xl" data-reveal>
                Bourbons. <span className="voice" style={{ textTransform: 'none' }}>It is Kentucky.</span>
              </h2>
              <p className="lede" style={{ marginTop: '1.5rem' }} data-reveal>
                A full bar, {draftCount} rotating drafts from Louisville and the region, cans and bottles, and house cocktails — one of them made with our own
                smoked ketchup.
              </p>
              <div className="btn-row" style={{ marginTop: '2rem' }} data-reveal>
                <Link className="btn btn--paper" href="/beer-menu/">
                  See what’s pouring <Icon name="arrow" className="arrow" />
                </Link>
              </div>
            </div>
            <div className="start-8" data-reveal>
              <h3 className="label" style={{ color: 'var(--cream-muted)' }}>
                House cocktails
              </h3>
              <ul className="bar__cocktails">
                {cocktails.slice(0, 5).map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span>{c.ingredients}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Visit ——— */}
      <section className="section grain" aria-labelledby="visit-title" id="visit">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="visit">
            <div>
              <p className="eyebrow" data-reveal>
                Come hungry
              </p>
              <h2 id="visit-title" className="display h-4xl" style={{ marginTop: '1rem' }} data-reveal>
                829 E. Market.
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }} data-reveal>
                In the heart of NuLu, Louisville. Walk in, book a table, or order ahead for pickup.
              </p>
              <div className="btn-row" style={{ marginTop: '2rem' }} data-reveal>
                <a className="btn btn--red" href={site.links.reserve} target="_blank" rel="noopener">
                  <Icon name="calendar" className="arrow" /> Reserve on OpenTable
                </a>
                <a className="btn btn--ghost" href={site.links.directions} target="_blank" rel="noopener">
                  <Icon name="pin" className="arrow" /> Directions
                </a>
              </div>
              <div style={{ marginTop: '2.5rem' }} data-reveal>
                <HoursTable />
              </div>
              <div className="visit__notes" data-reveal>
                <div>
                  <h3 className="label">Parking</h3>
                  <p>{visitNotes.parking}</p>
                </div>
                <div>
                  <h3 className="label">Patio</h3>
                  <p>{visitNotes.patio}</p>
                </div>
                <div>
                  <h3 className="label">Groups</h3>
                  <p>
                    Parties larger than 8, please{' '}
                    <a className="link" href={`mailto:${site.email}`}>
                      email us
                    </a>
                    . {visitNotes.gratuity}
                  </p>
                </div>
                <div>
                  <h3 className="label">Questions</h3>
                  <p>
                    Email is fastest:{' '}
                    <a className="link" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div data-reveal="fade">
              <MapEmbed height={560} />
              <p className="caption">{visitNotes.onlinePickup}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
