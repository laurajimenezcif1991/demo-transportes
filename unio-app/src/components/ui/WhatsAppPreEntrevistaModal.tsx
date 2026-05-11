import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Users, ChevronRight, Mic } from 'lucide-react';
import type { Candidate } from '../../data/mock';
import Avatar from './Avatar';

// ─── WhatsApp Logo ─────────────────────────────────────────────────────────────
export function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M22.5 9.5C21 8 19 7 16.8 7C12.1 7 8.3 10.8 8.3 15.5C8.3 17 8.7 18.5 9.5 19.8L8.2 24.5L13.1 23.2C14.3 23.9 15.5 24.3 16.8 24.3C21.5 24.3 25.3 20.5 25.3 15.8C25.3 13.5 24.3 11.3 22.5 9.5ZM16.8 22.8C15.6 22.8 14.5 22.5 13.5 21.9L13.2 21.7L10.4 22.5L11.2 19.8L11 19.5C10.3 18.4 9.9 17.1 9.9 15.5C9.9 11.7 13 8.6 16.8 8.6C18.6 8.6 20.3 9.3 21.6 10.6C22.9 11.9 23.7 13.6 23.7 15.5C23.7 19.3 20.5 22.8 16.8 22.8ZM20.5 17.3C20.3 17.2 19.3 16.7 19.1 16.6C18.9 16.5 18.8 16.5 18.6 16.7C18.5 16.9 18.1 17.4 17.9 17.5C17.8 17.7 17.6 17.7 17.4 17.6C16.4 17.1 15.5 16.4 14.8 15.5C14.5 15.2 14.9 15.2 15.2 14.6C15.3 14.5 15.3 14.3 15.2 14.2C15.1 14.1 14.8 13.1 14.6 12.7C14.4 12.3 14.3 12.3 14.1 12.3H13.7C13.6 12.3 13.3 12.4 13.1 12.6C12.9 12.8 12.3 13.4 12.3 14.4C12.3 15.4 13.1 16.3 13.2 16.5C13.3 16.6 14.8 19 17.2 19.9C19 20.6 19.8 20.6 20.5 20.5C21 20.4 21.9 19.9 22.1 19.3C22.3 18.7 22.3 18.2 22.2 18.1C22.1 18 22 17.9 21.8 17.8L20.5 17.3Z"
        fill="white"
      />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface WaMsg {
  from: 'alex' | 'candidate';
  text: string;
  time: string;
  phase?: string;
}

interface PhaseLabel {
  label: string;
  startIdx: number;
}

const PHASES: PhaseLabel[] = [
  { label: 'Apertura',        startIdx: 0  },
  { label: 'Contexto',        startIdx: 3  },
  { label: 'No negociables',  startIdx: 5  },
  { label: 'Must-haves',      startIdx: 8  },
  { label: 'Logros',          startIdx: 10 },
  { label: 'Cierre',          startIdx: 12 },
];

function currentPhase(msgIdx: number): string {
  let phase = PHASES[0].label;
  for (const p of PHASES) {
    if (msgIdx >= p.startIdx) phase = p.label;
  }
  return phase;
}

