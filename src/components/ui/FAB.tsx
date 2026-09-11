import { useState } from 'react';
import { Plus, Type, List, Link2, Table, BookOpen, Quote, Minus, X } from 'lucide-react';
import { useExamStore } from '../../store/examStore';
import type { QuestionType } from '../../types';

const QUESTION_TYPES: { type: QuestionType; label: string; icon: any; color: string; desc: string }[] = [
  { type: 'free-text',     label: 'سؤال حر',        icon: Type,     color: 'bg-blue-500',    desc: 'نص + أسطر إجابة' },
  { type: 'guided-answer', label: 'إجابات مرقمة',   icon: List,     color: 'bg-indigo-500',  desc: 'خيارات أو أسطر منقطة' },
  { type: 'matching',      label: 'ربط بالأسهم',    icon: Link2,    color: 'bg-purple-500',  desc: 'عمودان للربط' },
  { type: 'table',         label: 'جدول',           icon: Table,    color: 'bg-pink-500',    desc: 'جدول ديناميكي' },
  { type: 'quran',         label: 'آية قرآنية',     icon: BookOpen, color: 'bg-emerald-600', desc: 'نص قرآني مزخرف' },
  { type: 'hadith',        label: 'حديث نبوي',      icon: Quote,    color: 'bg-amber-600',   desc: 'حديث مع التوثيق' },
  { type: 'part-divider',  label: 'فاصل جزء',       icon: Minus,    color: 'bg-gray-600',    desc: 'عنوان جزء أو تمرين' }
];

export function FAB() {
  const [open, setOpen] = useState(false);
  const addQuestion = useExamStore((s) => s.addQuestion);
  const exam = useExamStore((s) => s.currentExam);

  if (!exam) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 no-print">
      {open && (
        <div className="absolute bottom-20 left-0 bg-white rounded-2xl shadow-2xl p-3 min-w-[260px] animate-fadeInUp border border-gray-200">
          <div className="flex justify-between items-center mb-2 pb-2 border-b">
            <h3 className="font-bold text-gray-700">اختر نوع السؤال</h3>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto">
            {QUESTION_TYPES.map((qt) => (
              <button key={qt.type} onClick={() => { addQuestion(qt.type); setOpen(false); }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-right transition">
                <div className={`${qt.color} text-white p-2 rounded-lg`}><qt.icon size={20} /></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{qt.label}</div>
                  <div className="text-xs text-gray-500">{qt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className={`${open ? 'bg-red-500 rotate-45' : 'bg-emerald-600'} text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center`}>
        <Plus size={28} />
      </button>
    </div>
  );
}