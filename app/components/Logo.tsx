'use client';

/**
 * Logo Component
 * 
 * Custom HTML+CSS logo: "SR | JAN SPEAKS" with microphone icon
 * - Responsive sizing: sm (16px), md (22px), lg (28px)
 * - Automatically adapts to dark/light mode via CSS variables
 * - Speech bubble design with accent color border
 * - Microphone icon integrated as vertical separator
 * - Cable + jack decoration on right edge
  * - Zero dependencies: Pure HTML + SVG + CSS
  * - Premium display font with custom letterSpacing
  * 
  * Features:
  * - Responsive padding and typography
 * - Accessible SVG with proper viewBox
 * - Consistent across all browsers/devices
 * - Uses CSS custom properties for theming
 * 
 * @component
 * @param {Object} props
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Logo size variant
 */

// Logo built as HTML+CSS — guaranteed consistent across all browsers/devices
// Adapts automatically to dark/light mode via CSS variables
// Supports three sizes: small (16px), medium (22px), large (28px)
// Brand colors: --accent (orange) for border/mic, --fg for text
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 28 : 22;
  const pad      = size === 'sm' ? 'px-3 py-1.5' : size === 'lg' ? 'px-5 py-3' : 'px-4 py-2';

  return (
    <span
      className={`inline-flex items-center gap-0 font-black tracking-tight leading-none ${textSize}`}
      style={{
        border: '2px solid var(--accent)',
        borderRadius: '10px',
        padding: size === 'sm' ? '4px 10px' : size === 'lg' ? '8px 18px' : '6px 14px',
        position: 'relative',
        color: 'var(--fg)',
        fontFamily: "var(--font-display, 'Syne', 'Arial Black', sans-serif)",
        letterSpacing: '-0.04em',
        fontWeight: 800,
      }}
    >
      {/* Speech bubble tail */}
      <span
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '22%',
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: '9px solid var(--accent)',
        }}
      />
      {/* Cable + jack on right edge */}
      <span
        style={{
          position: 'absolute',
          right: '-18px',
          top: '30%',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
        }}
      >
        <span style={{ width: '14px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
        <span style={{ width: '5px', height: '10px', background: 'var(--brand)', borderRadius: '2px' }} />
      </span>

      {/* SR */}
      <span style={{ color: 'var(--fg)' }}>SR</span>

      {/* Microphone icon as "I" */}
      <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 1px' }}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mic capsule */}
          <rect x="7" y="0" width="10" height="14" rx="5" fill="var(--accent)" />
          {/* Grille lines */}
          <line x1="7" y1="5"  x2="17" y2="5"  stroke="white" strokeWidth="1" opacity="0.6"/>
          <line x1="7" y1="8"  x2="17" y2="8"  stroke="white" strokeWidth="1" opacity="0.6"/>
          <line x1="7" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1" opacity="0.6"/>
          {/* Stand arc */}
          <path d="M4 13 Q4 20 12 20 Q20 20 20 13"
            stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round"
          />
          {/* Stem */}
          <line x1="12" y1="20" x2="12" y2="25" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Base */}
          <line x1="7" y1="25" x2="17" y2="25" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </span>

      {/* JAN SPEAKS */}
      <span style={{ color: 'var(--fg)' }}>JAN</span>
      <span style={{ color: 'var(--fg)', marginLeft: '0.35em' }}>SPEAKS</span>
    </span>
  );
}

