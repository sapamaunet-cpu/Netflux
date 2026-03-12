import { getPersonDetails, getPersonMovies, getPersonImages } from '../../../lib/tmdb';
import PersonDetail from '../../../components/PersonDetail';
import PersonGallery from '../../../components/PersonGallery';
import CastMoviesList from '../../../components/CastMoviesList';
import MovieGallery from '../../../components/MovieGallery'; 

export default async function PersonPage({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

  // Mengambil semua data secara paralel agar loading lebih cepat di RAM 2GB
  const [person, moviesData, imagesData] = await Promise.all([
    getPersonDetails(id),
    getPersonMovies(id),
    getPersonImages(id)
  ]);

  return (
    <main className="relative min-h-screen bg-black text-white pb-20">
      
      {/* 1. BACKGROUND LAYER (Profile Path sebagai Latar) */}
      <div className="absolute top-0 left-0 w-full h-[550px] overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center opacity-30 scale-110 blur-2xl"
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/h632${person.profile_path})` 
          }}
        />
        {/* Gradient agar menyatu dengan background hitam di bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12">
        
        {/* Header: Foto Profil & Nama */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-48 h-72 md:w-64 md:h-96 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-900">
            <img 
              src={person.profile_path 
                ? `https://image.tmdb.org/t/p/h632${person.profile_path}` 
                : 'https://placehold.co/600x900?text=No+Photo'} 
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left pt-4">
             <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-red-600 leading-none mb-4">
               {person.name}
             </h1>
             
             {/* Info: Also Known As, Negara, Biografi */}
             <PersonDetail person={person} />
          </div>
        </div>

        {/* 3. GALERI FOTO (Jika ada) */}
        {imagesData.profiles?.length > 0 && (
        <div className="mt-12">
               <PersonGallery images={imagesData} /> 
          </div> 
        )}

        {/* 4. LIST FILM (CastMoviesList) */}
        <div className="mt-8">
          <CastMoviesList 
            allMovies={moviesData.cast} 
            title={`Filmografi ${person.name}`} 
          />
        </div>

      </div>
    </main>
  );
}
