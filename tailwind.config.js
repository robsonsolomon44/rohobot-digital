/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#05070B',
          pure: '#000000',
          surface: '#0A0D14',
          card: '#10141E',
          hover: '#161B28',
          border: 'rgba(212, 175, 55, 0.16)',
          borderHover: 'rgba(212, 175, 55, 0.45)',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF9E7',
          200: '#FDEFC3',
          300: '#FBE39F',
          400: '#F5D061',
          500: '#D4AF37', // Pure Metallic Gold
          600: '#B8860B', // Dark Goldenrod
          700: '#8A6508',
          800: '#5C4305',
          DEFAULT: '#D4AF37',
          amber: '#F59E0B',
          light: '#FCE7A4',
          dark: '#AA771C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        wideGold: '0.15em',
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.35)',
        'glow-gold-subtle': '0 0 20px 0px rgba(212, 175, 55, 0.18)',
        'glow-gold-lg': '0 0 60px -10px rgba(212, 175, 55, 0.45)',
        'card-elevated': '0 12px 35px -10px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-gold': 'pulseGold 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
