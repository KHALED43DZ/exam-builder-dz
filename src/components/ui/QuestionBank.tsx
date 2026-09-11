import { useState, useEffect } from 'react';
import { X, Search, Plus, Trash2, Tag } from 'lucide-react';
import { useExamStore } from '../../store/examStore';
import { db } from '../../lib/db';
import type { QuestionBankItem } from '../../types';

const TYPE_LABELS: Record<string, string> = {
  'free-text': '📝', 'guided-answer': '📋', 'matching': '🔗',
  'table': '📊', 'quran': '📖', 'hadith': '🕌', 'part-divider': '➖'
};

export function QuestionBank() {
  const { addQuestion, toggleQuestionBank } = useExamStore();
  const [items, setItems] = useState<QuestionBankItem[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => { db.questionBank.toArray().then(setItems); }, []);

  const filtered = items.filter(item => {
    const matchSearch = !search || item.title.includes(search) || item.category.includes(search);
    const matchFilter = filter === 'all' || item.type === filter;
    return matchSearch && matchFilter;
  });

  const insert = (item: QuestionBankItem) => { addQuestion(item.type, item.data); toggleQuestionBank(); };
  const deleteItem = async (id: number) => {
    if (!confirm('حذف من البنك؟')) return;
    await db.questionBank.delete(id);
    setItems(await db.questionBank.toArray());
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">📚 بنك الأسئلة</h2>
          <button onClick={toggleQuestionBank} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
        </div>
        <div className="p-4 border-b space-y-2">
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في الأسئلة..." className="w-full border rounded-lg pr-10 pl-3 py-2" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {['all', 'free-text', 'guided-answer', 'matching', 'table', 'quran', 'hadith'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs ${filter === f ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {f === 'all' ? 'الكل' : TYPE_LABELS[f]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">لا توجد أسئلة محفوظة</p>
          ) : (
            <div className="grid gap-2">
              {filtered.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-2">
                      <span>{TYPE_LABELS[item.type]}</span><span>{item.title}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                      <Tag size={12} /> {item.category}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => insert(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded"><Plus size={16} /></button>
                    <button onClick={() => deleteItem(item.id!)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
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