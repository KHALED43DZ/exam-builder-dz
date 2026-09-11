export interface SymbolItem { label: string; value: string; category: string; }

export const SYMBOLS: SymbolItem[] = [
  { label: '→', value: '→', category: 'math' },
  { label: '←', value: '←', category: 'math' },
  { label: '⇌', value: '⇌', category: 'math' },
  { label: '°', value: '°', category: 'math' },
  { label: '∞', value: '∞', category: 'math' },
  { label: '√', value: '√', category: 'math' },
  { label: 'π', value: 'π', category: 'math' },
  { label: 'Δ', value: 'Δ', category: 'math' },
  { label: '∑', value: '∑', category: 'math' },
  { label: '±', value: '±', category: 'math' },
  { label: '≠', value: '≠', category: 'math' },
  { label: '≤', value: '≤', category: 'math' },
  { label: '≥', value: '≥', category: 'math' },
  { label: '∈', value: '∈', category: 'math' },
  { label: '×', value: '×', category: 'math' },
  { label: '÷', value: '÷', category: 'math' },
  { label: '²', value: '²', category: 'math' },
  { label: '³', value: '³', category: 'math' },
  { label: 'α', value: 'α', category: 'math' },
  { label: 'β', value: 'β', category: 'math' },
  { label: 'H₂O', value: 'H₂O', category: 'chem' },
  { label: 'CO₂', value: 'CO₂', category: 'chem' },
  { label: 'O₂', value: 'O₂', category: 'chem' },
  { label: 'Na⁺', value: 'Na⁺', category: 'chem' },
  { label: 'Cl⁻', value: 'Cl⁻', category: 'chem' },
  { label: '﴿', value: '﴿', category: 'quran' },
  { label: '﴾', value: '﴾', category: 'quran' },
  { label: '۝', value: '۝', category: 'quran' },
  { label: 'ﷻ', value: 'ﷻ', category: 'quran' },
  { label: 'ﷺ', value: 'ﷺ', category: 'quran' },
  { label: '✓', value: '✓', category: 'general' },
  { label: '✗', value: '✗', category: 'general' },
  { label: '★', value: '★', category: 'general' },
  { label: '•', value: '•', category: 'general' }
];

export const SYMBOL_CATEGORIES = [
  { id: 'math', label: 'رياضيات', color: 'bg-blue-500' },
  { id: 'chem', label: 'كيمياء', color: 'bg-purple-500' },
  { id: 'quran', label: 'قرآنية', color: 'bg-emerald-600' },
  { id: 'general', label: 'عامة', color: 'bg-gray-500' }
];