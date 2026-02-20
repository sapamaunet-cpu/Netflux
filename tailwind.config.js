/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // Tambahkan ini jika ada style di lib
  ],
  theme: {
    extend: {
      colors: {
        // Anda bisa menambah warna custom netflix di sini jika mau
        brand: '#E50914',
      },
    },
  },
  plugins: [],
}

