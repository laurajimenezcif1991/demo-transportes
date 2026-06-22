import React from 'react';

interface ConfirmAprobadosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export default function ConfirmAprobadosModal({
  isOpen, onClose, onConfirm, count,
}: ConfirmAprobadosModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(16, 24, 40, 0.45)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 'var(--radius-xl, 16px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          padding: '40px 36px 32px',
          maxWidth: '440px',
          width: '90vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Warning icon — neutral, no semantic color */}
        <div style={{
          width: 64, height: 64,
          borderRadius: '50%',
          background: 'var(--color-surface-muted, #f5f5f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="var(--color-text-primary, #1a1a2e)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '20px',
            color: 'var(--color-text-primary)',
            margin: '0 0 8px',
          }}>
            Aprobar {count === 1 ? 'candidato' : `${count} candidatos`}
          </p>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            Esta acción es irreversible. {count === 1
              ? 'El candidato pasará a'
              : 'Los candidatos pasarán a'
            } la etapa <strong>Aprobados</strong> y no podrá deshacerse desde esta vista.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border-default)',
              background: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--color-text-primary)',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--color-brand-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '14px',
              color: '#fff',
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
