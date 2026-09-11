import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, AlignRight, AlignCenter, AlignLeft } from 'lucide-react';

interface Props { content: string; onChange: (html: string) => void; placeholder?: string; }

export function RichEditor({ content, onChange, placeholder = 'اكتب هنا...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit, Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder })
    ],
    content: content || '',
    editorProps: {
      attributes: { class: 'prose prose-sm rtl text-right focus:outline-none min-h-[80px]', dir: 'rtl', lang: 'ar' }
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML())
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) editor.commands.setContent(content || '');
  }, [content, editor]);

  if (!editor) return null;

  const ToolBtn = ({ active, onClick, children }: any) => (
    <button type="button" onClick={onClick}
      className={`p-1.5 rounded hover:bg-gray-200 transition ${active ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600'}`}>
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg bg-white">
      <div className="flex gap-0.5 p-1.5 border-b bg-gray-50 flex-wrap">
        <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolBtn>
        <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolBtn>
        <ToolBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></ToolBtn>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={16} /></ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={16} /></ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={16} /></ToolBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}