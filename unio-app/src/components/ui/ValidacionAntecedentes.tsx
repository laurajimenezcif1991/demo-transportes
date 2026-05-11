import { AlertTriangle, ShieldCheck } from 'lucide-react';

// ─── Datos del reporte de antecedentes (fuente: informe adjunto) ──────────────
const ANTECEDENTES_DATA = [
  {
    categoria: 'Alto',
    fuente: 'Antecedentes Penales',
    novedad: 'Registra en 1 proceso penal activo',
  },
  {
    categoria: 'Alto',
    fuente: 'Antecedentes Judiciales',
    novedad: 'Actualmente no es requerido',
  },
  {
    categoria: 'Alto',
    fuente: 'Rama Unificada',
    novedad: 'Figura como demandado en 1 proceso',
  },
  {
    categoria: 'Alto',
    fuente: 'Registraduría',
    novedad: 'Vigente con pérdida o suspensión de los derechos políticos',
  },
  {
    categoria: 'Alto',
    fuente: 'Procuraduría',
    novedad: 'Está sujeto a sanciones y/o inhabilitaciones',
  },
  {
    categoria: 'Alto',
    fuente: 'INPEC',
    novedad:
      'Figura en el sistema penitenciario con estado de prisión domiciliaria — situación jurídica: condenado',
  },
  {
    categoria: 'Alto',
    fuente: 'RUNT',
    novedad: 'Licencia suspendida para categoría B1 (autos pequeños particulares)',
  },
  {
    categoria: 'Alto',
    fuente: 'SIMIT',
    novedad: 'Posee $20.837.279 COP en multas o comparendos pendientes',
  },
  {
    categoria: 'Medio',
    fuente: 'Medidas Correctivas',
    novedad: 'Figura como infractor del código de policía y convivencia',
  },
  {
    categoria: 'Medio',
    fuente: 'Rama Unificada',
    novedad: 'Figura como demandante en 2 procesos',
  },
];

// ─── Cálculo de score mock ─────────────────────────────────────────────────────
// Penalización: -10 pts por novedad "Alto", -5 pts por "Medio". Mínimo 0.
function calcScore(data: typeof ANTECEDENTES_DATA): number {
  const altoCnt = data.filter(d => d.categoria === 'Alto').length;
  const medioCnt = data.filter(d => d.categoria === 'Medio').length;
  return Math.max(0, 100 - altoCnt * 10 - medioCnt * 5);
}

function getRisk(score: number): { label: string; color: string; bg: string; border: string } {
  if (score >= 85) return { label: 'Sin novedad',      color: '#16A34A', bg: '#DCFCE7', border: '#BBF7D0' };
  if (score >= 70) return { label: 'Riesgo Bajo',      color: '#65A30D', bg: '#F7FEE7', border: '#D9F99D' };
  if (score >= 50) return { label: 'Riesgo Medio',     color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' };
  if (score >= 30) return { label: 'Riesgo Alto',      color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA' };
  return              { label: 'Riesgo Muy Alto',  color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
}

export default function ValidacionAntecedentes() {
  const score = calcScore(ANTECEDENTES_DATA);
  const { label: riskLabel, color, bg, border } = getRisk(score);
  const altoCnt  = ANTECEDENTES_DATA.filter(d => d.categoria === 'Alto').length;
  const medioCnt = ANTECEDENTES_DATA.filter(d => d.categoria === 'Medio').length;
  const isClean  = score >= 85;

  return (
    <div style={{ padding: '4px 0 8px' }}>

      {/* ── Resumen ejecutivo ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
          padding: '14px 16px',
          borderRadius: '10px',
          background: bg,
          border: `1.5px solid ${border}`,
          marginBottom: '18px',
        }}
      >
        <div style={{ marginTop: 2 }}>
          {isClean
            ? <ShieldCheck size={22} color={color} />
            : <AlertTriangle size={22} color={color} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontWeight: 700, fontSize: '15px', color }}>
              {riskLabel}
            </span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 800,
                background: color,
                color: '#fff',
                padding: '2px 12px',
                borderRadius: '20px',
                letterSpacing: '0.2px',
              }}
            >
              {score} / 100
            </span>
          </div>
          <p style={{ fontSize: '13px', color, margin: 0, lineHeight: 1.55 }}>
            {isClean
              ? 'No se encontraron novedades en ninguna fuente consultada.'
              : `${altoCnt} novedad${altoCnt !== 1 ? 'es' : ''} de riesgo alto · ${medioCnt} de riesgo medio. No recomendado para vinculación.`}
          </p>
        </div>
      </div>

      {/* ── Tabla de resultados ───────────────────────────────────────── */}
      <div
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--color-border-default)',
        }}
      >
        {/* Cabecera */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 170px 1fr',
            padding: '9px 14px',
            background: '#F3F4F6',
            borderBottom: '1px solid var(--color-border-default)',
          }}
        >
          {['Categoría', 'Fuente', 'Novedad'].map(h => (
            <span
              key={h}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Filas */}
        {ANTECEDENTES_DATA.map((row, idx) => {
          const isAlto = row.categoria === 'Alto';
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 170px 1fr',
                padding: '10px 14px',
                alignItems: 'start',
                background: idx % 2 === 0 ? '#ffffff' : '#FAFAFA',
                borderBottom:
                  idx < ANTECEDENTES_DATA.length - 1
                    ? '1px solid var(--color-border-default)'
                    : 'none',
              }}
            >
              {/* Categoría pill */}
              <div style={{ paddingTop: '1px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 9px',
                    borderRadius: '20px',
                    background: isAlto ? '#FEE2E2' : '#FEF9C3',
                    color:      isAlto ? '#DC2626' : '#B45309',
                    border: `1px solid ${isAlto ? '#FECACA' : '#FDE68A'}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.categoria}
                </span>
              </div>

              {/* Fuente */}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  paddingRight: '12px',
                  lineHeight: 1.5,
                }}
              >
                {row.fuente}
              </span>

              {/* Novedad */}
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.55,
                }}
              >
                {row.novedad}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Nota metodológica ────────────────────────────────────────── */}
      <p
        style={{
          marginTop: '12px',
          fontSize: '11.5px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}
      >
        Score calculado automáticamente: –10 pts por novedad de categoría Alta · –5 pts por Media.
        Fuentes consultadas: Antecedentes Penales, Judiciales, Rama Unificada, Registraduría,
        Procuraduría, INPEC, RUNT y SIMIT.
      </p>
    </div>
  );
}
