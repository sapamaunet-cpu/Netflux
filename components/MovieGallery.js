"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MovieGallery({ movie }) {
  const extraPosters = movie.images?.posters || [];
  
  const displayPosters = extraPosters.length > 0 
    ? extraPosters.slice(0, 15) 
    : [{ file_path: movie.poster_path }];

  return (
    <div className="mt-12 mb-10 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="h-6 w-1.5 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white italic font-cinema">
          Galeri Poster
        </h3>
      </div>

      <div className="relative py-4 px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          centeredSlides={true} // WAJIB: Mengunci slide aktif di tengah layar
          loop={displayPosters.length > 3}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          slidesPerView={'auto'} // Biarkan ukuran slide ditentukan oleh CSS (style={{width: ...}})
          spaceBetween={20}
          className="gallery-swiper !overflow-visible"
        >
          {displayPosters.map((img, index) => (
            <SwiperSlide 
              key={index} 
              // Di HP: Lebar hampir full. Di PC: Lebar tetap (fixed) agar tidak lari.
              style={{ width: '280px' }} 
              className="max-sm:!w-[75%]"
            > 
              {({ isActive }) => (
                <div className={`
                  relative aspect-[2/3] rounded-2xl overflow-hidden border transition-all duration-500 shadow-2xl
                  ${isActive 
                    ? 'border-red-600 scale-105 z-10' // Slide tengah membesar sedikit
                    : 'border-zinc-800 opacity-40 scale-90 blur-[1px]'} 
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
        .gallery-swiper {
          padding-bottom: 50px !important;
        }
        .gallery-swiper .swiper-button-next, 
        .gallery-swiper .swiper-button-prev {
          color: white;
          background: rgba(220, 38, 38, 0.8);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s;
        }
        /* Sembunyikan navigasi di HP agar tidak menutupi poster */
        @media (max-width: 640px) {
          .gallery-swiper .swiper-button-next, 
          .gallery-swiper .swiper-button-prev {
            display: none;
          }
        }
        .gallery-swiper .swiper-button-next:after, 
        .gallery-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #dc2626 !important;
        }
      `}</style>
    </div>
  );
}
