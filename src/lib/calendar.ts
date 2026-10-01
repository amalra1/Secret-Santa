const DAYS_IN_WEEK = 7;
const MS_PER_DAY = 86_400_000;

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getMonth() === month - 1 ? date : null;
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date, b: Date) {
  return toISODate(a) === toISODate(b);
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function daysBetween(from: Date, to: Date) {
  const utc = (date: Date) =>
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((utc(to) - utc(from)) / MS_PER_DAY);
}

export function monthGrid(month: Date) {
  const first = startOfMonth(month);
  const start = addDays(first, -first.getDay());
  const last = addMonths(first, 1);
  const days =
    Math.ceil(daysBetween(start, last) / DAYS_IN_WEEK) * DAYS_IN_WEEK;
  return Array.from({ length: days }, (_, index) => addDays(start, index));
}

export function daysUntil(value: string, today: Date) {
  const date = parseISODate(value);
  return date ? daysBetween(startOfDay(today), date) : null;
}
