import { Autoplay, EffectCreative, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
function CarouselBanner() {
    return (
        <>
            <div>
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
                        <div
                            data-swiper-parallax="-300"
                            className="relative flex h-screen w-full flex-col justify-center bg-cover bg-center pl-[30px] text-2xl text-gray-50"
                            style={{ backgroundImage: `url('img/skt_6.jpg')` }}
                        >
                            <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
                            <div className="lg:ml-20 xl:ml-40">
                                <div>
                                    <div>
                                        <p className="col:text-[16px] font-base-font relative mb-[30px] text-[25px] font-normal tracking-[2px] text-white capitalize">
                                            “<span className="text-blue-800 hover:text-green-800">4 Sister Schools</span>”
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="font-heading-font col:text-[35px] col:leading-[35px] col:mb-[20px] relative mt-[10px] mb-[25px] text-[40px] leading-[55px] font-normal text-white uppercase md:text-[50px] md:leading-[90px] lg:text-[75px]">
                                            BFI <span className="text-blue-800 hover:text-green-800">EDUCATION</span> SERVIES.
                                        </h2>
                                    </div>
                                    <div>
                                        <p className="font-base-font col:leading-[25px] col:mb-[30px] relative mb-[40px] text-[18px] leading-[35px] text-[#e2e2e2] md:text-[22px]">
                                            Lorem Ipsum has been the industry's standard text since the printer took galley make.
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <a
                                            href="about.html"
                                            className="rounded-4xl bg-blue-900 px-6 py-4 text-base hover:bg-green-900 hover:shadow-2xl"
                                        >
                                            Explore more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            data-swiper-parallax="-100"
                            className="flex h-screen w-full flex-col justify-center bg-cover bg-center pl-[30px] text-2xl text-gray-50"
                            style={{ backgroundImage: `url('img/skt_9.jpg')` }}
                        >
                            <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
                            <div className="lg:ml-20 xl:ml-40">
                                <div>
                                    <div>
                                        <p className="col:text-[16px] font-base-font relative mb-[30px] text-[25px] font-normal tracking-[2px] text-white capitalize">
                                            “<span className="text-blue-800 hover:text-green-800">90% Foreign Teachers</span>”
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="font-heading-font col:text-[35px] col:leading-[35px] col:mb-[20px] relative mt-[10px] mb-[25px] text-[40px] leading-[55px] font-normal text-white uppercase md:text-[50px] md:leading-[90px] lg:text-[75px]">
                                            Inspiring Brilance<span className="text-blue-800 hover:text-green-800">Building Brighter</span> Futures.
                                        </h2>
                                    </div>
                                    <div>
                                        <p className="font-base-font col:leading-[25px] col:mb-[30px] relative mb-[40px] text-[18px] leading-[35px] text-[#e2e2e2] md:text-[22px]">
                                            Lorem Ipsum has been the industry's standard text since the printer took galley make.
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <a
                                            href="about.html"
                                            className="rounded-4xl bg-blue-900 px-6 py-4 text-base hover:bg-green-900 hover:shadow-2xl"
                                        >
                                            Explore more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            data-swiper-parallax="-100"
                            className="flex h-screen w-full flex-col justify-center bg-cover bg-center pl-[30px] text-2xl text-gray-50"
                            style={{ backgroundImage: `url('img/skt_5.jpg')` }}
                        >
                            <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
                            <div className="lg:ml-20 xl:ml-40">
                                <div>
                                    <div>
                                        <p className="col:text-[16px] font-base-font relative mb-[30px] text-[25px] font-normal tracking-[2px] text-white capitalize">
                                            “<span className="text-blue-800 hover:text-green-800">The IB Diploma Programme</span>”
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="font-heading-font col:text-[35px] col:leading-[35px] col:mb-[20px] relative mt-[10px] mb-[25px] text-[40px] leading-[55px] font-normal text-white uppercase md:text-[50px] md:leading-[90px] lg:text-[75px]">
                                            WORLD-CLASS EDUCATION IN A
                                            <span className="text-blue-800 hover:text-green-800">SAFE AND FRIENDLY ENVIRONMENT</span>
                                        </h2>
                                    </div>
                                    <div>
                                        <p className="font-base-font col:leading-[25px] col:mb-[30px] relative mb-[40px] text-[18px] leading-[35px] text-[#e2e2e2] md:text-[22px]">
                                            Lorem Ipsum has been the industry's standard text since the printer took galley make.
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <a
                                            href="about.html"
                                            className="rounded-4xl bg-blue-900 px-6 py-4 text-base hover:bg-green-900 hover:shadow-2xl"
                                        >
                                            Explore more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default CarouselBanner;
