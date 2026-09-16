module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        wine: '#190907',
        burgundy: '#550d14',
        burgundySoft: '#8d1b28',
        gold: '#caa66a',
        ivory: '#f6efdf',
        olive: '#1f4334',
        ember: '#d9522a'
      },
      boxShadow: {
        premium: '0 24px 80px rgba(15,8,7,0.45)'
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica Neue', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
