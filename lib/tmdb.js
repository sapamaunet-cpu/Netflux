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

// Tambahkan fungsi ini di lib/tmdb.js

export const getCountryName = (iso) => {
  const code = iso?.toUpperCase();
  const list = {
    // ASIA & PASIFIK
    'ID': 'Indonesia',
    'KR': 'Korea Selatan',
    'JP': 'Jepang',
    'TH': 'Thailand',
    'CN': 'Tiongkok',
    'HK': 'Hong Kong',
    'TW': 'Taiwan',
    'IN': 'India',
    'MY': 'Malaysia',
    'PH': 'Filipina',
    'VN': 'Vietnam',
    'SG': 'Singapura',
    'AU': 'Australia',
    'NZ': 'Selandia Baru',
    'PK': 'Pakistan',

    // AMERIKA
    'US': 'Amerika Serikat',
    'CA': 'Kanada',
    'BR': 'Brasil',
    'MX': 'Meksiko',
    'AR': 'Argentina',
    'CO': 'Kolombia',
    'CL': 'Chili',
    'PE': 'Peru',

    // EROPA
    'GB': 'Inggris',
    'FR': 'Prancis',
    'DE': 'Jerman',
    'IT': 'Italia',
    'ES': 'Spanyol',
    'RU': 'Rusia',
    'NL': 'Belanda',
    'TR': 'Turki',
    'SE': 'Swedia',
    'NO': 'Norwegia',
    'DK': 'Denmark',
    'FI': 'Finlandia',
    'PL': 'Polandia',
    'BE': 'Belgia',
    'CH': 'Swiss',
    'IE': 'Irlandia',
    'UA': 'Ukraina',
    'GR': 'Yunani',
    'PT': 'Portugal',

    // TIMUR TENGAH & AFRIKA
    'SA': 'Arab Saudi',
    'AE': 'Uni Emirat Arab',
    'IR': 'Iran',
    'IL': 'Israel',
    'EG': 'Mesir',
    'ZA': 'Afrika Selatan',
    'NG': 'Nigeria',
    'MA': 'Maroko',
  };

  // Jika kode ISO tidak terdaftar, tampilkan kodenya saja agar tidak kosong
  return list[code] || code;
};

export const getMoviesAdult = async (endpoint, page = 1) => {
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}${separator}${endpoint}${separator}page=${page}`;
    
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { results: [] };
  }
};
