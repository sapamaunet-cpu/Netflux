import { getMovies, getCountryName } from '../../../lib/tmdb';
import MovieList from '../../../components/MovieList';

export default async function CountryPage({ params }) {
  // Ambil kode negara (misal: 'id', 'us', 'kr') dari URL
  const { iso } = await params;
  const countryCode = iso.toUpperCase();
  
  // Ambil nama lengkap negara untuk judul (Indonesia, USA, dll)
  const countryName = getCountryName(countryCode);
  
  // Endpoint discover untuk memfilter berdasarkan Origin Country
  const endpoint = `/discover/movie?with_origin_country=${countryCode}`;
  const initialData = await getMovies(endpoint, 1);

  return (
    <div className="max-w-7xl mx-auto py-8 font-jakarta">
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-2 bg-red-600 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-widest text-white italic font-cinema">
              Film {countryName}
            </h1>
            <p className="text-zinc-500 text-sm">
              Koleksi sinematografi terbaik dari {countryName}
            </p>
          </div>
        </div>
      </div>

      {initialData.results?.length > 0 ? (
        <MovieList 
          initialData={initialData} 
          endpoint={endpoint} 
          limit={0} // Akan memuat data sesuai pagination TMDB
        />
      ) : (
        <div className="text-center py-20 text-zinc-500">
          <p className="italic">Data tidak ditemukan untuk negara ini.</p>
        </div>
      )}
    </div>
  );
}
