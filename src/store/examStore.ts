import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Exam, Question, HeaderConfig, GlobalStyles } from '../types';
import { generateId } from '../lib/utils';

interface ExamState {
  currentExam: Exam | null;
  previewMode: boolean;
  selectedQuestionId: string | null;
  showSymbolsBar: boolean;
  showTemplateManager: boolean;
  showQuestionBank: boolean;

  setCurrentExam: (exam: Exam | null) => void;
  newExam: () => void;
  updateHeader: (header: Partial<HeaderConfig>) => void;
  updateStyles: (styles: Partial<GlobalStyles>) => void;
  addQuestion: (type: Question['type'], data?: any) => void;
  updateQuestion: (id: string, data: any) => void;
  removeQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  selectQuestion: (id: string | null) => void;
  togglePreview: () => void;
  toggleSymbolsBar: () => void;
  toggleTemplateManager: () => void;
  toggleQuestionBank: () => void;
}

const defaultHeader: HeaderConfig = {
  ministry: 'الجمهورية الجزائرية الديمقراطية الشعبية',
  direction: 'مديرية التربية لولاية ...',
  school: 'المؤسسة التعليمية: ...',
  level: 'السنة: ...',
  subject: 'المادة: ...',
  term: 'الفصل: ...',
  duration: 'المدة: ساعة واحدة',
  date: new Date().toLocaleDateString('ar-DZ'),
  logoPosition: 'right',
  footerWish: 'بالتوفيق للجميع',
  fontFamily: 'Cairo',
  fontSize: 14
};

const defaultStyles: GlobalStyles = {
  partTitleFont: 'Cairo', partTitleSize: 16,
  questionFont: 'Cairo', questionSize: 14,
  lineHeight: 1.6,
  margins: { top: 15, bottom: 15, left: 20, right: 20 }
};

function createEmptyExam(): Exam {
  return {
    title: 'اختبار جديد', level: '', subject: '', term: '',
    createdAt: new Date(), updatedAt: new Date(),
    header: { ...defaultHeader }, questions: [], styles: { ...defaultStyles }
  };
}

function getDefaultData(type: Question['type']): any {
  switch (type) {
    case 'free-text':     return { text: '', lines: 3 };
    case 'guided-answer': return { text: '', options: ['', ''] };
    case 'matching':      return { text: '', listA: ['', ''], listB: ['', ''] };
    case 'table':         return { text: '', rows: [['', '', ''], ['', '', '']], cols: 3 };
    case 'quran':         return { text: '', verse: '', surah: '', ayahNumber: '' };
    case 'hadith':        return { text: '', narrator: 'عن أبي هريرة رضي الله عنه قال:', hadithText: '', source: 'رواه البخاري' };
    case 'part-divider':  return { title: 'الجزء الأول' };
  }
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      currentExam: null, previewMode: false, selectedQuestionId: null,
      showSymbolsBar: false, showTemplateManager: false, showQuestionBank: false,

      setCurrentExam: (exam) => set({ currentExam: exam }),
      newExam: () => set({ currentExam: createEmptyExam(), selectedQuestionId: null }),

      updateHeader: (header) => set((s) => ({
        currentExam: s.currentExam
          ? { ...s.currentExam, header: { ...s.currentExam.header, ...header }, updatedAt: new Date() }
          : null
      })),

      updateStyles: (styles) => set((s) => ({
        currentExam: s.currentExam
          ? { ...s.currentExam, styles: { ...s.currentExam.styles, ...styles }, updatedAt: new Date() }
          : null
      })),

      addQuestion: (type, data) => set((s) => {
        if (!s.currentExam) return s;
        const newQ: Question = {
          id: generateId(), type, order: s.currentExam.questions.length,
          data: data || getDefaultData(type)
        };
        return {
          currentExam: { ...s.currentExam, questions: [...s.currentExam.questions, newQ], updatedAt: new Date() },
          selectedQuestionId: newQ.id
        };
      }),

      updateQuestion: (id, data) => set((s) => {
        if (!s.currentExam) return s;
        return {
          currentExam: {
            ...s.currentExam,
            questions: s.currentExam.questions.map(q => q.id === id ? { ...q, data: { ...q.data, ...data } } : q),
            updatedAt: new Date()
          }
        };
      }),

      removeQuestion: (id) => set((s) => {
        if (!s.currentExam) return s;
        return {
          currentExam: {
            ...s.currentExam,
            questions: s.currentExam.questions.filter(q => q.id !== id).map((q, i) => ({ ...q, order: i })),
            updatedAt: new Date()
          }
        };
      }),

      duplicateQuestion: (id) => set((s) => {
        if (!s.currentExam) return s;
        const q = s.currentExam.questions.find(x => x.id === id);
        if (!q) return s;
        const newQ: Question = { ...q, id: generateId(), order: s.currentExam.questions.length };
        return {
          currentExam: { ...s.currentExam, questions: [...s.currentExam.questions, newQ], updatedAt: new Date() }
        };
      }),

      selectQuestion: (id) => set({ selectedQuestionId: id }),
      togglePreview: () => set((s) => ({ previewMode: !s.previewMode })),
      toggleSymbolsBar: () => set((s) => ({ showSymbolsBar: !s.showSymbolsBar })),
      toggleTemplateManager: () => set((s) => ({ showTemplateManager: !s.showTemplateManager })),
      toggleQuestionBank: () => set((s) => ({ showQuestionBank: !s.showQuestionBank }))
    }),
    { name: 'exam-builder-store', partialize: (s) => ({ currentExam: s.currentExam }) }
  )
);