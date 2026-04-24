'use client';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'sm' ? '1.1rem' : size === 'lg' ? '1.75rem' : '1.35rem';
  const pad = size === 'sm' ? '4px 10px' : size === 'lg' ? '8px 18px' : '6px 14px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        border: '2px solid var(--accent)',
        borderRadius: '10px',
        padding: pad,
        position: 'relative',
        color: 'var(--fg)',
        fontFamily: "var(--font-display, 'Space Grotesk', 'Arial Black', sans-serif)",
        letterSpacing: '-0.04em',
        fontWeight: 900,
        fontSize,
        lineHeight: 1,
      }}
    >
      <span style={{ position: 'absolute', bottom: '-10px', right: '22%', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid var(--accent)' }} />
      <span style={{ color: 'var(--accent)' }}>SRIJAN</span>
      <span style={{ color: 'var(--fg)', marginLeft: '0.3em' }}>SPEAKS</span>
    </span>
  );
}
