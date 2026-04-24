'use client';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 28 : 22;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        border: '2px solid var(--accent)',
        borderRadius: '10px',
        padding: size === 'sm' ? '4px 10px' : size === 'lg' ? '8px 18px' : '6px 14px',
        position: 'relative',
        color: 'var(--fg)',
        fontFamily: "var(--font-display, 'Space Grotesk', 'Arial Black', sans-serif)",
        letterSpacing: '-0.04em',
        fontWeight: 800,
        fontSize: size === 'sm' ? '1.1rem' : size === 'lg' ? '1.75rem' : '1.35rem',
        lineHeight: 1,
      }}
    >
      <span style={{ position: 'absolute', bottom: '-10px', right: '22%', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid var(--accent)' }} />
      <span style={{ position: 'absolute', right: '-18px', top: '30%', display: 'flex', alignItems: 'center', gap: '1px' }}>
        <span style={{ width: '14px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
        <span style={{ width: '5px', height: '10px', background: 'var(--brand)', borderRadius: '2px' }} />
      </span>
      <span style={{ color: 'var(--fg)' }}>SR</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 1px' }}>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="0" width="10" height="14" rx="5" fill="var(--accent)" />
          <line x1="7" y1="5" x2="17" y2="5" stroke="white" strokeWidth="1" opacity="0.6"/>
          <line x1="7" y1="8" x2="17" y2="8" stroke="white" strokeWidth="1" opacity="0.6"/>
          <line x1="7" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1" opacity="0.6"/>
          <path d="M4 13 Q4 20 12 20 Q20 20 20 13" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="25" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="7" y1="25" x2="17" y2="25" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </span>
      <span style={{ color: 'var(--fg)' }}>JAN</span>
      <span style={{ color: 'var(--fg)', marginLeft: '0.35em' }}>SPEAKS</span>
    </span>
  );
}
