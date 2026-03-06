"use client"
import { useState, Fragment } from 'react'; // Tambahkan Fragment
import MovieCard from './MovieCard'; // Gunakan MovieCard agar seragam
import AdBanner from './AdBanner'; // Import AdBanner

export default function MovieList({ initialData, endpoint, query, limit = 0 }) {
  const [movies, setMovies] = useState(initialData.results || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    
    let url = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&page=${nextPage}&language=id-ID`
      : `https://api.themoviedb.org/3${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${key}&page=${nextPage}&language=id-ID`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    setMovies((prev) => [...prev, ...data.results]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="p-4">
      {/* Grid disesuaikan agar sama dengan MovieCard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <Fragment key={movie.id}>
            {/* Tampilkan MovieCard */}
            <MovieCard movie={movie} />

            {/* Sisipkan Iklan setiap 10 film */}
            {(index + 1) % 10 === 0 && (
              <div className="group">
                <AdBanner />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {((limit > 0 && movies.length < limit) || (limit === 0 && page < initialData.total_pages)) && (
        <div className="flex justify-center mt-12">
          <button onClick={loadMore} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-3 rounded-full transition shadow-lg">
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
