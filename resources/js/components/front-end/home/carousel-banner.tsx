import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCreative } from 'swiper/modules';
function CarouselBanner() {
    return (
        <>
            <div >
                <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -100],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative,Navigation,Autoplay]}
          autoplay={{ delay: 3000 }}
  loop={true}
                >

                    <SwiperSlide>
                        <div  data-swiper-parallax="-300"
                            className=" relative  flex flex-col justify-center w-full h-screen bg-cover bg-center   text-gray-50 text-2xl pl-[30px]"
                            style={{ backgroundImage: `url('img/banner.jpg')` }}
                        >
                               <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                            <div >
                                <p className="relative  text-[25px]  col:text-[16px] text-white font-base-font capitalize 
                                                    mb-[30px] font-normal tracking-[2px]">“<span
                                        className="text-blue-800 hover:text-green-800">25% PURE VEGETABLES</span>”</p>
                            </div>
                            <div>
                                <h2 className="relative  text-[75px] font-heading-font font-normal uppercase leading-[90px] mt-[10px] mb-[25px]
                                                     lg:text-[50px] md:text-[40px] md:leading-[55px] col:text-[35px]
                                                     col:leading-[35px] text-white col:mb-[20px]">Organic Food <span
                                        className="text-blue-800 hover:text-green-800">And</span> Vegetabls.</h2>
                            </div>
                            <div>
                                <p className="relative  text-[22px] text-[#e2e2e2] font-base-font
                                                    leading-[35px]
                                                     mb-[40px] 
                                                    md:text-[18px] col:leading-[25px] 
                                                    col:mb-[30px]">
                                    Lorem Ipsum has been the industry's standard text since the printer
                                    took
                                    galley make.</p>
                            </div>
                            <div className="relative  ">
                                <a href="about.html" className="bg-blue-900 py-4 px-6 rounded-4xl hover:shadow-2xl hover:bg-green-900">
                                    Explore more</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div data-swiper-parallax="-100"
                            className=" flex flex-col justify-center w-full h-screen bg-cover bg-center   text-gray-50 text-2xl pl-[30px]"
                            style={{ backgroundImage: `url('assets/images/slider/slide-1.jpg')` }}
                        >
                            <div >
                                <p className="text-[25px]  col:text-[16px] text-white font-base-font capitalize 
                                                    mb-[30px] font-normal tracking-[2px]">“<span
                                        className="text-[#F78914]">More Schools</span>”</p>
                            </div>
                            <div>
                                <h2 className="text-[75px] font-heading-font font-normal uppercase leading-[90px] mt-[10px] mb-[25px]
                                                     lg:text-[50px] md:text-[40px] md:leading-[55px] col:text-[35px]
                                                     col:leading-[35px] text-white col:mb-[20px]">Organic Food <span
                                        className="text-[#F78914]">And</span> Vegetabls.</h2>
                            </div>
                            <div>
                                <p className="text-[22px] text-[#e2e2e2] font-base-font
                                                    leading-[35px]
                                                     mb-[40px] 
                                                    md:text-[18px] col:leading-[25px] 
                                                    col:mb-[30px]">
                                    Lorem Ipsum has been the industry's standard text since the printer
                                    took
                                    galley make.</p>
                            </div>
                            <div className="slide-btn">
                                <a href="about.html" className="btn theme-btn">
                                    Explore more</a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
           

        </>
    )
}

export default CarouselBanner