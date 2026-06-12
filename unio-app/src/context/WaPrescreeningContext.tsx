import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Candidate } from '../data/mock';

// ─── Tipo resultado ────────────────────────────────────────────────────────────
export interface WaPrescreeningResult {
  score: number;
  status: 'continua' | 'pendiente' | 'rechazado';
  resumen: string;
  noNegociables: { label: string; score: number; evidencia: string }[];
  plusDetectados: string[];
  senales: string[];
}

// ─── Generador de resultados mock basado en el candidato ──────────────────────
export function generateWaResult(candidate: Candidate): WaPrescreeningResult {
  const s = Math.min(100, Math.round(candidate.score * 0.94));
  const status: WaPrescreeningResult['status'] = s >= 72 ? 'continua' : s >= 52 ? 'pendiente' : 'rechazado';
  const firstName = candidate.name.split(' ')[0];
  const isTransport = !!candidate.runtVerification;

  return {
    score: s,
    status,
    resumen: isTransport
      ? `Pre-entrevista completada vía WhatsApp con Alex IA (~8 min). ${firstName} confirmó licencia C2 vigente, record vial limpio y disponibilidad para turnos rotativos. Expectativa salarial ${candidate.salaryRange === 'en_rango' ? 'en rango' : 'fuera de rango'}.`
      : `Pre-entrevista completada vía WhatsApp con Alex IA (~8 min). ${firstName} mostró buena comunicación y conocimiento del rol. No negociables verificados satisfactoriamente. Expectativa salarial ${candidate.salaryRange === 'en_rango' ? 'en rango' : 'fuera de rango'}.`,
    noNegociables: isTransport ? [
      { label: 'Licencia C2 vigente',                       score: s >= 80 ? 96 : s >= 65 ? 82 : 60, evidencia: s >= 80 ? `${firstName} confirmó licencia C2 vigente y relató proceso de renovación reciente. Sin suspensiones registradas.` : s >= 65 ? 'Licencia C2 vigente confirmada con expedición en límite mínimo.' : 'No confirmó con claridad la vigencia actual de la licencia.' },
      { label: 'Sin comparendos activos (RUNT)',             score: s >= 80 ? 98 : s >= 65 ? 78 : 45, evidencia: s >= 80 ? `Declara record limpio en RUNT. Consistente con etapa de verificación previa.` : s >= 65 ? 'Sin comparendos declarados; pendiente cruce final con RUNT.' : 'Mencionó una multa de tránsito pendiente de pago.' },
      { label: 'Disponibilidad turnos rotativos y festivos', score: s >= 80 ? 95 : s >= 65 ? 80 : 55, evidencia: s >= 80 ? `Confirma disponibilidad total. Ha trabajado domingo a domingo con compensatorio en empleador anterior.` : s >= 65 ? 'Acepta turnos rotativos con acuerdo previo de no trabajar todos los festivos.' : 'Expresó limitaciones para festivos por compromisos familiares.' },
      { label: 'Expectativa salarial',                      score: candidate.salaryRange === 'en_rango' ? 88 : 42, evidencia: candidate.salaryRange === 'en_rango' ? `Expectativa declarada dentro del rango presupuestado para el cargo.` : 'Expectativa salarial superior al presupuesto disponible. Requiere negociación.' },
    ] : [
      { label: 'Ubicación y modalidad de trabajo', score: 100,                                          evidencia: `${firstName} confirmó residencia y disponibilidad para la modalidad requerida del cargo.` },
      { label: 'Experiencia mínima requerida',     score: s >= 75 ? 92 : 64,                            evidencia: s >= 75 ? `Experiencia confirmada que supera el mínimo requerido para el rol.` : 'Experiencia declarada en límite mínimo; validar profundidad en entrevista técnica.' },
      { label: 'Expectativa salarial',             score: candidate.salaryRange === 'en_rango' ? 88 : 42, evidencia: candidate.salaryRange === 'en_rango' ? 'Expectativa dentro del rango presupuestado.' : 'Expectativa superior al presupuesto; requiere negociación.' },
      { label: 'Disponibilidad para el cargo',     score: 95,                                            evidencia: `${firstName} confirmó disponibilidad de inicio inmediata y horario requerido.` },
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
