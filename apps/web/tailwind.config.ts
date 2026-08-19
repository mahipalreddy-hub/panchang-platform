import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          bg: '#0B0F19',
          card: '#121827',
          cardHover: '#182136',
          border: 'rgba(217, 119, 6, 0.2)',
          gold: '#E5A93C',
          goldLight: '#FBD38D',
          saffron: '#D97706',
          saffronGlow: 'rgba(217, 119, 6, 0.15)',
          vermilion: '#B91C1C',
          maroon: '#500724',
          sand: '#F7E7CE',
          auspicious: '#10B981',
          inauspicious: '#EF4444',
          neutral: '#F59E0B'
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif']
      },
      backgroundImage: {
        'mandala-glow': 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.12) 0%, rgba(11, 15, 25, 0) 70%)',
        'sacred-gradient': 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 50%, #170B1D 100%)',
        'gold-sheen': 'linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #D97706 100%)'
      }
    }
  },
  plugins: []
};

export default config;