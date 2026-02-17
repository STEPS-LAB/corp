/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0E0E11',
        'bg-light': '#F5F6F8',
        'text-dark': '#0E0E11',
        'text-light': '#F5F6F8',
        'accent': '#3A5BFF',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        'gutter': '64px',
        'section-spacing': '120px',
        '30': '120px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
        'charFadeIn': 'charFadeIn 0.6s ease forwards',
        'fadeIn': 'fadeIn 0.6s ease forwards',
        'lineMove': 'lineMove 20s linear infinite',
        'floatGradient': 'floatGradient 25s ease-in-out infinite',
        'floatCircle': 'floatCircle 20s ease-in-out infinite',
        'pulseDot': 'pulseDot 3s ease-in-out infinite',
        'scrollWheel': 'scrollWheel 2s ease-in-out infinite',
        'scrollArrow': 'scrollArrow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        charFadeIn: {
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          to: {
            opacity: '0.5',
          },
        },
        lineMove: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        floatGradient: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
        },
        floatCircle: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -20px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 30px) rotate(240deg)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.3)' },
        },
        scrollWheel: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scrollArrow: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

