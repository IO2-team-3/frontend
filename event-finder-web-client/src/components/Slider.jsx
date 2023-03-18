import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper';

import { slides } from '../constants';

const Slider = () => {

    return (
        <Swiper
        className="my-9 p-10"
        effect={'coverflow'}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        breakpoints={{
            950: { slidesPerView: 3},
          }}
        loop={true}
        
        slidesPerGroup={1}
        slidesPerView={1}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
            rotate: 20,
            stretch: 145, 
            depth: 150, 
            modifier: 1,
          }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
        }}
      >
        
        {slides.map((slide) => (
          <div className="rounded">
           <SwiperSlide key={slide.id} className="bg-black-gradient swiper-slide">
                <div className="flex justify-center my-9 lg:p-3">
                    <img className="slide-photo h-auto max-w-full" src={slide.photo} alt="slide_image" />
                </div>
                <div className={`text-gradient text-center text-xl my-9 px-5 font-poppins`}>
                    {slide.text}
                </div>
            </SwiperSlide>
            </div>
        ))}

      </Swiper>
    );
  }
  
  export default Slider;
