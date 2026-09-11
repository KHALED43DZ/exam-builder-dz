import { RichEditor } from '../editor/RichEditor';
import { SpeechButton } from '../ui/SpeechButton';
import { Quote } from 'lucide-react';
import type { HadithData } from '../../types';

interface Props { data: HadithData; onChange: (d: HadithData) => void; }

export function HadithForm({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">سؤال/تعليمات</label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="استخرج من الحديث..." />
          </div>
          <SpeechButton onResult={(t) => onChange({ ...data, text: `<p>${t}</p>` })} />
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-amber-700"><Quote size={16} /> بيانات الحديث</label>
        <div>
          <label className="text-xs text-gray-600">الراوي (العنعنة)</label>
          <input type="text" value={data.narrator} onChange={(e) => onChange({ ...data, narrator: e.target.value })}
            placeholder="عن أبي هريرة رضي الله عنه قال:"
            className="w-full border border-amber-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="text-xs text-gray-600">نص الحديث</label>
          <textarea value={data.hadithText} onChange={(e) => onChange({ ...data, hadithText: e.target.value })} rows={3}
            placeholder="إنما الأعمال بالنيات..."
            className="w-full border border-amber-300 rounded px-3 py-2 mt-1 text-base focus:outline-none focus:border-amber-500 resize-none" />
        </div>
        <div>
          <label className="text-xs text-gray-600">المصدر / التوثيق</label>
          <input type="text" value={data.source} onChange={(e) => onChange({ ...data, source: e.target.value })}
            placeholder="رواه البخاري"
            className="w-full border border-amber-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-amber-500" />
        </div>
      </div>
    </div>
  );
}