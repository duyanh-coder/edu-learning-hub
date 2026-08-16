import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AcademicTerm } from '../data/models/AcademicTerm';
import { learningDataProvider } from '../data/providers';

const STORAGE_KEY = 'edu-learning-hub:academic-term';

type AcademicTermContextValue = {
  terms: AcademicTerm[];
  selectedTerm: AcademicTerm | null;
  loading: boolean;
  error: string;
  setSelectedTerm: (termId: string) => void;
};

const AcademicTermContext = createContext<AcademicTermContextValue | undefined>(undefined);

export function AcademicTermProvider({ children }: { children: ReactNode }) {
  const [terms, setTerms] = useState<AcademicTerm[]>([]);
  const [selectedTermId, setSelectedTermId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    learningDataProvider.getAcademicTerms()
      .then((items) => {
        if (!mounted) return;
        const active = items.filter((item) => item.active);
        setTerms(active);
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const defaultTerm = active.find((item) => item.id === saved)
          || active.find((item) => item.isCurrent)
          || active[0]
          || null;
        setSelectedTermId(defaultTerm?.id || '');
      })
      .catch((cause: unknown) => {
        if (!mounted) return;
        setError(cause instanceof Error ? cause.message : 'Không thể tải danh sách năm học - học kỳ.');
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  const setSelectedTerm = (termId: string) => {
    setSelectedTermId(termId);
    window.localStorage.setItem(STORAGE_KEY, termId);
  };

  const selectedTerm = useMemo(
    () => terms.find((item) => item.id === selectedTermId) || null,
    [terms, selectedTermId],
  );

  return (
    <AcademicTermContext.Provider value={{ terms, selectedTerm, loading, error, setSelectedTerm }}>
      {children}
    </AcademicTermContext.Provider>
  );
}

export function useAcademicTerm() {
  const context = useContext(AcademicTermContext);
  if (!context) throw new Error('useAcademicTerm must be used within AcademicTermProvider');
  return context;
}
