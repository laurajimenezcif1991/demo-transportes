import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Candidate } from '../data/mock';

// ─── Tipo resultado ────────────────────────────────────────────────────────────
export interface WaPrescreeningResult {
  score: number;
  status: 'continua' | 'pendiente' | 'rechazado';
  resumen: string;
  noNegociables: { label: string; score: number }[];
  plusDetectados: string[];
  senales: string[];
}

// ─── Generador de resultados mock basado en el candidato ──────────────────────
export function generateWaResult(candidate: Candidate): WaPrescreeningResult {
  const s = Math.min(100, Math.round(candidate.score * 0.94));
  const status: WaPrescreeningResult['status'] = s >= 72 ? 'continua' : s >= 52 ? 'pendiente' : 'rechazado';
  const firstName = candidate.name.split(' ')[0];

  return {
    score: s,
    status,
    resumen: `Pre-entrevista completada vía WhatsApp con Alex IA (~8 min). ${firstName} mostró buena comunicación y conocimiento del rol. No negociables verificados satisfactoriamente. Expectativa salarial ${candidate.salaryRange === 'en_rango' ? 'en rango' : 'fuera de rango'}.`,
    noNegociables: [
      { label: 'Ubicación y modalidad de trabajo', score: 100 },
      { label: 'Experiencia mínima requerida',     score: s >= 75 ? 92 : 64 },
      { label: 'Expectativa salarial',             score: candidate.salaryRange === 'en_rango' ? 88 : 42 },
      { label: 'Disponibilidad para el cargo',     score: 95 },
    ],
    plusDetectados: candidate.scoringAI?.logros?.slice(0, 2).length
      ? candidate.scoringAI.logros.slice(0, 2)
      : ['Buena capacidad de síntesis', 'Comunicación clara y directa'],
    senales: candidate.scoringAI?.senales?.slice(0, 1) ?? [],
  };
}

// ─── Context ───────────────────────────────────────────────────────────────────
interface WaPrescreeningCtx {
  isCompleted: (candidateId: string) => boolean;
  getResult:   (candidateId: string) => WaPrescreeningResult | undefined;
  markCompleted: (candidates: Candidate[]) => void;
}

const Ctx = createContext<WaPrescreeningCtx | null>(null);

export function WaPrescreeningProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Record<string, WaPrescreeningResult>>({});

  const isCompleted = useCallback(
    (id: string) => id in results,
    [results],
  );

  const getResult = useCallback(
    (id: string) => results[id],
    [results],
  );

  const markCompleted = useCallback((candidates: Candidate[]) => {
    setResults(prev => {
      const next = { ...prev };
      candidates.forEach(c => { next[c.id] = generateWaResult(c); });
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ isCompleted, getResult, markCompleted }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWaPrescreening() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWaPrescreening must be used inside WaPrescreeningProvider');
  return ctx;
}
