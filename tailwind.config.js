/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration with custom theme and animation
// Note: most styling uses inline CSS with design tokens (--accent, --cyan, etc.)
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0E27',
        'dark-secondary': '#121829',
        'cyan': '#00D9FF',
        'orange': '#FF6B35',
        'text-primary': '#FFFFFF',
        'text-secondary': '#AAAAAA',
        'border-dark': '#1F2937',
      },
      fontFamily: {
        display: ['var(--font-display, Syne)', 'sans-serif'],
        body: ['var(--font-body, Plus Jakarta Sans)', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        '8px': '8px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '18px' }],
        sm: ['14px', { lineHeight: '21px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '27px' }],
        xl: ['20px', { lineHeight: '30px' }],
        '2xl': ['24px', { lineHeight: '36px' }],
        '3xl': ['30px', { lineHeight: '42px' }],
        '4xl': ['36px', { lineHeight: '48px' }],
        '5xl': ['48px', { lineHeight: '54px' }],
        '6xl': ['60px', { lineHeight: '66px' }],
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'slide-down': 'slideDown 0.25s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
