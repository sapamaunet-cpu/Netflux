// lib/tmdb.js
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetail = async (id) => {
  try {
    // 1. Ambil data dengan prioritas Bahasa Indonesia
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,recommendations&language=id-ID`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) return null;
    const data = await res.json();

    // 2. LOGIKA FALLBACK: Jika sinopsis (overview) kosong, ambil versi Bahasa Inggris
    if (!data.overview || data.overview === "") {
      const fallbackUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const fallbackRes = await fetch(fallbackUrl);
      
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        data.overview = fallbackData.overview; // Timpa sinopsis yang kosong dengan versi Inggris
      }
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const getMovies = async (endpoint, page = 1) => {
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US&page=${page}`;
    
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { results: [] };
  }
};
