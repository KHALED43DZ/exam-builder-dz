import Dexie, { Table } from 'dexie';
import type { Exam, QuestionBankItem, Template } from '../types';

class ExamDB extends Dexie {
  exams!: Table<Exam>;
  questionBank!: Table<QuestionBankItem>;
  templates!: Table<Template>;
  drafts!: Table<{ id: string; data: Exam; updatedAt: Date }>;

  constructor() {
    super('ExamBuilderDZ');
    this.version(1).stores({
      exams: '++id, title, level, subject, updatedAt',
      questionBank: '++id, title, category, type, *tags, createdAt',
      templates: '++id, name, createdAt',
      drafts: 'id, updatedAt'
    });
  }
}

export const db = new ExamDB();