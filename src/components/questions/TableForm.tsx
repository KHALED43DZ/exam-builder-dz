import { RichEditor } from '../editor/RichEditor';
import { Plus, Trash2, Rows, Columns } from 'lucide-react';
import type { TableData } from '../../types';

interface Props { data: TableData; onChange: (d: TableData) => void; }

export function TableForm({ data, onChange }: Props) {
  const updateCell = (r: number, c: number, val: string) => {
    const rows = data.rows.map(row => [...row]);
    rows[r][c] = val;
    onChange({ ...data, rows });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">عنوان السؤال</label>
        <RichEditor content={data.text} onChange={(html) => onChange({ ...data, text: html })} placeholder="أكمل الجدول..." />
      </div>
      <div className="border border-gray-300 rounded p-2 overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {data.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="p-1">
                    <input type="text" value={cell} onChange={(e) => updateCell(r, c, e.target.value)}
                      className="w-full border border-gray-200 rounded px-2 py-1 text-center focus:border-emerald-500 focus:outline-none" />
                  </td>
                ))}
                <td>
                  <button onClick={() => onChange({ ...data, rows: data.rows.filter((_, idx) => idx !== r) })}
                    className="p-1 text-red-500"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onChange({ ...data, rows: [...data.rows, Array(data.cols).fill('')] })}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          <Rows size={14} /> صف
        </button>
        <button onClick={() => onChange({ ...data, rows: data.rows.map(r => [...r, '']), cols: data.cols + 1 })}
          className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">
          <Columns size={14} /> عمود
        </button>
      </div>
    </div>
  );
}