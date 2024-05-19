module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // other Tailwind CSS options...
  theme:{
    extend: {
      colors: {
        700: "#93aecc",
        sidebar: {
          100: "#1f263e"
        },
        cardhover: {
          100: "#326cae"
        }
      }
    }
  }
};
