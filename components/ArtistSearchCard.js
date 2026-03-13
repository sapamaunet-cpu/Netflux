import Link from 'next/link';

export default function ArtistSearchCard({ person }) {
  // Mengambil 1 film paling populer dari properti known_for sebagai sub-teks
  const topMovie = person.known_for?.[0]?.title || person.known_for?.[0]?.name;

  return (
    <Link 
      href={`/person/${person.id}`} 
      className="group flex-shrink-0 w-24 flex flex-col items-center transition-transform active:scale-95"
    >
      {/* Frame Foto Bulat */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-red-600 transition-all duration-300 shadow-xl bg-zinc-900">
        <img 
          src={person.profile_path 
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}` 
            : 'https://placehold.co/200x200?text=No+Image'} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={person.name}
          loading="lazy"
        />
        
        {/* Overlay halus saat hover (desktop) */}
        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Nama Artis */}
      <h3 className="text-[10px] font-black uppercase text-center mt-3 leading-tight line-clamp-2 tracking-tighter group-hover:text-red-600 transition-colors">
        {person.name}
      </h3>
      
      {/* Keterangan Film Terkenal */}
      {topMovie && (
        <p className="text-[8px] text-zinc-500 mt-1 truncate w-full text-center italic opacity-80">
          {topMovie}
        </p>
      )}
    </Link>
  );
}
