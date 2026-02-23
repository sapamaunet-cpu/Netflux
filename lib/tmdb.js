// lib/tmdb.js
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// FUNGSI 1: Untuk Detail Satu Film (Sudah ada di file Anda)
export const getMovieDetail = async (id) => {
  try {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,recommendations&language=id-ID`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

// FUNGSI 2: Tambahkan Ini! Untuk Pencarian & Daftar Film (MovieList)
export const getMovies = async (endpoint, page = 1) => {
  try {
    // Mengecek apakah endpoint sudah punya query string (?) atau belum
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=id-ID&page=${page}`;
    
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { results: [] };
  }
};


