import { useExamStore } from '../../store/examStore';
import { FreeTextForm } from '../questions/FreeTextForm';
import { GuidedAnswerForm } from '../questions/GuidedAnswerForm';
import { MatchingForm } from '../questions/MatchingForm';
import { TableForm } from '../questions/TableForm';
import { QuranForm } from '../questions/QuranForm';
import { HadithForm } from '../questions/HadithForm';
import { PartDividerForm } from '../questions/PartDividerForm';
import { Trash2, Copy, GripVertical, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { db } from '../../lib/db';
import type { QuestionType } from '../../types';

const TYPE_LABELS: Record<QuestionType, string> = {
  'free-text': '📝 سؤال حر', 'guided-answer': '📋 إجابات مرقمة',
  'matching': '🔗 ربط بالأسهم', 'table': '📊 جدول',
  'quran': '📖 آية قرآنية', 'hadith': '🕌 حديث نبوي',
  'part-divider': '➖ فاصل جزء'
};

export function QuestionsList() {
  const exam = useExamStore((s) => s.currentExam);
  const selectedId = useExamStore((s) => s.selectedQuestionId);
  const { updateQuestion, removeQuestion, duplicateQuestion, selectQuestion } = useExamStore();

  if (!exam) return <div className="text-center p-8 text-gray-500">ابدأ بإنشاء اختبار جديد</div>;
  if (exam.questions.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p className="mb-2">لا توجد أسئلة بعد</p>
        <p className="text-sm">اضغط على زر + لإضافة سؤال</p>
      </div>
    );
  }

  const saveToBank = async (q: any) => {
    const title = prompt('اسم السؤال في البنك:', TYPE_LABELS[q.type]) || TYPE_LABELS[q.type];
    await db.questionBank.add({
      title, category: exam.subject || 'عام', type: q.type, data: q.data, tags: [], createdAt: new Date()
    });
    alert('✓ تم الحفظ في بنك الأسئلة');
  };

  const renderForm = (q: any) => {
    const onChange = (data: any) => updateQuestion(q.id, data);
    switch (q.type) {
      case 'free-text': return <FreeTextForm data={q.data} onChange={onChange} />;
      case 'guided-answer': return <GuidedAnswerForm data={q.data} onChange={onChange} />;
      case 'matching': return <MatchingForm data={q.data} onChange={onChange} />;
      case 'table': return <TableForm data={q.data} onChange={onChange} />;
      case 'quran': return <QuranForm data={q.data} onChange={onChange} />;
      case 'hadith': return <HadithForm data={q.data} onChange={onChange} />;
      case 'part-divider': return <PartDividerForm data={q.data} onChange={onChange} />;
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-gray-700 text-lg mb-2">📝 الأسئلة ({exam.questions.length})</h2>
      {exam.questions.map((q, idx) => (
        <div key={q.id} className={`bg-white rounded-lg shadow-sm border-2 transition ${selectedId === q.id ? 'border-emerald-500' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50" onClick={() => selectQuestion(selectedId === q.id ? null : q.id)}>
            <GripVertical size={16} className="text-gray-400" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">سؤال {idx + 1}</div>
              <div className="font-semibold text-sm">{TYPE_LABELS[q.type]}</div>
            </div>
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); saveToBank(q); }} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="حفظ في البنك"><Bookmark size={16} /></button>
              <button onClick={(e) => { e.stopPropagation(); duplicateQuestion(q.id); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="نسخ"><Copy size={16} /></button>
              <button onClick={(e) => { e.stopPropagation(); removeQuestion(q.id); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="حذف"><Trash2 size={16} /></button>
              {selectedId === q.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
          {selectedId === q.id && <div className="p-3 border-t bg-gray-50 animate-fadeInUp">{renderForm(q)}</div>}
        </div>
      ))}
    </div>
  );
}