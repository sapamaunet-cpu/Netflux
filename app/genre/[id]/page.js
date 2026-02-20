import { getMovies } from '../../../lib/tmdb';
import MovieList from '../../../components/MovieList';

export default async function GenrePage({ params, searchParams }) {
  const genreId = params.id;
  const genreName = searchParams.name || 'Kategori';
  
  // Endpoint discover untuk memfilter berdasarkan genre ID
  const endpoint = `/discover/movie?with_genres=${genreId}`;
  const initialData = await getMovies(endpoint, 1);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-2 bg-red-600 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-widest">{genreName}</h1>
            <p className="text-zinc-500 text-sm">Eksplorasi film-film terbaik di genre ini</p>
          </div>
        </div>
      </div>

      {initialData.results?.length > 0 ? (
        <MovieList 
          initialData={initialData} 
          endpoint={endpoint} 
          limit={0} // Sesuai permintaan: dibatasi hanya oleh total data TMDB
        />
      ) : (
        <p className="text-center py-20 text-zinc-500">Tidak ada data untuk genre ini.</p>
      )}
    </div>
  );
}
