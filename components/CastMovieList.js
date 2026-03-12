"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function CastMoviesList({ allMovies, title = "Filmografi" }) {
  // Urutkan dari yang terbaru & ambil 15 film pertama agar RAM 2GB tetap stabil
  const sortedMovies = [...allMovies]
    .filter(m => m.release_date)
    .sort((a, b) => b.release_date.localeCompare(a.release_date));
    
  const [displayLimit, setDisplayLimit] = useState(15);
  const moviesToShow = sortedMovies.slice(0, displayLimit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1.5 bg-red-600 rounded-full"></div>
        <h2 className="text-2xl font-black uppercase tracking-tighter italic">
          {title}
        </h2>
      </div>

      {/* Grid Film */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {moviesToShow.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="flex flex-col">
            <Link href={`/movie/${movie.id}`} className="group block h-full">
              <div className="relative aspect-[2/3] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg transition-transform hover:scale-105 hover:border-red-600/50">
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
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
          </div>
        ))}
      </div>

      {/* Tombol Load More Manual (Lebih hemat RAM daripada auto-scroll untuk daftar panjang) */}
      {displayLimit < sortedMovies.length && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setDisplayLimit(prev => prev + 15)}
            className="bg-zinc-900 hover:bg-red-600 text-white text-xs font-bold px-8 py-3 rounded-full border border-zinc-800 transition-all uppercase tracking-widest"
          >
            Lihat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}
