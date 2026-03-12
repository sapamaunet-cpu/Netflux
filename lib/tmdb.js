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
    if (!data.similar?.results || data.similar.results.length === 0) {
      data.similar = data.recommendations;
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};


export const getMovies = async (endpoint, page = 1) => {
  
  const today = new Date().toISOString().split('T')[0];

  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&page=${page}`;
    
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
export async function getPersonImages(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`
  );
  return res.json();
}

// Mengambil daftar film yang dibintangi oleh aktor tertentu
export async function getPersonMovies(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } } // Cache 1 jam untuk menghemat load server & RAM laptop Anda
  );
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data filmografi aktor');
  }

  return res.json();
}
