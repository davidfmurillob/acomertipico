/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {    
      backgroundImage: {
        'foodBg': "url('../public/images/food-background.jpg')",
        'foodBg-mobile': "url('../public/images/food-background-mobile.jpg')",
        'phoneBg': "url('../public/images/mobile_phone.png')"
      },
    extend: {
      'fontFamily': {
      'poppins': ['Poppins', 'sans-serif'] 
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
    }, 
    },
  },
  plugins: [],
}
