'use client';

import { useEffect, useState } from 'react';
import { hours, holidayNote } from '@/data/site';
import { louisvilleNow } from '@/lib/hours';

export function HoursTable({ caption = 'Opening hours' }: { caption?: string }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(louisvilleNow().dow), []);
  const ordered = [...hours.slice(1), hours[0]].filter((h) => h.open); // Tue → Sun
  return (
    <div>
      <table className="hours">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {ordered.map((h) => (
            <tr key={h.day} data-today={today === h.dow}>
              <th scope="row">{h.day}</th>
              <td>{h.label}</td>
            </tr>
          ))}
          <tr data-today={today === 1}>
            <th scope="row">Monday</th>
            <td>Closed</td>
          </tr>
        </tbody>
      </table>
      <p className="muted" style={{ fontSize: 'var(--t-sm)', marginTop: '0.9rem' }}>
        {holidayNote}
      </p>
    </div>
  );
}
