import { RichEditor } from '../editor/RichEditor';
import { SpeechButton } from '../ui/SpeechButton';
import { BookOpen } from 'lucide-react';
import type { QuranData } from '../../types';

interface Props { data: QuranData; onChange: (d: QuranData) => void; }

export function QuranForm({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">سؤال/تعليمات التلميذ</label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="اشرح من قائل هذه الآيات؟" />
          </div>
          <SpeechButton onResult={(t) => onChange({ ...data, text: `<p>${t}</p>` })} />
        </div>
      </div>
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
        <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-emerald-700">
          <BookOpen size={16} /> النص القرآني (رواية ورش)
        </label>
        <textarea value={data.verse} onChange={(e) => onChange({ ...data, verse: e.target.value })} rows={4}
          placeholder="أدخل النص القرآني هنا..."
          className="w-full border border-emerald-300 rounded px-3 py-2 text-lg text-emerald-900 focus:outline-none focus:border-emerald-500 resize-none" dir="rtl" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">اسم السورة</label>
          <input type="text" value={data.surah} onChange={(e) => onChange({ ...data, surah: e.target.value })}
            placeholder="مثال: البقرة"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">رقم الآية</label>
          <input type="text" value={data.ayahNumber} onChange={(e) => onChange({ ...data, ayahNumber: e.target.value })}
            placeholder="مثال: 255"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500" />
        </div>
      </div>
    </div>
  );
}