import { useExamStore } from '../../store/examStore';
import { QuestionRenderer } from './QuestionRenderer';

export function A4Preview() {
  const exam = useExamStore((s) => s.currentExam);
  if (!exam) {
    return (
      <div className="a4-page flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg">ابدأ بإنشاء اختبار جديد</p>
        </div>
      </div>
    );
  }

  const { header, questions, styles } = exam;

  return (
    <div className="a4-page" style={{
      fontFamily: header.fontFamily, fontSize: `${header.fontSize}px`,
      padding: `${styles.margins.top}mm ${styles.margins.right}mm ${styles.margins.bottom}mm ${styles.margins.left}mm`
    }}>
      <header className="text-center border-b-2 border-black pb-3 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="text-right flex-1">
            <div className="font-bold text-sm">{header.ministry}</div>
            <div className="text-xs">{header.direction}</div>
          </div>
          {header.logoUrl && <img src={header.logoUrl} alt="شعار" className="h-16 mx-2" />}
          <div className="text-left flex-1">
            <div className="text-xs">{header.school}</div>
            <div className="text-xs">{header.level}</div>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center font-bold border-t border-b py-2 text-sm">
          <span>{header.subject}</span><span>{header.term}</span>
          <span>{header.duration}</span><span>{header.date}</span>
        </div>
      </header>

      <main style={{ lineHeight: styles.lineHeight, fontSize: `${styles.questionSize}px` }}>
        {questions.sort((a, b) => a.order - b.order).map((q, idx) => (
          <div key={q.id} className="page-break-inside-avoid mb-3">
            <QuestionRenderer question={q} index={idx} styles={styles} />
          </div>
        ))}
      </main>

      <footer className="mt-8 pt-4 border-t border-gray-400 flex justify-between text-sm">
        <div>إمضاء الأستاذ(ة)</div>
        <div className="italic text-gray-600">{header.footerWish}</div>
      </footer>
    </div>
  );
}