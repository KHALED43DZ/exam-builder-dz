import { useState, useEffect } from 'react';
import { X, Save, Trash2, Download } from 'lucide-react';
import { useExamStore } from '../../store/examStore';
import { db } from '../../lib/db';
import type { Template } from '../../types';

export function TemplateManager() {
  const { currentExam, setCurrentExam, toggleTemplateManager } = useExamStore();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');

  useEffect(() => { db.templates.toArray().then(setTemplates); }, []);

  const saveTemplate = async () => {
    if (!currentExam) return;
    const templateName = name || prompt('اسم القالب:');
    if (!templateName) return;
    await db.templates.add({
      name: templateName, description: `${currentExam.subject} - ${currentExam.level}`,
      header: currentExam.header, styles: currentExam.styles, createdAt: new Date()
    });
    setName('');
    setTemplates(await db.templates.toArray());
    alert('✓ تم حفظ القالب');
  };

  const applyTemplate = async (t: Template) => {
    if (!currentExam) return;
    if (!confirm(`تطبيق قالب "${t.name}"؟`)) return;
    setCurrentExam({ ...currentExam, header: t.header, styles: t.styles });
    toggleTemplateManager();
  };

  const deleteTemplate = async (id: number) => {
    if (!confirm('حذف القالب؟')) return;
    await db.templates.delete(id);
    setTemplates(await db.templates.toArray());
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">📐 إدارة القوالب</h2>
          <button onClick={toggleTemplateManager} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
        </div>
        <div className="p-4 border-b bg-gray-50">
          <div className="flex gap-2">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم القالب الجديد"
              className="flex-1 border rounded px-3 py-2" />
            <button onClick={saveTemplate} disabled={!currentExam}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50">
              <Save size={16} /> حفظ
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {templates.length === 0 ? (
            <p className="text-center text-gray-500 py-8">لا توجد قوالب محفوظة</p>
          ) : (
            <div className="space-y-2">
              {templates.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.description}</div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => applyTemplate(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Download size={16} /></button>
                    <button onClick={() => deleteTemplate(t.id!)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}