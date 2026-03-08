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
    ? extraPosters.slice(0, 15) 
    : [{ file_path: movie.poster_path }];

  return (
    <div className="mt-12 mb-10 group">
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="h-6 w-1.5 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white italic">
          Galeri Poster
        </h3>
      </div>

      <div className="relative overflow-hidden py-4">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect={'coverflow'} // Memberikan efek kedalaman sedikit
          centeredSlides={true} // Poster utama di tengah
          slidesPerView={1.8} // Menampilkan 1 full di tengah + potongan kiri & kanan
          spaceBetween={0} // Jarak antar slide
          loop={displayPosters.length > 2} // Aktifkan loop jika gambar cukup
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 5.2 },
          }}
          className="gallery-swiper !overflow-visible"
        >
          {displayPosters.map((img, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={`
                  relative aspect-[2/3] rounded-2xl overflow-hidden border transition-all duration-500 shadow-2xl
                  ${isActive 
                    ? 'border-red-600 scale-100 z-10' 
                    : 'border-zinc-800 scale-90 opacity-30 blur-[2px]'}
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
      `}</style>
    </div>
  );
}
