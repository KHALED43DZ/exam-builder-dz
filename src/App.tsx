import { useEffect, useState } from 'react';
import { useExamStore } from './store/examStore';
import { useAutoSave } from './hooks/useAutoSave';
import { A4Preview } from './components/preview/A4Preview';
import { HeaderSettings } from './components/settings/HeaderSettings';
import { QuestionsList } from './components/editor/QuestionsList';
import { FAB } from './components/ui/FAB';
import { Toolbar } from './components/ui/Toolbar';
import { SymbolsBar } from './components/ui/SymbolsBar';
import { TemplateManager } from './components/ui/TemplateManager';
import { QuestionBank } from './components/ui/QuestionBank';
import { Printer, Eye, EyeOff, FileText, Plus } from 'lucide-react';
import { exportToPDF, printExam } from './lib/pdf';
import { db } from './lib/db';

export default function App() {
  const {
    currentExam, setCurrentExam, previewMode, togglePreview,
    showSymbolsBar, toggleSymbolsBar, showTemplateManager, showQuestionBank
  } = useExamStore();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useAutoSave();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      const draft = await db.drafts.get('current');
      if (draft?.data && !currentExam) setCurrentExam(draft.data);
    })();
  }, []);

  const insertSymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    alert(`✓ تم نسخ "${symbol}" - الصقه في المكان المناسب`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toolbar />
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {(!isMobile || !previewMode) && (
          <aside className={`${isMobile ? 'w-full' : 'w-1/2'} p-4 overflow-y-auto no-print`}
                 style={{ height: isMobile ? 'auto' : 'calc(100vh - 96px)' }}>
            {!currentExam ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <div className="text-6xl mb-4">🎓</div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">مرحباً بك في منشئ الاختبارات</h2>
                <p className="text-gray-500 mb-6">ابدأ بإنشاء اختبار جديد وفق المنهج الجزائري</p>
                <button onClick={() => useExamStore.getState().newExam()}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-2 mx-auto">
                  <Plus size={20} /> اختبار جديد
                </button>
              </div>
            ) : (
              <>
                <HeaderSettings />
                <QuestionsList />
              </>
            )}
          </aside>
        )}

        {(!isMobile || previewMode) && (
          <main className={`${isMobile ? 'w-full' : 'w-1/2'} bg-gray-300 p-4 overflow-y-auto`}
                style={{ height: isMobile ? 'auto' : 'calc(100vh - 96px)' }}>
            <div id="a4-preview"><A4Preview /></div>
          </main>
        )}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 no-print z-40">
        {isMobile && currentExam && (
          <button onClick={togglePreview}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 border border-gray-200">
            {previewMode ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        )}
        {currentExam && (
          <>
            <button onClick={toggleSymbolsBar}
              className="bg-purple-600 text-white shadow-lg rounded-full p-3 hover:bg-purple-700">🔣</button>
            <button onClick={() => exportToPDF()}
              className="bg-blue-600 text-white shadow-lg rounded-full p-3 hover:bg-blue-700"><FileText size={24} /></button>
            <button onClick={printExam}
              className="bg-emerald-600 text-white shadow-lg rounded-full p-3 hover:bg-emerald-700"><Printer size={24} /></button>
          </>
        )}
      </div>

      {currentExam && <FAB />}
      {showSymbolsBar && <SymbolsBar onInsert={insertSymbol} onClose={toggleSymbolsBar} />}
      {showTemplateManager && <TemplateManager />}
      {showQuestionBank && <QuestionBank />}
    </div>
  );
}