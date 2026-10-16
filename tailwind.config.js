/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06130c',
          900: '#0c2217',
          850: '#102d1f',
          800: '#173c2a',
          700: '#23533c',
          600: '#327253',
          500: '#46916c',
        },
        ivory: {
          50: '#faf8f4',
          100: '#f4efe5',
          200: '#eae1ce',
          300: '#dcceb1',
          400: '#c5b18b',
          900: '#1f1b16',
        },
        sage: {
          50: '#f5f7f4',
          100: '#e5ebe2',
          200: '#cad9c4',
          300: '#a7bfa0',
          400: '#84a27b',
          500: '#64835b',
          600: '#4d6945',
          700: '#3c5236',
        },
        gold: {
          200: '#f4e5bf',
          300: '#ebd196',
          400: '#dfba73',
          500: '#c5a059',
          600: '#a6803b',
          700: '#7e5e26',
        },
        terracotta: {
          500: '#b85d39',
          600: '#9b4725',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        mist: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        mist: 'mist 25s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
