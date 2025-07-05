import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductCarousel({ products }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1024) setSlidesPerView(4);
        else if (width >= 768) setSlidesPerView(3);
        else if (width >= 640) setSlidesPerView(2);
        else setSlidesPerView(1);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const maxSlideIndex = Math.max(0, products.length - slidesPerView);
  const progressPercentage = maxSlideIndex > 0 ? (activeSlide / maxSlideIndex) * 100 : 0;
  
  const innerBarWidthPercentage = 15;

  return (
    <div style={{ position: 'relative' }} className='mx-auto'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        loop={false}
        rewind={false}
        allowTouchMove={true}
        navigation={{ 
          nextEl: '.custom-next', 
          prevEl: '.custom-prev' 
        }}
        pagination={false}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '9px',
          backgroundColor: '#e5e7eb',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            height: '90%',
            width: `${innerBarWidthPercentage}%`,
            backgroundColor: '#9ca3af',
            borderRadius: '10px',
            position: 'absolute',
            left: `${progressPercentage * (100 - innerBarWidthPercentage) / 100}%`,
            transition: 'left 0.3s ease'
          }} />
        </div>
      </div>
      
      <div className="custom-prev" style={{
        position: 'absolute',
        left: '-40px',
        top: '112px',
        transform: 'translateY(-50%)',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        color: '#374151'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16,25 4,12 16,1"></polyline>
        </svg>
      </div>

      <div className="custom-next" style={{
        position: 'absolute',
        right: '-40px',
        top: '112px',
        transform: 'translateY(-50%)',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        color: '#374151'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="8,1, 20,12 8,25"></polyline>
        </svg>
      </div>
    </div>
  );
}