function buildConversation(firstName: string, jobTitle: string, aspiration: string): WaMsg[] {
  const base = new Date();
  const fmt = (offset: number) => {
    const d = new Date(base.getTime() + offset * 35_000);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };
  return [
    // 0-1 Apertura
    { from: 'alex',      time: fmt(0),  text: `Hola ${firstName}! 👋 Soy *Alex*, asistente de talento de Comfandi. Tu perfil quedó bien ranqueado para *${jobTitle}*. ¿Tienes unos 10 minutos?` },
    { from: 'candidate', time: fmt(1),  text: '¡Hola! Claro, con gusto 😊' },
    // 2-3 Rompe-hielo
    { from: 'alex',      time: fmt(2),  text: '¡Perfecto!... Antes de entrar en lo del cargo, cuéntame un poco de ti más allá de lo profesional. ¿Qué te gusta hacer?' },
    { from: 'candidate', time: fmt(3),  text: 'Me encanta leer sobre comportamiento humano y los domingos corro en la Ciclovía 🏃' },
    // 4-5 Estado laboral → No negociables
    { from: 'alex',      time: fmt(4),  text: '¡Qué bueno!... ¿Y laboralmente, estás trabajando actualmente o en qué estás?' },
    { from: 'candidate', time: fmt(5),  text: 'Sí, trabajo actualmente como Research Manager en IPA Colombia.' },
    // 6-7 Contexto empresa + negociable (ciudad)
    { from: 'alex',      time: fmt(6),  text: `Mira, Comfandi acompaña a sus afiliados a lo largo de toda su vida... Para este rol necesitamos a alguien que diseñe intervenciones conductuales para mejorar hábitos y bienestar. El cargo es presencial en Bogotá, ¿eso te funciona?` },
    { from: 'candidate', time: fmt(7),  text: '¡Me suena muy bien! Estoy en Bogotá sin problema ✅' },
    // 8-9 Must-haves: herramientas
    { from: 'alex',      time: fmt(8),  text: '¿Y con qué metodologías o herramientas has trabajado más en tus proyectos?' },
    { from: 'candidate', time: fmt(9),  text: 'EAST, 3B y COMB para diseño de intervenciones. SPSS/R y Power BI para análisis y reportes de impacto.' },
    // 10-11 Logro clave
    { from: 'alex',      time: fmt(10), text: 'Cuéntame de un logro del que estés orgulloso, algo relevante para este tipo de rol.' },
    { from: 'candidate', time: fmt(11), text: 'Diseñé un piloto de ahorro conductual para 500 empleados que incrementó la cotización un 23% en 6 meses 📈' },
    // 12-13 Salario
    { from: 'alex',      time: fmt(12), text: '¡Qué impacto!... ¿Y cuál sería tu expectativa salarial?' },
    { from: 'candidate', time: fmt(13), text: aspiration || 'Entre $5.5M y $6M COP.' },
    // 14-16 Cierre
    { from: 'alex',      time: fmt(14), text: `¡Estamos alineados! 🙌... ${firstName}, muchas gracias por tu tiempo. El equipo de talento estará en contacto muy pronto. ¿Tienes alguna pregunta?` },
    { from: 'candidate', time: fmt(15), text: 'No, ¡muchas gracias! Quedo pendiente 😊' },
    { from: 'alex',      time: fmt(16), text: `¡Fue un gusto conocerte!... ¡Hasta pronto, ${firstName}! ✅` },
  ];
}

// typing delays per message index (ms): Alex messages longer, candidate shorter
const TYPING_DELAYS = [1800, 900, 2200, 1400, 1800, 1200, 2600, 1400, 1800, 2200, 1800, 2800, 1600, 1300, 2300, 1200, 1800];
const PAUSE_BETWEEN = 250;

