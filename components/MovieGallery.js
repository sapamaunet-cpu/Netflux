"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MovieGallery({ movie }) {
  const extraPosters = movie.images?.posters || [];
  const displayPosters = extraPosters.length > 0 
    ? extraPosters.slice(0, 15) 
    : [{ file_path: movie.poster_path }];

  return (
    <div className="mt-12 mb-10 overflow-hidden w-full">
      <div className="flex items-center gap-3 mb-6 px-4 max-w-6xl mx-auto">
        <div className="h-6 w-1.5 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white italic font-cinema">
          Galeri Poster
        </h3>
      </div>

      {/* Container Utama harus Full Width agar CenteredSlides punya ruang hitung */}
      <div className="w-full relative py-8">
        <Swiper
          modules={[Navigation, Pagination]}
          centeredSlides={true} 
          loop={displayPosters.length > 5}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          // KUNCI UTAMA: slidesPerView harus disesuaikan antara HP dan PC
          slidesPerView={1.5} 
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }, // Menampilkan 4 slide, yang aktif tetap di tengah
            1280: { slidesPerView: 5 }
          }}
          spaceBetween={30}
          className="gallery-swiper !overflow-visible"
        >
          {displayPosters.map((img, index) => (
            <SwiperSlide key={index} className="pb-10"> 
              {({ isActive }) => (
                <div className={`
                  relative aspect-[2/3] rounded-2xl overflow-hidden border transition-all duration-700 ease-in-out shadow-2xl
                  ${isActive 
                    ? 'border-red-600 scale-110 z-50 opacity-100 blur-0 shadow-red-600/20' 
                    : 'border-zinc-800 opacity-30 scale-90 blur-[1.5px]'} 
                `}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                    alt="Poster"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Menghilangkan potongan pada container */
        .gallery-swiper.swiper {
          overflow: visible !important;
          width: 100%;
          padding: 0 10%; /* Memberi ruang di samping agar slide tetangga terlihat */
        }
        
        .gallery-swiper .swiper-button-next, 
        .gallery-swiper .swiper-button-prev {
          color: white;
          background: rgba(220, 38, 38, 0.8);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          z-index: 100;
        }

        @media (max-width: 640px) {
          .gallery-swiper.swiper { padding: 0 5%; }
          .gallery-swiper .swiper-button-next, .gallery-swiper .swiper-button-prev { display: none; }
        }

        .gallery-swiper .swiper-pagination {
          bottom: -5px !important;
        }
      `}</style>
    </div>
  );
}
