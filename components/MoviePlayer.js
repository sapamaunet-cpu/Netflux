"use client"
import { useState } from 'react';

export default function MoviePlayer({ movieId }) {
  // Daftar provider alternatif yang mendukung TMDB ID
  const servers = [
    { name: 'Server 1', provider: '2Embed', url: `https://www.2embed.cc/embed/${movieId}` },
    { name: 'Server 2', provider: 'Vidsrc.me', url: `https://vidsrc-embed.ru/embed/movie/${movieId}` },
    { name: 'Server 3', provider: 'VSembed', url: `https://vsembed.ru/embed/movie/${movieId}` },
    { name: 'Server 4', provider: 'AutoEmbed', url: `https://player.autoembed.cc/embed/movie/${movieId}` }
  ];

  const [activeServer, setActiveServer] = useState(servers[0]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      {/* FRAME PLAYER */}
      <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
        <iframe
          src={activeServer.url}
          className="w-full h-full"
          allowFullScreen
          >
          </iframe>
      </div>

      {/* TOMBOL GANTI SERVER */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-1.5 h-4 bg-red-600 rounded-full"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Pilih Server</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setActiveServer(server)}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center gap-1
                ${activeServer.name === server.name 
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
            >
              <span className="text-[10px] opacity-60 uppercase">{server.name}</span>
              <span className="font-cinema italic tracking-tighter">{server.provider}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* INFO TAMBAHAN */}
      <p className="mt-4 text-[10px] text-zinc-600 italic px-2">
        * Jika video tidak muncul atau error, silakan coba pindah ke server lain.
      </p>
    </div>
  );
}
