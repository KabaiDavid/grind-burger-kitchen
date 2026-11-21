'use client';

import { useRef, useState } from 'react';
import { Icon } from '../Icon';

type Errors = Partial<Record<'name' | 'email' | 'position' | 'resume', string>>;

/**
 * The original Wix form posted to Wix's backend, which doesn't move with the site.
 * This version composes the application as an email to the hiring inbox (no backend, nothing lost),
 * with a copy-to-clipboard fallback. Swap `onSubmit` for a form endpoint when the client picks one.
 */
export function JobsForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<null | { href: string; text: string }>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? '').trim();
    const errs: Errors = {};
    if (!v('name')) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errs.email = 'Please enter a valid email address.';
    if (!v('position')) errs.position = 'Please choose a position.';
    if (v('resume').length < 20) errs.resume = 'Please paste your resume or work history.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = `Name: ${v('name')}\nEmail: ${v('email')}\nPhone: ${v('phone') || '—'}\nPosition: ${v('position')}\n\nResume / work history:\n${v('resume')}`;
    const href = `mailto:${to}?subject=${encodeURIComponent(`I want to join Team Grind! — ${v('position')} — ${v('name')}`)}&body=${encodeURIComponent(text)}`;
    setDone({ href, text });
    window.location.href = href;
  }

  if (done) {
    return (
      <div className="card" role="status" aria-live="polite">
        <p className="label text-red">Almost there</p>
        <p className="display h-2xl" style={{ margin: '0.75rem 0 1rem' }}>
          Hit send in your email app.
        </p>
        <p>
          We opened a new email to <strong>{to}</strong> with your application filled in. If nothing opened, use the buttons below.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <a className="btn btn--red" href={done.href}>
            <Icon name="mail" className="arrow" /> Open email again
          </a>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`To: ${to}\n\n${done.text}`);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? 'Copied ✓' : 'Copy application text'}
          </button>
          <button className="btn btn--ghost" type="button" onClick={() => setDone(null)}>
            Edit
          </button>
        </div>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    name,
    id: `f-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p className="err" id={`e-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="apply-h">
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">Name *</label>
          <input {...field('name')} type="text" autoComplete="name" required />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="f-email">Email *</label>
          <input {...field('email')} type="email" autoComplete="email" required />
          {err('email')}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-position">Position *</label>
          <select {...field('position')} required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Front of house</option>
            <option>Back of house</option>
            <option>Either — I’m flexible</option>
          </select>
          {err('position')}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone (optional)</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-resume">Copy & paste resume *</label>
        <textarea {...field('resume')} required />
        {err('resume')}
        <p className="hint">Your application opens as an email to our hiring inbox — nothing is stored on this website.</p>
      </div>
      <div>
        <button className="btn btn--red" type="submit">
          Send application <Icon name="arrow" className="arrow" />
        </button>
      </div>
    </form>
  );
}
