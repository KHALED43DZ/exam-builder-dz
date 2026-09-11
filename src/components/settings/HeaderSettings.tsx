import { useExamStore } from '../../store/examStore';
import { Settings, Image } from 'lucide-react';
import { useState, useRef } from 'react';

export function HeaderSettings() {
  const exam = useExamStore((s) => s.currentExam);
  const { updateHeader, updateStyles } = useExamStore();
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!exam) return null;
  const { header, styles } = exam;

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateHeader({ logoUrl: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-3 hover:bg-gray-50">
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-emerald-600" />
          <span className="font-bold text-gray-700">إعدادات الترويسة والتنسيق</span>
        </div>
        <span className="text-gray-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="p-3 border-t space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-emerald-700">📋 بيانات الترويسة</h3>
            <input type="text" value={header.ministry} onChange={(e) => updateHeader({ ministry: e.target.value })} placeholder="الوزارة" className="w-full border rounded px-2 py-1 text-sm" />
            <input type="text" value={header.direction} onChange={(e) => updateHeader({ direction: e.target.value })} placeholder="مديرية التربية" className="w-full border rounded px-2 py-1 text-sm" />
            <input type="text" value={header.school} onChange={(e) => updateHeader({ school: e.target.value })} placeholder="المؤسسة التعليمية" className="w-full border rounded px-2 py-1 text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={header.level} onChange={(e) => updateHeader({ level: e.target.value })} placeholder="المستوى" className="border rounded px-2 py-1 text-sm" />
              <input type="text" value={header.subject} onChange={(e) => updateHeader({ subject: e.target.value })} placeholder="المادة" className="border rounded px-2 py-1 text-sm" />
              <input type="text" value={header.term} onChange={(e) => updateHeader({ term: e.target.value })} placeholder="الفصل" className="border rounded px-2 py-1 text-sm" />
              <input type="text" value={header.duration} onChange={(e) => updateHeader({ duration: e.target.value })} placeholder="المدة" className="border rounded px-2 py-1 text-sm" />
            </div>
            <input type="text" value={header.date} onChange={(e) => updateHeader({ date: e.target.value })} placeholder="التاريخ" className="w-full border rounded px-2 py-1 text-sm" />
            <input type="text" value={header.footerWish} onChange={(e) => updateHeader({ footerWish: e.target.value })} placeholder="عبارة التمني" className="w-full border rounded px-2 py-1 text-sm" />

            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm">
                <Image size={14} /> رفع الشعار
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleLogo} className="hidden" />
              {header.logoUrl && <button onClick={() => updateHeader({ logoUrl: undefined })} className="text-xs text-red-500">حذف</button>}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t">
            <h3 className="font-semibold text-sm text-emerald-700">🎨 التنسيق العام</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600">حجم خط الأسئلة: {styles.questionSize}px</label>
                <input type="range" min="10" max="20" value={styles.questionSize} onChange={(e) => updateStyles({ questionSize: parseInt(e.target.value) })} className="w-full" />
              </div>
              <div>
                <label className="text-xs text-gray-600">تباعد الأسطر: {styles.lineHeight}</label>
                <input type="range" min="1" max="2.5" step="0.1" value={styles.lineHeight} onChange={(e) => updateStyles({ lineHeight: parseFloat(e.target.value) })} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}