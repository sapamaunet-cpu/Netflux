"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import AdBanner from './AdBanner';

export default function MovieList({ initialData, endpoint, query, title = "Rekomendasi Film" }) {
  const [movies, setMovies] = useState(initialData.results || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page < initialData.total_pages);
  
  // Ref untuk mendeteksi elemen terakhir (Infinite Scroll)
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Efek memuat data tambahan saat scroll mencapai bawah
  useEffect(() => {
    if (page === 1) return;
    
    const loadMoreMovies = async () => {
      setLoading(true);
      const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      
      let url = query 
        ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&page=${page}&language=id-ID`
        : `https://api.themoviedb.org/3${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${key}&page=${page}&language=id-ID`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        
        setMovies((prev) => [...prev, ...data.results]);
        setHasMore(page < data.total_pages);
      } catch (error) {
        console.error("Gagal memuat film:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreMovies();
  }, [page, endpoint, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header List */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1.5 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl font-black uppercase tracking-tighter italic">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => {
          const isLastElement = movies.length === index + 1;
          const itemNumber = index + 1;
          
          return (
            <div 
              key={`${movie.id}-${index}`} 
              ref={isLastElement ? lastMovieElementRef : null}
              className="flex flex-col"
            >
              <Link href={`/movie/${movie.id}`} className="group block h-full">
                <div className="relative aspect-[2/3] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg transition-transform hover:scale-105 hover:border-red-600/50">
                  <img 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
                    alt={movie.title} 
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                    <p className="font-bold text-sm truncate">{movie.title}</p>
                    <div className="flex justify-between items-center mt-1">
                       <span className="text-yellow-400 text-xs">★ {movie.vote_average?.toFixed(1)}</span>
                       <span className="text-zinc-400 text-[10px]">{movie.release_date?.split('-')[0]}</span>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* LOGIKA IKLAN: Muncul setiap 7 film (Selang-seling Banner & Native) */}
              {itemNumber % 7 === 0 && (
                <div className="mt-6 p-2 bg-zinc-900/30 rounded-lg border border-zinc-800/50 flex flex-col items-center">
                  <span className="text-[9px] text-zinc-600 mb-2 uppercase tracking-widest">Advertisement</span>
                  {Math.floor(itemNumber / 7) % 2 !== 0 ? (
                    <AdBanner type="banner" />
                  ) : (
                    <AdBanner type="native" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loading Spinner saat memuat halaman berikutnya */}
      {loading && (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-600 border-zinc-800"></div>
        </div>
      )}
    </div>
  );
}
