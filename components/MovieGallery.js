"use client" // Khusus untuk Swiper (Client Side)
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function MovieGallery({ movie }) {
  const extraPosters = movie.images?.posters || [];
  const displayPosters = extraPosters.length > 0 
    ? extraPosters.slice(0, 12) 
    : [{ file_path: movie.poster_path }];

  if (!movie.poster_path && extraPosters.length === 0) return null;

  return (
    <div className="mt-10 mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-1 bg-red-600"></div>
        <h3 className="text-md font-bold uppercase italic tracking-wider text-zinc-100">
          {extraPosters.length > 0 ? 'Galeri Poster' : 'Poster Film'}
        </h3>
      </div>
      <Swiper
        slidesPerView={extraPosters.length > 0 ? 2.5 : 1}
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
                alt="Poster"
                className="w-full h-auto object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet { background: #3f3f46; opacity: 1; }
        .swiper-pagination-bullet-active { background: #dc2626; width: 20px; border-radius: 4px; }
      `}</style>
    </div>
  );
}
