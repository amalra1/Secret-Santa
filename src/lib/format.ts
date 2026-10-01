import type { Language } from '@/types/language';

const INDEX_PAD = 2;

export function fill(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function padIndex(index: number) {
  return String(index).padStart(INDEX_PAD, '0');
}

export function formatEventDate(date: string, language: Language) {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return date;
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}
