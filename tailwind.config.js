module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backdropFilter: ['hover', 'focus'],
    }
  },
}