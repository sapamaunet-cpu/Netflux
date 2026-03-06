// lib/tmdb.js
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetail = async (id) => {
  try {
    // Tambahkan 'similar' ke dalam append_to_response
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,recommendations,similar&language=id-ID`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) return null;
    let data = await res.json();

    // 1. Logika Fallback Sinopsis (yang sudah kita buat sebelumnya)
    if (!data.overview) {
      const fallbackRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        data.overview = fallbackData.overview;
      }
    }

    // 2. Logika Fallback Film Terkait
    // Jika recommendations kosong, gunakan data dari similar
    if (!data.recommendations?.results || data.recommendations.results.length === 0) {
      data.recommendations = data.similar; 
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
