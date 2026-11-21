'use client';

import { useEffect, useState } from 'react';
import { openState, type OpenState } from '@/lib/hours';

/** Live open/closed status in Louisville time. Renders nothing until hydrated (no wrong SSR guess). */
export function OpenStatus({ className = '' }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className={`status ${className}`} data-open={state?.open ?? false} aria-live="polite">
      {state ? (
        <>
          <span className="pulse" aria-hidden="true" />
          <span>{state.text}</span>
        </>
      ) : (
        <span aria-hidden="true">&nbsp;</span>
      )}
    </p>
  );
}
