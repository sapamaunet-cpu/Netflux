"use client"
import { getMovieDetail } from '../../../lib/tmdb'; //
import Link from 'next/link';
import MovieCard from '../../../components/MovieCard'; //
import AdBanner from '../../../components/AdBanner';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default async function MoviePage({ params, searchParams }) {
  const { id } = await params;
  const { play } = await searchParams; // Mengambil parameter ?play=true dari URL
  const movie = await getMovieDetail(id); //

  if (!movie || !movie.id) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Gagal Memuat Film</h1>
          <Link href="/" className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-full font-bold">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  const isPlaying = play === 'true';
  const relatedMovies = movie.recommendations?.results?.slice(0, 5) || []; //

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-zinc-900 overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="max-w-3xl text-center">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-[0.4em] mb-4">Nonton Film Online</h2>
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
              {movie.title}
            </h1>
            
            {/* Tombol ini akan menambah ?play=true ke URL tanpa refresh manual */}
            {!isPlaying && (
              <Link 
                href={`?play=true#player`} 
                scroll={true}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black text-lg transition transform hover:scale-105"
              >
                <span className="text-2xl">▶</span> TONTON SEKARANG
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row gap-10">

export default function MovieGallery({ movie }) {
  // Ambil data poster tambahan
  const extraPosters = movie.images?.posters || [];
  
  // Jika tidak ada galeri tambahan, gunakan poster utama sebagai satu-satunya slide
  const displayPosters = extraPosters.length > 0 
    ? extraPosters.slice(0, 12) 
    : [{ file_path: movie.poster_path }];

  // Jika poster utama pun tidak ada (kasus langka), jangan tampilkan apa-apa
  if (!movie.poster_path && extraPosters.length === 0) return null;

  return (
    <div className="mt-10 px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-1 bg-red-600"></div>
        <h3 className="text-md font-bold uppercase italic tracking-wider text-zinc-100">
          {extraPosters.length > 0 ? 'Galeri Poster' : 'Poster Film'}
        </h3>
      </div>

      <Swiper
        slidesPerView={extraPosters.length > 0 ? 2.5 : 1} // Jika cuma 1 poster, buat full width
        centeredSlides={extraPosters.length === 0} // Tengah jika cuma 1
        spaceBetween={12}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="pb-8"
      >
        {displayPosters.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={`rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 ${extraPosters.length === 0 ? 'max-w-[280px] mx-auto' : ''}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Iklan Banner Detail 728x90 */}
      <div className="mt-2">
        <AdBanner type="detail" />
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #3f3f46; opacity: 1; }
        .swiper-pagination-bullet-active { background: #dc2626; width: 20px; border-radius: 4px; }
      `}</style>
    </div>
  );
}

          {/* 3. INFORMASI & SINOPSIS */}
<div className="flex-1">
  <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-red-600 italic">
    {movie.title}
  </h1>
  
  <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-zinc-400 mb-8">
    {/* Rating */}
    <span className="text-yellow-400 text-lg flex items-center gap-1">
      ★ {movie.vote_average?.toFixed(1)}
    </span>

    {/* Tahun Rilis */}
    <span className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700">
      {movie.release_date?.split('-')[0] || 'N/A'}
    </span>

    {/* Durasi */}
    <span className="bg-zinc-800 px-3 py-1 rounded border border-zinc-700">
      {movie.runtime} Menit
    </span>

    {/* Daftar Genre sebagai Link */}
<div className="flex flex-wrap gap-2">
  {movie.genres?.map((genre) => (
    <Link 
      key={genre.id} 
      href={`/genre/${genre.id}`} // Mengarahkan ke halaman genre berdasarkan ID
      className="bg-red-600/10 text-red-500 px-3 py-1 rounded border border-red-600/20 text-[10px] uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors duration-300"
    >
      {genre.name}
    </Link>
  ))}
</div>
  </div>

  <div className="mb-10">
    <h2 className="text-xl font-bold mb-3 border-l-4 border-red-600 pl-3">Sinopsis</h2>
    <p className="text-zinc-400 text-lg leading-relaxed italic mb-6">
      {movie.overview || "Sinopsis belum tersedia untuk film ini."}
    </p>
               
            </div>

            {/* 4. PLAYER VIDEO (Hanya muncul jika URL memiliki ?play=true) */}
            {isPlaying && (
              <div id="player" className="scroll-mt-24 mb-16">
                 <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Streaming Player</h2>
                 <div className="w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <iframe 
                      src={`https://vidsrc.me/embed/movie?tmdb=${movie.id}`} 
                      className="w-full h-full" 
                      allowFullScreen 
                  />
                 </div>
              </div>
            )}

            {/* 5. PEMERAN UTAMA */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Pemeran Utama</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {movie.credits?.cast?.slice(0, 8).map((person) => (
                  <div key={person.id} className="w-24 flex-shrink-0 text-center">
                    <img 
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://placehold.co/200x200?text=No+Image'} 
                      className="w-24 h-24 object-cover rounded-full border-2 border-zinc-800 mb-2"
                      alt={person.name}
                    />
                    <p className="text-[10px] font-bold line-clamp-1">{person.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. FILM TERKAIT */}
            {relatedMovies.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5 border-l-4 border-red-600 pl-3">Film Terkait</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedMovies.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
