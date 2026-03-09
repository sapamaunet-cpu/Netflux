"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function MovieGallery({ movie }) {
  const extraPosters = movie.images?.posters || [];
  
  const displayPosters = extraPosters.length > 0 
    ? extraPosters.slice(0, 8) 
    : [{ file_path: movie.poster_path }];

  return (
    <div className="mt-12 mb-10 group overflow-hidden"> {/* Tambah overflow-hidden */}
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="h-6 w-1.5 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white italic font-cinema">
          Galeri Poster
        </h3>
      </div>

      <div className="relative overflow-visible py-4"> {/* overflow-visible */}
        <Swiper
          modules={[Navigation, Pagination]} // Matikan Coverflow, gunakan yang standar dulu
          centeredSlides={true}
          loop={displayPosters.length > 2}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          // --- INI PERUBAHAN UTAMANYA ---
          // Kita tentukan slidesPerView secara dinamis menggunakan calc()
          slidesPerView={'auto'} // Biarkan Swiper menghitung dari CSS slide
          breakpoints={{
            // Mobile (Redmi Note 8): Slide utama hampir full
            0: {
              slidesPerView: 1.2,
              spaceBetween: -20, // Sedikit rapat
            },
            // Desktop: Tampilkan banyak
            1024: {
              slidesPerView: 3,
              spaceBetween: -50,
            },
          }}
          className="gallery-swiper !overflow-visible"
        >
          {displayPosters.map((img, index) => (
            // Kita atur lebar SwiperSlide di mobile agar besar
            <SwiperSlide key={index} style={{ width: 'calc(100% - 40px)' }} className="sm:!w-auto"> 
              {({ isActive }) => (
                <div className={`
                  poster-container
                  relative aspect-[2/3] rounded-2xl overflow-hidden border transition-all duration-300 shadow-2xl
                  ${isActive 
                    ? 'border-red-600' 
                    : 'border-zinc-800 opacity-20 blur-[2px]'} 
                `}>
                {/* Naikkan opacity non-aktif ke 30% atau 40% jika dirasa terlalu gelap */}
                  <img
  src={`https://image.tmdb.org/t/p/w500${img.file_path}`} // Default/Fallback
  srcSet={`
    https://image.tmdb.org/t/p/w500${img.file_path} 500w,
    https://image.tmdb.org/t/p/w780${img.file_path} 780w
  `}
  sizes="(max-width: 1024px) 500px, 780px"
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
        .gallery-swiper .swiper-button-next, 
        .gallery-swiper .swiper-button-prev {
          color: white;
          background: rgba(220, 38, 38, 0.6);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translateY(-20px);
        }
        .gallery-swiper .swiper-button-next:after, 
        .gallery-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #dc2626 !important;
        }
        .poster-container {
  will-change: transform; /* Memberitahu browser untuk siap-siap melakukan animasi */
  backface-visibility: hidden; /* Mencegah kedipan (flicker) saat digeser */
}

      `}</style>
    </div>
  );
}
