import { RichEditor } from '../editor/RichEditor';
import { SpeechButton } from '../ui/SpeechButton';
import type { FreeTextData } from '../../types';

interface Props { data: FreeTextData; onChange: (d: FreeTextData) => void; }

export function FreeTextForm({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">نص السؤال</label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="اكتب نص السؤال..." />
          </div>
          <SpeechButton onResult={(t) => onChange({ ...data, text: `<p>${t}</p>` })} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">عدد أسطر الإجابة: {data.lines}</label>
        <input type="range" min="1" max="15" value={data.lines}
          onChange={(e) => onChange({ ...data, lines: parseInt(e.target.value) })} className="w-full" />
      </div>
    </div>
  );
}