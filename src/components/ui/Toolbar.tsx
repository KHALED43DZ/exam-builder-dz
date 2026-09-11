import { useExamStore } from '../../store/examStore';
import { db } from '../../lib/db';
import { FileText, Save, FolderOpen, LayoutTemplate, Library, Eye, EyeOff, Printer, Download, Plus } from 'lucide-react';
import { exportToPDF, printExam } from '../../lib/pdf';

export function Toolbar() {
  const { currentExam, setCurrentExam, newExam, previewMode, togglePreview, toggleTemplateManager, toggleQuestionBank } = useExamStore();

  const handleSave = async () => {
    if (!currentExam) return;
    const title = prompt('اسم الاختبار:', currentExam.title) || currentExam.title;
    const toSave = { ...currentExam, title, updatedAt: new Date() };
    if (currentExam.id) {
      await db.exams.update(currentExam.id, toSave);
    } else {
      const id = await db.exams.add(toSave);
      setCurrentExam({ ...toSave, id: id as number });
    }
    alert('✓ تم الحفظ بنجاح');
  };

  const handleLoad = async () => {
    const all = await db.exams.orderBy('updatedAt').reverse().toArray();
    if (all.length === 0) { alert('لا توجد اختبارات محفوظة'); return; }
    const list = all.map((e, i) => `${i + 1}. ${e.title} (${e.subject || 'بدون مادة'})`).join('\n');
    const choice = prompt('اختر رقم الاختبار:\n' + list);
    if (!choice) return;
    const idx = parseInt(choice) - 1;
    if (all[idx]) setCurrentExam(all[idx]);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-lg no-print sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText size={24} />
          <h1 className="text-lg font-bold hidden sm:block">منشئ الاختبارات</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={newExam} className="p-2 hover:bg-emerald-700 rounded" title="جديد"><Plus size={20} /></button>
          <button onClick={handleSave} className="p-2 hover:bg-emerald-700 rounded" title="حفظ"><Save size={20} /></button>
          <button onClick={handleLoad} className="p-2 hover:bg-emerald-700 rounded" title="فتح"><FolderOpen size={20} /></button>
          <button onClick={toggleTemplateManager} className="p-2 hover:bg-emerald-700 rounded hidden sm:block" title="القوالب"><LayoutTemplate size={20} /></button>
          <button onClick={toggleQuestionBank} className="p-2 hover:bg-emerald-700 rounded hidden sm:block" title="بنك الأسئلة"><Library size={20} /></button>
          <button onClick={togglePreview} className="p-2 hover:bg-emerald-700 rounded sm:hidden" title="معاينة">
            {previewMode ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <button onClick={() => exportToPDF()} className="p-2 hover:bg-emerald-700 rounded hidden sm:block" title="PDF"><Download size={20} /></button>
          <button onClick={printExam} className="p-2 hover:bg-emerald-700 rounded hidden sm:block" title="طباعة"><Printer size={20} /></button>
        </div>
      </div>
      {currentExam && (
        <div className="bg-emerald-700 px-4 py-1 text-sm flex items-center gap-3 overflow-x-auto">
          <span className="font-bold">📄 {currentExam.title || 'بدون عنوان'}</span>
          <span>•</span>
          <span>{currentExam.subject || 'المادة...'}</span>
          <span>•</span>
          <span>{currentExam.questions.length} سؤال</span>
        </div>
      )}
    </header>
  );
}