import type { Question, GlobalStyles } from '../../types';
import { toArabicOrdinal } from '../../lib/utils';

interface Props { question: Question; index: number; styles: GlobalStyles; }

export function QuestionRenderer({ question, index }: Props) {
  const { type, data } = question;

  if (type === 'part-divider') return <div className="part-divider">{data.title}</div>;

  if (type === 'free-text') {
    return (
      <div>
        <div className="font-bold mb-2">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        {Array.from({ length: data.lines || 3 }).map((_, i) => <div key={i} className="answer-line" />)}
      </div>
    );
  }

  if (type === 'guided-answer') {
    return (
      <div>
        <div className="font-bold mb-2">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        {(data.options || []).map((opt: string, i: number) => (
          <div key={i} className="answer-line-numbered">
            <span className="num">{i + 1}-</span>
            <span className="min-w-[200px]">{opt}</span>
            <div className="line" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'matching') {
    const maxLen = Math.max(data.listA.length, data.listB.length);
    return (
      <div>
        <div className="font-bold mb-2">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center my-3">
          <div className="font-bold text-center bg-blue-100 p-2 rounded">القائمة أ</div>
          <div className="w-12"></div>
          <div className="font-bold text-center bg-purple-100 p-2 rounded">القائمة ب</div>
          {Array.from({ length: maxLen }).map((_, i) => (
            <>
              <div key={`a${i}`} className="border border-blue-300 p-2 text-center rounded bg-blue-50">{data.listA[i] || ''}</div>
              <div key={`s${i}`} className="text-center text-2xl text-gray-400">⟷</div>
              <div key={`b${i}`} className="border border-purple-300 p-2 text-center rounded bg-purple-50">{data.listB[i] || ''}</div>
            </>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div>
        <div className="font-bold mb-2">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        <table className="w-full border-collapse border-2 border-black my-2">
          <tbody>
            {data.rows.map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border border-black p-2 text-center min-w-[60px] min-h-[35px]">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'quran') {
    return (
      <div className="text-center">
        <div className="font-bold mb-2 text-right">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        <div className="quran-text my-3">
          <span className="quran-prefix">قال الله تعالى:</span>
          <span className="quran-bracket">﴿ </span>
          <span>{data.verse}</span>
          <span className="quran-bracket"> ﴾</span>
        </div>
        {data.surah && (
          <div className="text-sm italic text-gray-600 mt-1">
            [سورة {data.surah}{data.ayahNumber ? ` - الآية ${data.ayahNumber}` : ''}]
          </div>
        )}
      </div>
    );
  }

  if (type === 'hadith') {
    return (
      <div>
        <div className="font-bold mb-2">
          <span className="text-emerald-700">السؤال {toArabicOrdinal(index + 1)}:</span>{' '}
          <span dangerouslySetInnerHTML={{ __html: data.text }} />
        </div>
        <div className="bg-amber-50 border-r-4 border-amber-600 p-3 my-2">
          <div className="text-emerald-800 font-semibold mb-1">{data.narrator}</div>
          <div className="hadith-text">{data.hadithText}</div>
          <div className="text-left text-sm text-gray-600 mt-2 italic">({data.source})</div>
        </div>
      </div>
    );
  }

  return null;
}