import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['12px', '12px'],
        sm: ['14px', '20px'],
        base: ['16px', '20px'],
        lg: ['20px', '24px'],
        xl: ['24px', '24px'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'bg2': "url('/public/bg2.jpg')",
          'bg3': "url('/public/bg3.jpg')",

      },
      colors: {
        'dark-gray': '#6c6c6c',
        'gray': '#d9d9d9',
      },
      borderRadius: {
        "3xl":"40px",
      },

    },
  },
  plugins: [],
}
export default config
