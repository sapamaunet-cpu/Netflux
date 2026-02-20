"use client"
import { useState } from 'react';
import Link from 'next/link';

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="group transition-transform hover:scale-105">
            <div className="relative aspect-[2/3] bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-lg">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
                alt={movie.title} className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                <p className="font-bold text-sm truncate">{movie.title}</p>
                <div className="flex justify-between items-center mt-1">
                   <span className="text-yellow-400 text-xs">★ {movie.vote_average.toFixed(1)}</span>
                   <span className="text-zinc-400 text-[10px]">{movie.release_date?.split('-')[0]}</span>
                </div>
              </div>
            </div>
          </Link>
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
