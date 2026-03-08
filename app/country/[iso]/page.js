import { getMoviesByCountry, getCountryName } from '../../../lib/tmdb';
import MovieCard from '../../../components/MovieCard';
import Link from 'next/link';

export default async function CountryPage({ params }) {
  const { iso } = await params;
  
  // Mengambil data film berdasarkan kode negara ISO 3166-1
  const movies = await getMoviesByCountry(iso.toUpperCase());
  const countryName = getCountryName(iso.toUpperCase());

  if (!movies || movies.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4 font-jakarta">Data Tidak Ditemukan</h1>
          <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold">Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 font-jakarta">
      {/* HEADER NEGARA */}
      <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="text-zinc-500 hover:text-white transition-all text-sm">← Home</Link>
          <span className="text-zinc-800">|</span>
          <span className="text-red-600 font-bold uppercase tracking-widest text-[10px]">Asal Produksi</span>
        </div>
        
        <div className="flex items-center gap-4">
           <h1 className="text-5xl md:text-7xl font-cinema text-white uppercase italic tracking-tighter">
            Film {countryName}
          </h1>
        </div>
        <p className="text-zinc-500 mt-4 max-w-2xl leading-relaxed">
          Menampilkan daftar film terbaik yang diproduksi di {countryName}. Jelajahi sinematografi khas dari wilayah ini.
        </p>
      </div>

      {/* GRID DAFTAR FILM */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
