const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (endpoint, page = 1, query = '') => {
  const url = query 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=id-ID`
    : `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&page=${page}&language=id-ID`;
  
  const res = await fetch(url, { next: { revalidate: 3600 } });
  return res.json();
};

export const getMovieDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,similar&language=id-ID`, { next: { revalidate: 3600 } });
  return res.json();
};
