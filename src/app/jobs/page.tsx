import { PageHero } from '@/components/PageHero';
import { JobsForm } from '@/components/inner/JobsForm';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/data/site';
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Join Team Grind — Restaurant Jobs in NuLu, Louisville',
  description:
    'Front and back of house jobs at Grind in NuLu: competitive pay, health/dental/vision, meal discounts, 401k match after a year and promotion from within.',
  path: '/jobs/',
});

const perks = ['Competitive pay', 'Health, dental & vision insurance', 'Meal discounts', '401k match after one year', 'Promotion from within', 'Full & part time'];

export default function JobsPage() {
  return (
    <>
      <PageHero
        crumb="Jobs"
        eyebrow="Join Team Grind"
        title={
          <>
            Work with the <span className="text-red">hardest-hustling</span> crew in town.
          </>
        }
        lede="We’re always looking for great people to join our team in the front and back of house. Full-time and part-time positions may be available at our NuLu location."
      />
      <section className="section grain" style={{ paddingTop: 0 }}>
        <div className="wrap jobs-grid" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <div className="prose stack">
              <p style={{ fontSize: 'var(--t-lg)' }}>
                Long-time kitchen experience? New to the game and excited to learn? <span className="voice" style={{ fontSize: '1.2em' }}>We’re interested in you.</span>
              </p>
              <p>
                You must be extremely focused on cleanliness, details and the customer experience. In return: a chance to work with one of the hardest
                hustling, friendliest staffs in the city — paid a fair wage.
              </p>
            </div>
            <ul className="perks">
              {perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p style={{ marginTop: '2rem', fontSize: 'var(--t-sm)' }}>
              Prefer email? Send your resume or work history to{' '}
              <a className="link" href={`mailto:${site.jobsEmail}?subject=${encodeURIComponent('I want to join Team Grind!')}`}>
                {site.jobsEmail}
              </a>
              .
            </p>
          </div>
          <div className="card">
            <h2 id="apply-h" className="display h-2xl" style={{ marginBottom: '1.5rem' }}>
              Apply
            </h2>
            <JobsForm to={site.jobsEmail} />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Join Team Grind', path: '/jobs/' }])} />
    </>
  );
}
