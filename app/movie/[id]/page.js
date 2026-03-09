import { getMovieDetail } from '../../../lib/tmdb';
import Link from 'next/link';
import MovieCard from '../../../components/MovieCard';
import AdBanner from '../../../components/AdBanner';
import MovieGallery from '../../../components/MovieGallery'; // Import komponen buatan kita tadi
import MoviePlayer from '../../../components/MoviePlayer';

// FUNGSI UNTUK GENERATE TITLE DINAMIS
export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  return {
    title: `${movie.title} (${movie.release_date?.split('-')[0]}) - BLOKMOVIE`,
    description: movie.overview,
  };
}

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
    // Default fallback
    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
    // Pilihan cerdas: 780 untuk HP, 1280 untuk layar lebar
    srcSet={`
      https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
      https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w
    `}
    sizes="(max-width: 1024px) 780px, 1280px"
    alt={movie.title}
    className="absolute inset-0 w-full h-full object-cover opacity-60"
    loading="eager" // Backdrop harus dimuat paling awal
    priority="true" // Jika menggunakan Next.js Image component
  />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter drop-shadow-2xl">{movie.title}</h1>
          {!isPlaying && (
            <Link href={`?play=true#player`} className="bg-red-600 px-8 py-4 rounded-full font-black">
              TONTON SEKARANG
            </Link>
          )}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1"> {/* Ini flex-1 utama */}
          {/* PLAYER */}
          {isPlaying && (
            <MoviePlayer movieId={movie.id} />
          )}

          {/* SINOPSIS & INFO */}
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-red-600 italic">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-400 mb-8">
            {/* Rating */}
            <span className="text-yellow-400 text-lg flex items-center gap-1">
              ★ {movie.vote_average?.toFixed(1)}
            </span>

            {/* Tahun Rilis */}
            <span className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700">
              {movie.release_date?.split('-')[0] || 'N/A'}
            </span>

            {/* Durasi */}
            <span className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700">
              {movie.runtime} Menit
            </span>

{/* Label Negara dengan Bendera */}
{movie.production_countries?.slice(0, 1).map((country) => (
  <Link 
    key={country.iso_3166_1}
    href={`/country/${country.iso_3166_1.toLowerCase()}`}
    className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded border border-zinc-700 hover:border-red-600 transition-all"
  >
    <img 
      src={`https://flagcdn.com/w40/${country.iso_3166_1.toLowerCase()}.png`}
      className="w-4 h-auto"
      alt="flag"
    />
    <span className="text-[11px] uppercase tracking-tighter text-zinc-300 font-bold">
      {country.iso_3166_1 === "US" ? "USA" : country.name}
    </span>
  </Link>
))}


            {/* Genre */}
            {movie.genres?.map(g => (
              <Link 
                key={g.id} 
                href={`/genre/${g.id}`} 
                className="bg-red-600/10 text-red-500 px-3 py-1 rounded border border-red-600/20 text-[10px] uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all"
              >
                {g.name}
              </Link>
            ))}
          </div>
              
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 italic">
            {movie.overview || "Sinopsis belum tersedia."}
          </p>

          {/* GALERI (Komponen Client) */}
          <MovieGallery movie={movie} />

        {/* IKLAN */}
    <div className="my-10">
           <AdBanner type="detail" />
    </div>
            {/* 4. PEMERAN UTAMA */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Pemeran Utama</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {movie.credits?.cast?.slice(0, 8).map((person) => (
                  <div key={person.id} className="w-24 flex-shrink-0 text-center">
                    <img 
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://placehold.co/200x200?text=No+Image'} 
                      className="w-24 h-24 object-cover rounded-full border-2 border-zinc-800 mb-2"
                      alt={person.name}
                    />
                    <p className="text-[10px] font-bold line-clamp-1">{person.name}</p>
                  </div>
                ))}
              </div>
            </div>

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
