import { RichEditor } from '../editor/RichEditor';
import { Plus, Trash2 } from 'lucide-react';
import type { MatchingData } from '../../types';

interface Props { data: MatchingData; onChange: (d: MatchingData) => void; }

export function MatchingForm({ data, onChange }: Props) {
  const updateList = (key: 'listA' | 'listB', i: number, val: string) => {
    const list = [...data[key]]; list[i] = val;
    onChange({ ...data, [key]: list });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">تعليمات السؤال</label>
        <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="صل بين العناصر..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-600">القائمة أ</label>
          <div className="space-y-2">
            {data.listA.map((item, i) => (
              <div key={i} className="flex gap-1">
                <input type="text" value={item} onChange={(e) => updateList('listA', i, e.target.value)}
                  placeholder={`عنصر ${i + 1}`}
                  className="flex-1 border border-blue-200 rounded px-2 py-1 text-sm focus:border-blue-500 focus:outline-none" />
                <button onClick={() => onChange({ ...data, listA: data.listA.filter((_, idx) => idx !== i) })}
                  className="p-1 text-red-500"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <button onClick={() => onChange({ ...data, listA: [...data.listA, ''] })}
            className="mt-2 text-xs text-blue-600 flex items-center gap-1"><Plus size={14} /> إضافة</button>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-purple-600">القائمة ب</label>
          <div className="space-y-2">
            {data.listB.map((item, i) => (
              <div key={i} className="flex gap-1">
                <input type="text" value={item} onChange={(e) => updateList('listB', i, e.target.value)}
                  placeholder={`عنصر ${i + 1}`}
                  className="flex-1 border border-purple-200 rounded px-2 py-1 text-sm focus:border-purple-500 focus:outline-none" />
                <button onClick={() => onChange({ ...data, listB: data.listB.filter((_, idx) => idx !== i) })}
                  className="p-1 text-red-500"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <button onClick={() => onChange({ ...data, listB: [...data.listB, ''] })}
            className="mt-2 text-xs text-purple-600 flex items-center gap-1"><Plus size={14} /> إضافة</button>
        </div>
      </div>
    </div>
  );
}