import { useEffect } from 'react';
import { db } from '../lib/db';
import { useExamStore } from '../store/examStore';

export function useAutoSave(intervalMs = 3000) {
  const currentExam = useExamStore((s) => s.currentExam);
  useEffect(() => {
    if (!currentExam) return;
    const timer = setTimeout(() => {
      db.drafts.put({ id: 'current', data: currentExam, updatedAt: new Date() });
    }, intervalMs);
    return () => clearTimeout(timer);
  }, [currentExam, intervalMs]);
}