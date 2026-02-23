import { getMoviesDetail } from '../../lib/tmdb';
import MovieList from '../../components/MovieList';

// Memaksa halaman agar tidak dirender statis (mencegah error build)
export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  // Pastikan searchParams ditunggu (awaited)
  const params = await searchParams;
  
  // Mengambil nilai 'q' (sesuaikan dengan SearchBar.js)
  const searchQuery = params?.q || "";

  // Jika kolom pencarian kosong
  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-500">Silakan masukkan judul film pada kolom pencarian.</p>
      </div>
    );
  }

  // Mengambil data dari TMDB
  const initialData = await getMoviesDetail(`/search/movie?query=${encodeURIComponent(searchQuery)}`, 1);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          Hasil Pencarian: <span className="text-red-600">"{searchQuery}"</span>
        </h1>
        
        {initialData?.results?.length > 0 ? (
          <MovieList initialData={initialData} endpoint={`/search/movie?query=${encodeURIComponent(searchQuery)}`} />
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">Maaf, film "{searchQuery}" tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
