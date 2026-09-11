import { X } from 'lucide-react';
import { useState } from 'react';
import { SYMBOLS, SYMBOL_CATEGORIES } from '../../lib/symbols';

interface Props { onInsert: (symbol: string) => void; onClose: () => void; }

export function SymbolsBar({ onInsert, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState('math');
  const filtered = SYMBOLS.filter(s => s.category === activeCategory);

  return (
    <div className="fixed bottom-24 left-6 right-6 md:right-auto md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 no-print animate-fadeInUp">
      <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-2xl">
        <h3 className="font-bold text-gray-700">🔣 شريط الرموز</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded"><X size={18} /></button>
      </div>
      <div className="flex gap-1 p-2 border-b overflow-x-auto">
        {SYMBOL_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`${activeCategory === cat.id ? cat.color + ' text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-sm whitespace-nowrap transition`}>
            {cat.label}
          </button>
        ))}
      </div>
      <div className="p-3 grid grid-cols-6 gap-2 max-h-[200px] overflow-y-auto">
        {filtered.map((s, i) => (
          <button key={i} onClick={() => onInsert(s.value)}
            className="symbol-btn text-lg hover:scale-110 transition" title={s.value}>{s.label}</button>
        ))}
      </div>
    </div>
  );
}