export type QuestionType =
  | 'free-text' | 'guided-answer' | 'matching' | 'table'
  | 'quran' | 'hadith' | 'part-divider';

export interface HeaderConfig {
  ministry: string; direction: string; school: string;
  level: string; subject: string; term: string;
  duration: string; date: string; logoUrl?: string;
  logoPosition: 'right' | 'left' | 'center';
  footerWish: string; fontFamily: string; fontSize: number;
}

export interface GlobalStyles {
  partTitleFont: string; partTitleSize: number;
  questionFont: string; questionSize: number;
  lineHeight: number;
  margins: { top: number; bottom: number; left: number; right: number };
}

export interface Question { id: string; type: QuestionType; order: number; data: any; }

export interface Exam {
  id?: number; title: string; level: string; subject: string; term: string;
  createdAt: Date; updatedAt: Date;
  header: HeaderConfig; questions: Question[]; styles: GlobalStyles;
}

export interface QuestionBankItem {
  id?: number; title: string; category: string;
  type: QuestionType; data: any; tags: string[]; createdAt: Date;
}

export interface Template {
  id?: number; name: string; description: string;
  header: HeaderConfig; styles: GlobalStyles; createdAt: Date;
}

export interface FreeTextData { text: string; lines: number; }
export interface GuidedAnswerData { text: string; options: string[]; }
export interface MatchingData { text: string; listA: string[]; listB: string[]; }
export interface TableData { text: string; rows: string[][]; cols: number; }
export interface QuranData { text: string; verse: string; surah: string; ayahNumber: string; }
export interface HadithData { text: string; narrator: string; hadithText: string; source: string; }
export interface PartDividerData { title: string; }