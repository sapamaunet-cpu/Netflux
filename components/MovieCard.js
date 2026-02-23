// components/MovieCard.js
import Link from 'next/link';

export default function MovieCard({ movie }) {
  // Jika data movie tidak ada, jangan tampilkan apa-apa
  if (!movie) return null;

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 aspect-[2/3] transition-transform duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-red-600">
        
        {/* Poster Film */}
        <img
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://placehold.co/500x750?text=No+Poster'}
          alt={movie.title}
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-70"
          loading="lazy"
        />

        {/* Badge Rating di pojok kanan atas */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-2 py-1 rounded-md border border-zinc-700">
          ★ {movie.vote_average?.toFixed(1) || '0.0'}
        </div>

        {/* Overlay Informasi saat di-Hover (Opsional) */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-transparent to-transparent">
          <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider mb-1">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
          <h3 className="text-sm font-black text-white uppercase leading-tight line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </div>
      
      {/* Judul di bawah kartu (untuk tampilan mobile yang lebih jelas) */}
      <h3 className="mt-3 text-xs font-bold text-zinc-300 group-hover:text-red-500 transition-colors line-clamp-1 uppercase tracking-tighter">
        {movie.title}
      </h3>
    </Link>
  );
}
