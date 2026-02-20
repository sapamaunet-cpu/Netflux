import { getMovieDetail } from '../../../../lib/tmdb';
import Link from 'next/link';

export default async function Detail({ params }) {
  const movie = await getMovieDetail(params.id);

  return (
    <div className="min-h-screen">
      <div className="w-full aspect-video bg-zinc-900 shadow-2xl">
        <iframe 
          src={`https://vidsrc.ru/embed/movie/${movie.id}`} 
          className="w-full h-full" allowFullScreen 
        />
      </div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-10 mt-10">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded-2xl shadow-xl border border-zinc-800" />
        
        <div className="md:col-span-2">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex gap-4 text-zinc-400 mb-6 font-medium">
            <span className="text-yellow-500">★ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
            <span className="px-2 border border-zinc-700 rounded text-xs uppercase flex items-center">TMDB ID: {movie.id}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Sinopsis</h3>
          <p className="text-zinc-300 leading-relaxed text-lg mb-8">{movie.overview}</p>

          <h3 className="text-xl font-bold mb-4">Pemeran Utama</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {movie.credits.cast.slice(0, 8).map(c => (
              <span key={c.id} className="bg-zinc-800 px-4 py-2 rounded-lg text-sm">{c.name}</span>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-6 italic text-red-600 tracking-widest uppercase">Film Terkait</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {movie.similar.results.slice(0, 4).map(m => (
              <Link href={`/movie/${m.id}`} key={m.id} className="block group">
                <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className="rounded-lg group-hover:opacity-50 transition" />
                <p className="text-xs mt-2 truncate font-medium">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

