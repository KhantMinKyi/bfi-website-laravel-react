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
                    modules={[EffectCreative, Navigation, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                >

                    <SwiperSlide>
                        <div data-swiper-parallax="-300"
                            className=" relative  flex flex-col justify-center w-full h-screen bg-cover bg-center   text-gray-50 text-2xl pl-[30px]"
                            style={{ backgroundImage: `url('img/banner.jpg')` }}
                        >
                            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                            <div className=' lg:ml-20 xl:ml-40'>
                                <div>
                                    <div >
                                        <p className="relative  text-[25px]  col:text-[16px] text-white font-base-font capitalize 
                                                    mb-[30px] font-normal tracking-[2px]">“<span
                                                className="text-blue-800 hover:text-green-800">25% PURE VEGETABLES</span>”</p>
                                    </div>
                                    <div>
                                        <h2 className="relative  lg:text-[75px] font-heading-font font-normal uppercase md:leading-[90px] mt-[10px] mb-[25px]
                                                     md:text-[50px] text-[40px] leading-[55px] col:text-[35px]
                                                     col:leading-[35px] text-white col:mb-[20px]">Organic Food <span
                                                className="text-blue-800 hover:text-green-800">And</span> Vegetabls.</h2>
                                    </div>
                                    <div>
                                        <p className="relative  md:text-[22px] text-[#e2e2e2] font-base-font
                                                    leading-[35px]
                                                     mb-[40px] 
                                                    text-[18px] col:leading-[25px] 
                                                    col:mb-[30px]">
                                            Lorem Ipsum has been the industry's standard text since the printer
                                            took
                                            galley make.</p>
                                    </div>
                                    <div className="relative  ">
                                        <a href="about.html" className="bg-blue-900 py-4 px-6 rounded-4xl hover:shadow-2xl hover:bg-green-900 text-base">
                                            Explore more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div data-swiper-parallax="-100"
                            className=" flex flex-col justify-center w-full h-screen bg-cover bg-center   text-gray-50 text-2xl pl-[30px]"
                            style={{ backgroundImage: `url('assets/images/slider/slide-1.jpg')` }}
                        >
                                                        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                    <div className=' lg:ml-20 xl:ml-40'>
                                <div>
                                    <div >
                                        <p className="relative  text-[25px]  col:text-[16px] text-white font-base-font capitalize 
                                                    mb-[30px] font-normal tracking-[2px]">“<span
                                                className="text-blue-800 hover:text-green-800">25% PURE VEGETABLES</span>”</p>
                                    </div>
                                    <div>
                                        <h2 className="relative  lg:text-[75px] font-heading-font font-normal uppercase md:leading-[90px] mt-[10px] mb-[25px]
                                                     md:text-[50px] text-[40px] leading-[55px] col:text-[35px]
                                                     col:leading-[35px] text-white col:mb-[20px]">Organic Food <span
                                                className="text-blue-800 hover:text-green-800">And</span> Vegetabls.</h2>
                                    </div>
                                    <div>
                                        <p className="relative  md:text-[22px] text-[#e2e2e2] font-base-font
                                                    leading-[35px]
                                                     mb-[40px] 
                                                    text-[18px] col:leading-[25px] 
                                                    col:mb-[30px]">
                                            Lorem Ipsum has been the industry's standard text since the printer
                                            took
                                            galley make.</p>
                                    </div>
                                    <div className="relative  ">
                                        <a href="about.html" className="bg-blue-900 py-4 px-6 rounded-4xl hover:shadow-2xl hover:bg-green-900 text-base">
                                            Explore more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>


        </>
    )
}

export default CarouselBanner