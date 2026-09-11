import { RichEditor } from '../editor/RichEditor';
import { SpeechButton } from '../ui/SpeechButton';
import { Plus, Trash2 } from 'lucide-react';
import type { GuidedAnswerData } from '../../types';

interface Props { data: GuidedAnswerData; onChange: (d: GuidedAnswerData) => void; }

export function GuidedAnswerForm({ data, onChange }: Props) {
  const updateOption = (i: number, val: string) => {
    const opts = [...data.options]; opts[i] = val;
    onChange({ ...data, options: opts });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">نص السؤال</label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="أكمل الجمل التالية..." />
          </div>
          <SpeechButton onResult={(t) => onChange({ ...data, text: `<p>${t}</p>` })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">الخيارات / الأسطر</label>
        <div className="space-y-2">
          {data.options.map((opt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="font-bold text-emerald-600 min-w-[2rem]">{i + 1}-</span>
              <input type="text" value={opt} onChange={(e) => updateOption(i, e.target.value)}
                placeholder="نص الجملة..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500" />
              <button onClick={() => onChange({ ...data, options: data.options.filter((_, idx) => idx !== i) })}
                className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <button onClick={() => onChange({ ...data, options: [...data.options, ''] })}
          className="mt-2 flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700">
          <Plus size={16} /> إضافة سطر
        </button>
      </div>
    </div>
  );
}