// ─── Typing Bubbles ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <>
      <style>{`
        @keyframes waDot { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }
      `}</style>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        background: 'white', borderRadius: '16px 16px 16px 4px',
        padding: '10px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
      }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: '50%', background: '#B0B0B0',
            display: 'inline-block',
            animation: `waDot 1.2s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }} />
        ))}
      </div>
    </>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  jobTitle?: string;
}

type View = 'confirm' | 'chat';

// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function WhatsAppPreEntrevistaModal({ isOpen, onClose, candidates, jobTitle = 'la vacante' }: Props) {
  const [view, setView] = useState<View>('confirm');
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState<WaMsg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFor, setTypingFor] = useState<'alex' | 'candidate'>('alex');
  const [isDone, setIsDone] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const candidate = candidates[activeIdx];
  const firstName = candidate?.name?.split(' ')[0] ?? 'Candidato';
  const messages = candidate
    ? buildConversation(firstName, jobTitle, candidate.aspiration)
    : [];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMsgs, isTyping]);

  // Auto-play when entering chat view
  useEffect(() => {
    if (view !== 'chat' || !candidate) return;
    setVisibleMsgs([]);
    setIsTyping(false);
    setIsDone(false);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    let delay = 400;
    messages.forEach((msg, i) => {
      const typingDuration = TYPING_DELAYS[i] ?? 1500;

      const t1 = setTimeout(() => {
        setIsTyping(true);
        setTypingFor(msg.from);
      }, delay);
      delay += typingDuration;

      const t2 = setTimeout(() => {
        setIsTyping(false);
        setVisibleMsgs(prev => [...prev, msg]);
        if (i === messages.length - 1) setIsDone(true);
      }, delay);
      delay += PAUSE_BETWEEN;

      timeoutsRef.current.push(t1, t2);
    });

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [view, activeIdx]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setView('confirm');
      setActiveIdx(0);
      setVisibleMsgs([]);
      setIsTyping(false);
      setIsDone(false);
      timeoutsRef.current.forEach(clearTimeout);
    }
  }, [isOpen]);

  const skipToEnd = () => {
    timeoutsRef.current.forEach(clearTimeout);
    setIsTyping(false);
    setVisibleMsgs(messages);
    setIsDone(true);
  };

  const handleCandidateTab = (idx: number) => {
    timeoutsRef.current.forEach(clearTimeout);
    setVisibleMsgs([]);
    setIsTyping(false);
    setIsDone(false);
    setActiveIdx(idx);
  };

  if (!isOpen) return null;

  const activePhase = currentPhase(visibleMsgs.length);
  const phaseIdx = PHASES.findIndex(p => p.label === activePhase);

  return (
    <>
      {/* Keyframes injected globally */}
      <style>{`
        @keyframes waDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        @keyframes waSlideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(15,8,36,0.6)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: view === 'confirm' ? '480px' : '800px',
            background: '#fff', borderRadius: '20px',
            boxShadow: '0 24px 80px rgba(15,8,36,0.22)',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            maxHeight: '90vh',
            transition: 'max-width 0.3s ease',
          }}
        >
          {/* ── View: Confirmation ───────────────────────────────────────── */}
          {view === 'confirm' && (
            <>
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px 24px 18px',
                borderBottom: '1px solid #F0F0F0',
              }}>
                <WaIcon size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '17px', color: '#111' }}>
                    Pre-entrevista IA por WhatsApp
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '1px' }}>
                    Alex IA · Comfandi Talent
                  </div>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px', borderRadius: '8px' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '24px', overflowY: 'auto' }}>
                {/* Alex IA description */}
                <div style={{
                  background: '#F0FFF4', border: '1.5px solid #BBF7D0',
                  borderRadius: '12px', padding: '14px 16px', marginBottom: '20px',
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Mic size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#15803D' }}>
                      Alex IA · Reclutadora de IA
                    </div>
                    <p style={{ fontSize: '13px', color: '#166534', margin: '4px 0 0', lineHeight: 1.55 }}>
                      Conduce pre-entrevistas de 7–10 min vía WhatsApp. Valida no negociables,
                      must-haves y expectativa salarial. El equipo recibe el reporte automáticamente.
                    </p>
                  </div>
                </div>

                {/* Selected candidates */}
                <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#444' }}>
                  <Users size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                  {candidates.length} candidato{candidates.length !== 1 ? 's' : ''} seleccionado{candidates.length !== 1 ? 's' : ''}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {candidates.map((c, i) => (
                    <div key={c.id} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', borderRadius: '10px',
                      background: '#FAFAFA', border: '1px solid #EFEFEF',
                    }}>
                      <Avatar
                        src={c.photo}
                        initials={c.avatarInitials}
                        color={c.avatarColor}
                        size={36}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#111' }}>{c.name}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>{c.role}</div>
                      </div>
                      <span style={{
                        fontWeight: 800, fontSize: '14px',
                        color: c.score >= 80 ? '#16A34A' : c.score >= 60 ? '#D97706' : '#DC2626',
                      }}>
                        {c.score}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setView('chat')}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px',
                    background: '#25D366', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    fontWeight: 700, fontSize: '15px', color: '#fff',
                  }}
                >
                  <WaIcon size={20} />
                  Iniciar simulación de pre-entrevista
                  <ChevronRight size={18} />
                </button>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
                  Simulación demo · No se envían mensajes reales
                </p>
              </div>
            </>
          )}

          {/* ── View: Chat ──────────────────────────────────────────────── */}
          {view === 'chat' && (
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', maxHeight: '90vh' }}>

              {/* Left: Chat */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* WhatsApp Header */}
                <div style={{
                  background: '#128C7E', padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}>
                    <Mic size={16} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                      Alex IA · Comfandi Talent
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                      {isDone ? '✓ Entrevista completada' : isTyping ? (typingFor === 'alex' ? 'escribiendo...' : `${firstName} está escribiendo...`) : 'en línea'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!isDone && (
                      <button
                        onClick={skipToEnd}
                        style={{
                          background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
                          color: '#fff', borderRadius: '8px', padding: '4px 10px', fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        Completar →
                      </button>
                    )}
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', padding: '4px' }}>
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Candidate tabs (if multiple) */}
                {candidates.length > 1 && (
                  <div style={{
                    display: 'flex', gap: '0', overflowX: 'auto',
                    background: '#F0F0F0', borderBottom: '1px solid #E0E0E0',
                  }}>
                    {candidates.map((c, i) => (
                      <button
                        key={c.id}
                        onClick={() => handleCandidateTab(i)}
                        style={{
                          padding: '8px 14px', border: 'none', cursor: 'pointer',
                          background: i === activeIdx ? '#fff' : 'transparent',
                          borderBottom: i === activeIdx ? '2px solid #25D366' : '2px solid transparent',
                          fontSize: '12px', fontWeight: i === activeIdx ? 700 : 400,
                          color: i === activeIdx ? '#128C7E' : '#666',
                          whiteSpace: 'nowrap', flexShrink: 0,
                        }}
                      >
                        {c.name.split(' ')[0]} {c.name.split(' ')[1]?.[0]}.
                      </button>
                    ))}
                  </div>
                )}

                {/* Chat messages */}
                <div style={{
                  flex: 1, overflowY: 'auto', padding: '16px 12px',
                  background: '#ECE5DD',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d9d0c8' fill-opacity='0.35'%3E%3Ccircle cx='5' cy='5' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  minHeight: '360px', maxHeight: '420px',
                }}>
                  {/* Date marker */}
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px', background: 'rgba(255,255,255,0.75)',
                      padding: '3px 10px', borderRadius: '12px', color: '#666',
                    }}>
                      Hoy
                    </span>
                  </div>

                  {visibleMsgs.map((msg, i) => {
                    const isAlex = msg.from === 'alex';
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: isAlex ? 'flex-start' : 'flex-end',
                          animation: 'waSlideIn 0.2s ease',
                          marginBottom: '2px',
                        }}
                      >
                        <div style={{
                          maxWidth: '75%',
                          background: isAlex ? '#fff' : '#DCF8C6',
                          borderRadius: isAlex ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                          padding: '8px 12px 6px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          position: 'relative',
                        }}>
                          {isAlex && i === 0 && (
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#128C7E', marginBottom: '3px' }}>
                              Alex IA
                            </div>
                          )}
                          <p style={{
                            margin: 0, fontSize: '13.5px', lineHeight: 1.5,
                            color: '#111',
                            whiteSpace: 'pre-wrap',
                          }}>
                            {msg.text.replace(/\*/g, '')}
                          </p>
                          <div style={{
                            fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px',
                          }}>
                            {msg.time}
                            {!isAlex && (
                              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                                <path d="M11 1L5 7L2 4" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 1L9 7" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div style={{
                      display: 'flex',
                      justifyContent: typingFor === 'alex' ? 'flex-start' : 'flex-end',
                      animation: 'waSlideIn 0.15s ease',
                    }}>
                      <TypingDots />
                    </div>
                  )}

                  {/* Completion banner */}
                  {isDone && (
                    <div style={{
                      textAlign: 'center', margin: '12px 0 4px',
                      animation: 'waSlideIn 0.3s ease',
                    }}>
                      <span style={{
                        fontSize: '11px', background: 'rgba(255,255,255,0.85)',
                        padding: '3px 10px', borderRadius: '12px', color: '#666',
                      }}>
                        Entrevista completada
                      </span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Right: Progress panel */}
              <div style={{
                width: '220px', flexShrink: 0, borderLeft: '1px solid #E8E8E8',
                background: '#FAFAFA', display: 'flex', flexDirection: 'column',
              }}>
                {/* Candidate info */}
                <div style={{
                  padding: '16px', borderBottom: '1px solid #EFEFEF',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <Avatar
                    src={candidate?.photo}
                    initials={candidate?.avatarInitials}
                    color={candidate?.avatarColor}
                    size={48}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', lineHeight: 1.3 }}>
                      {candidate?.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                      {candidate?.location?.replace(', Colombia', '')}
                    </div>
                  </div>
                  <div style={{
                    fontWeight: 800, fontSize: '22px',
                    color: (candidate?.score ?? 0) >= 80 ? '#16A34A' : '#D97706',
                  }}>
                    {candidate?.score}<span style={{ fontSize: '12px', fontWeight: 400, color: '#999' }}>/100</span>
                  </div>
                </div>

                {/* Phases progress */}
                <div style={{ padding: '14px 16px', flex: 1, overflowY: 'auto' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                    Fases de la entrevista
                  </div>
                  {PHASES.map((phase, i) => {
                    const isPast    = i < phaseIdx;
                    const isCurrent = i === phaseIdx && !isDone;
                    const isDoneAll = isDone;
                    const isActive  = isPast || isCurrent || isDoneAll;

                    return (
                      <div key={phase.label} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        marginBottom: '10px',
                      }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: isDoneAll || isPast ? '#25D366' : isCurrent ? '#128C7E' : '#E0E0E0',
                          transition: 'background 0.3s',
                        }}>
                          {(isDoneAll || isPast) ? (
                            <CheckCircle2 size={12} color="white" />
                          ) : (
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: isCurrent ? 'white' : '#bbb' }} />
                          )}
                        </div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: isCurrent ? 700 : 400,
                          color: isDoneAll || isPast ? '#128C7E' : isCurrent ? '#111' : '#aaa',
                        }}>
                          {phase.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Result (shown when done) */}
                {isDone && (
                  <div style={{
                    margin: '12px', padding: '12px', borderRadius: '10px',
                    background: '#F0FFF4', border: '1.5px solid #BBF7D0',
                    animation: 'waSlideIn 0.3s ease',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#16A34A', marginBottom: '4px' }}>
                      ✓ Recomendado para avanzar
                    </div>
                    <div style={{ fontSize: '11px', color: '#166534', lineHeight: 1.5 }}>
                      No negociables: OK · Expectativa salarial: En rango · Perfil: Alineado
                    </div>
                  </div>
                )}

                {/* Footer close */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #EFEFEF' }}>
                  <button
                    onClick={onClose}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '10px',
                      background: isDone ? '#25D366' : '#F0F0F0', border: 'none', cursor: 'pointer',
                      fontWeight: 700, fontSize: '13px', color: isDone ? '#fff' : '#444',
                    }}
                  >
                    {isDone ? 'Cerrar ✓' : 'Cancelar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
