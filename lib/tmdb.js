// lib/tmdb.js
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieDetail = async (id) => {
  try {
    // 1. Tambahkan images dan include_image_language agar galeri foto muncul
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,recommendations,similar,images&language=id-ID&include_image_language=en,null`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) return null;
    let data = await res.json();

    // 2. LOGIKA FALLBACK SINOPSIS: Jika bahasa Indonesia kosong, ambil bahasa Inggris
    if (!data.overview || data.overview === "") {
      const fallbackRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        data.overview = fallbackData.overview;
      }
    }

    // 3. LOGIKA FALLBACK FILM TERKAIT: Jika rekomendasi kosong, gunakan film serupa (similar)
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
