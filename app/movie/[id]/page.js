import { getMovieDetail } from '../../../lib/tmdb';
import Link from 'next/link';
import MovieCard from '../../../components/MovieCard';
import AdBanner from '../../../components/AdBanner';
import MovieGallery from '../../../components/MovieGallery'; // Import komponen buatan kita tadi

export default async function MoviePage({ params, searchParams }) {
  const { id } = await params;
  const sParams = await searchParams; // Next.js 15 wajib await searchParams
  const isPlaying = sParams.play === 'true';
  const movie = await getMovieDetail(id);

  if (!movie) return <p>Film tidak ditemukan</p>;

  const relatedMovies = movie.recommendations?.results?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* HERO SECTION */}
      <div className="relative w-full h-[50vh] bg-zinc-900 overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Backdrop"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-black mb-6 uppercase text-center">{movie.title}</h1>
          {!isPlaying && (
            <Link href={`?play=true#player`} className="bg-red-600 px-8 py-4 rounded-full font-black">
              TONTON SEKARANG
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          {/* PLAYER */}
          {isPlaying && (
            <div id="player" className="mb-10">
              <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <iframe src={`https://vidsrc.me/embed/movie?tmdb=${movie.id}`} className="w-full h-full" allowFullScreen />
              </div>
            </div>
          )}

          {/* SINOPSIS & GENRE */}
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map(g => (
              <Link key={g.id} href={`/genre/${g.id}`} className="bg-zinc-800 px-3 py-1 rounded text-xs uppercase">
                {g.name}
              </Link>
            ))}
          </div>
          <p className="text-zinc-400 mb-10">{movie.overview}</p>

          {/* GALERI (Komponen Client) */}
          <MovieGallery movie={movie} />

          {/* IKLAN BANNER */}
          <AdBanner type="detail" />
            
          {/* FILM TERKAIT */}
          <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Film Terkait</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {relatedMovies.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
