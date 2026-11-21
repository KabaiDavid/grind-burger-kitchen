import { hours } from '@/data/site';

const TZ = 'America/New_York';

/** Current weekday + minutes in Louisville, regardless of the visitor's zone. */
export function louisvilleNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dow, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const hh = h % 12 || 12;
  return `${hh}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`;
};

export type OpenState = { open: boolean; text: string; dow: number };

export function openState(date = new Date()): OpenState {
  const { dow, minutes } = louisvilleNow(date);
  const today = hours.find((h) => h.dow === dow)!;
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      return { open: true, dow, text: c - minutes <= 45 ? `Open — closing soon (${fmt(today.close)})` : `Open now · until ${fmt(today.close)}` };
    }
    if (minutes < o) return { open: false, dow, text: `Closed · opens today at ${fmt(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours.find((h) => h.dow === (dow + i) % 7)!;
    if (next.open) {
      return { open: false, dow, text: `Closed · opens ${i === 1 ? 'tomorrow' : next.day} at ${fmt(next.open)}` };
    }
  }
  return { open: false, dow, text: 'Closed' };
}
