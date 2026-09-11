import type { PartDividerData } from '../../types';

interface Props { data: PartDividerData; onChange: (d: PartDividerData) => void; }

const SUGGESTIONS = [
  'الجزء الأول', 'الجزء الثاني', 'الجزء الثالث',
  'التمرين الأول', 'التمرين الثاني', 'التمرين الثالث',
  'الوضعية الإدماجية', 'السؤال الأول'
];

export function PartDividerForm({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">عنوان الفاصل</label>
        <input type="text" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 font-bold focus:outline-none focus:border-emerald-500"
          placeholder="الجزء الأول" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">اقتراحات سريعة:</label>
        <div className="flex flex-wrap gap-1">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => onChange({ ...data, title: s })}
              className="text-xs bg-gray-100 hover:bg-emerald-100 px-2 py-1 rounded transition">{s}</button>
          ))}
        </div>
      </div>
      <div className="part-divider">{data.title || 'معاينة'}</div>
    </div>
  );
}