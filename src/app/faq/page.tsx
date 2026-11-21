import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { faqs, type Faq } from '@/data/faq';
import { site } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'FAQ — Gluten Free, Vegan, Reservations & More',
  description:
    'Gluten-free and vegan options, reservations, parking, online orders, gift cards, the food truck, catering and buyouts at Grind Burger Kitchen.',
  path: '/faq/',
});

const groups: Faq['group'][] = ['Food', 'Visiting', 'Ordering', 'Events'];

export default function FaqPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <PageHero crumb="FAQ" eyebrow="Good questions" title={<>Asked & <span className="text-red">answered.</span></>} lede="Can’t find it here? Email us — it’s the fastest way to reach the team." />
      <section className="section grain" style={{ paddingTop: 0 }}>
        <div className="wrap split" style={{ position: 'relative', zIndex: 2 }}>
          <div className="span-8">
            {groups.map((g) => (
              <div key={g} className="faq-group">
                <h2 className="label">{g}</h2>
                {faqs
                  .filter((f) => f.group === g)
                  .map((f, i) => (
                    <details key={f.q} className="faq-item" open={g === 'Food' && i === 0}>
                      <summary>
                        {f.q}
                        <Icon name="plus" />
                      </summary>
                      <p className="answer">{f.a}</p>
                    </details>
                  ))}
              </div>
            ))}
          </div>
          <aside className="span-4">
            <div className="card" style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <p className="label">Still hungry for answers?</p>
              <p className="display h-2xl" style={{ margin: '0.75rem 0 1rem' }}>
                Email us.
              </p>
              <a className="link" href={`mailto:${site.email}`} style={{ wordBreak: 'break-word' }}>
                {site.email}
              </a>
              <div className="btn-row" style={{ marginTop: '1.5rem' }}>
                <Link className="btn btn--ghost btn--sm" href="/contact/">
                  Visit & contact <Icon name="arrow" className="arrow" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'FAQ', path: '/faq/' }])} />
    </>
  );
}
