import { getMovieDetail } from '../../../lib/tmdb';
import Link from 'next/link';

export default async function MoviePage({ params }) {
  // Ambil ID dari params
  const { id } = params;
  const movie = await getMovieDetail(id);

  // Jika data gagal diambil, tampilkan pesan error yang jelas
  if (!movie || !movie.id) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Gagal Memuat Film</h1>
          <p className="text-zinc-400">Pastikan API Key sudah benar di Vercel Settings.</p>
          <Link href="/" className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-full font-bold">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* 1. PLAYER VIDEO (STREAMING) */}
      <div className="w-full aspect-video bg-zinc-900 shadow-2xl">
        <iframe 
          src={`https://vidsrc.me/embed/movie?tmdb=${movie.id}`} 
          className="w-full h-full" 
          allowFullScreen 
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* 2. POSTER */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
                alt={movie.title}
                className="rounded-2xl shadow-2xl border border-zinc-800 w-full"
              />
            </div>
          </div>

          {/* 3. INFORMASI & SINOPSIS */}
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-red-600">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-bold text-zinc-400 mb-8">
              <span className="text-yellow-400 text-lg">★ {movie.vote_average?.toFixed(1)}</span>
              <span className="bg-zinc-800 px-3 py-1 rounded">{movie.release_date?.split('-')[0]}</span>
              <span className="bg-zinc-800 px-3 py-1 rounded">{movie.runtime} Menit</span>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold mb-3 border-l-4 border-red-600 pl-3">Sinopsis</h2>
              <p className="text-zinc-400 text-lg leading-relaxed italic">
                {movie.overview || "Sinopsis belum tersedia untuk film ini."}
              </p>
            </div>

            {/* 4. PEMERAN UTAMA (CAST) */}
            <div>
              <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Pemeran</h2>
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

          </div>
        </div>
      </div>
    </div>
  );
}
