import Link from 'next/link';

export default function ArtistSearchCard({ person }) {
  if (!person) return null;

  return (
    <div className="mb-10 w-full bg-zinc-900/30 p-5 rounded-3xl border border-zinc-800/50 relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* BAGIAN 1: PROFIL BULAT */}
        <Link 
          href={`/person/${person.id}`} 
          className="group flex flex-row md:flex-col items-center gap-4 md:min-w-[120px]"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-red-600 transition-all duration-300 shadow-xl bg-zinc-900 flex-shrink-0">
            <img 
              src={person.profile_path 
                ? `https://image.tmdb.org/t/p/w185${person.profile_path}` 
                : 'https://placehold.co/200x200?text=No+Image'} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt={person.name}
              loading="lazy"
            />
          </div>
          
          <div className="flex flex-col md:items-center">
            <p className="text-red-600 text-[8px] font-black uppercase tracking-[0.2em] mb-1">Artis Terkait</p>
            <h3 className="text-sm md:text-base font-black uppercase italic leading-tight tracking-tighter group-hover:text-red-600 transition-colors line-clamp-2 md:text-center">
              {person.name}
            </h3>
          </div>
        </Link>

        {/* BAGIAN 2: DAFTAR FILM */}
        <div className="flex-1 relative pb-10 md:pb-0">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3 px-1">
            Popular by: {person.name}
          </p>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {person.known_for?.slice(0, 6).map((item) => (
              <Link 
                key={item.id} 
                href={item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`}
                className="group/item relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700/50"
              >
                <img 
                  src={item.poster_path 
                    ? `https://image.tmdb.org/t/p/w154${item.poster_path}` 
                    : 'https://placehold.co/150x225?text=No+Poster'}
                  className="w-full h-full object-cover transition-transform group-hover/item:scale-110"
                  alt={item.title || item.name}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <p className="text-[8px] font-bold leading-tight text-white">
                    {item.title || item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* TOMBOL LIHAT SEMUA FILM */}
          <div className="absolute bottom-0 right-0 md:relative md:mt-4 md:flex md:justify-end">
            <Link 
              href={`/person/${person.id}`}
              className="bg-red-600 hover:bg-red-700 text-white text-[9px] font-black uppercase px-4 py-2 rounded-full transition-all shadow-lg flex items-center gap-2 group/btn"
            >
              Semua Film 
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
