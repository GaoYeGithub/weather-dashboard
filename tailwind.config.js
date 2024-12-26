/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      backgroundImage: {
        'gradient-animation': 'linear-gradient(135deg, rgba(255,69,0,0.1), rgba(0,191,255,0.1), rgba(50,205,50,0.1), rgba(255,165,0,0.1), rgba(255,105,180,0.1))',
      },
    },
  },
  plugins: [],
}