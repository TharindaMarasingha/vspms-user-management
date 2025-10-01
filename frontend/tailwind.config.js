/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F5E7A',
          600: '#1F5E7A',
          700: '#1B526B',
          800: '#163F51'
        },
        accent: {
          DEFAULT: '#F28A30',
          600: '#E27F2C'
        },
        slate: '#2B2F36',
        coolgray: '#8C95A1',
        softgray: '#EEF1F4',
        success: '#2BB673',
        warning: '#FFB020',
        danger: '#E05353'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '1rem', // 16px
        'lg': '0.75rem' // 12px
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,0.08)',
        lift: '0 10px 30px rgba(0,0,0,0.12)'
      },
      transitionTimingFunction: {
        sprung: 'cubic-bezier(0.22,1,0.36,1)'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(8px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        microShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 160ms sprung both',
        slideUp: 'slideUp 180ms sprung both',
        microShake: 'microShake 180ms ease-in-out'
      }
    }
  },
  plugins: []
}

