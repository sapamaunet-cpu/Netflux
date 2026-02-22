import { getMovieDetail } from '../../../lib/tmdb';

export default async function Detail({ params }) {
  // Tunggu data detail film dari TMDB
  const movie = await getMovieDetail(params.id);

  // Jika film tidak ditemukan
  if (!movie || !movie.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Film tidak ditemukan atau terjadi kesalahan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Player Video */}
      <div className="w-full bg-zinc-900 aspect-video">
        <iframe 
          src={`https://vidsrc.ru/embed/movie/${movie.id}`} 
          className="w-full h-full border-0" 
          allowFullScreen 
          title={movie.title}
        />
      </div>

      {/* Informasi Film */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Kecil */}
          <div className="w-40 flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="rounded-lg shadow-lg border border-zinc-800"
            />
          </div>
          
          {/* Teks Detail */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex gap-4 text-sm text-zinc-400 mb-4 font-semibold">
              <span className="text-yellow-400">★ {movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>{movie.runtime} Menit</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg italic mb-4">
              "{movie.tagline}"
            </p>
            <h2 className="text-xl font-bold mb-2">Sinopsis</h2>
            <p className="text-zinc-400 leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
