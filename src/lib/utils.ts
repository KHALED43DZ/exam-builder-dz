export const ARABIC_ORDINALS = [
  'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس',
  'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'
];

export function toArabicOrdinal(n: number): string {
  return ARABIC_ORDINALS[n - 1] || String(n);
}

export function generateId(): string {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}