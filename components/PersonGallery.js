"use client"
import { useState } from 'react';

export default function PersonGallery({ images }) {
  // Ambil maksimal 12 foto agar RAM 2GB tetap stabil
  const photos = images?.profiles?.slice(0, 12) || [];

  if (photos.length === 0) return null;

  return (
    <div className="mt-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-1 bg-red-600 rounded-full"></div>
        <h2 className="text-lg font-bold uppercase tracking-wider">Galeri Foto</h2>
      </div>

      {/* Grid Foto yang responsif */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="group relative aspect-[2/3] bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 transition-all hover:border-red-600/50"
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${photo.file_path}`}
              alt={`Gallery ${index}`}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
