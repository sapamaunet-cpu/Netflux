import { getMovieDetail } from '../../lib/tmdb';
import MovieList from '../../components/MovieList';

export default async function SearchPage({ searchParams }) {
  // Mengambil kata kunci dari URL (?q=nama-film)
  const query = searchParams.q || '';
  
  // Memulai fetch data dari TMDB untuk halaman pertama
  const initialData = await getMovieDetail('', 1, query);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="px-4 mb-8">
        <h1 className="text-zinc-400 text-lg">
          Hasil pencarian untuk: <span className="text-white font-bold text-2xl italic">"{query}"</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Ditemukan sekitar {initialData.total_results?.toLocaleString()} film
        </p>
      </div>

      {initialData.results?.length > 0 ? (
        <MovieList 
          initialData={initialData} 
          query={query} 
          limit={0} // 0 berarti tidak dibatasi (mengikuti total data TMDB)
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">🔍</span>
          <p className="text-zinc-500 text-xl">Maaf, film yang Anda cari tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}
