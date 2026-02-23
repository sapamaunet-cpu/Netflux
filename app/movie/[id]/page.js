import { getMovieDetail } from '../../../lib/tmdb';
import Link from 'next/link';

export default async function Detail({ params }) {
  const movie = await getMovieDetail(params.id);

  if (!movie || !movie.id) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Player */}
      <div className="aspect-video w-full bg-zinc-900">
        <iframe 
          src={`https://vidsrc.ru/embed/movie/${movie.id}`} 
          className="w-full h-full" allowFullScreen 
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-zinc-400 mt-4 italic">{movie.overview}</p>

        {/* --- BAGIAN PEMERAN UTAMA --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">Pemeran Utama</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {movie.credits?.cast?.slice(0, 10).map((actor) => (
              <div key={actor.id} className="w-32 flex-shrink-0 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-800 mb-2">
                  <img 
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://placehold.co/200x200?text=No+Photo'} 
                    className="w-full h-full object-cover"
                    alt={actor.name}
                  />
                </div>
                <p className="text-sm font-semibold line-clamp-1">{actor.name}</p>
                <p className="text-xs text-zinc-500 line-clamp-1">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- BAGIAN FILM TERKAIT --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">Film Terkait</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {movie.recommendations?.results?.slice(0, 5).map((rec) => (
              <Link href={`/movie/${rec.id}`} key={rec.id} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img 
                    src={`https://image.tmdb.org/t/p/w342${rec.poster_path}`} 
                    className="object-cover w-full h-full group-hover:scale-110 transition"
                    alt={rec.title}
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">{rec.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
