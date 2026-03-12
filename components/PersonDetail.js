export default function PersonDetail({ person }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Kolom Kiri: Info Dasar */}
        <div className="space-y-4">
          <div>
            <h3 className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Nama Panggung</h3>
            <p className="text-zinc-100 font-bold">{person.name}</p>
          </div>

          {person.also_known_as?.length > 0 && (
            <div>
              <h3 className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Nama Lain</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {person.also_known_as.slice(0, 3).join(', ')}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Asal Negara</h3>
            <p className="text-zinc-100 text-sm font-medium">
              {person.place_of_birth || 'Informasi tidak tersedia'}
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Biografi */}
        <div>
          <h3 className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Biografi</h3>
          <p className="text-zinc-300 text-xs leading-relaxed line-clamp-6 md:line-clamp-none">
            {person.biography || `Saat ini belum ada biografi singkat untuk ${person.name}.`}
          </p>
        </div>

      </div>
    </div>
  );
            }
