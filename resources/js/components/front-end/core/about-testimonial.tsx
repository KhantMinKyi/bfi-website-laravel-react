import { Autoplay, EffectCreative, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function AboutTestimonial() {
    return (
        <div className="">
            <Swiper
                grabCursor={true}
                effect={'fade'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 50, -100],
                    },
                    next: {
                        translate: ['100%', '50%', 0],
                    },
                }}
                modules={[EffectCreative, Navigation, Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                <div className="m-10">
                    <SwiperSlide className="bg-blue-100 py-16 dark:bg-gray-950">
                        <div className="mx-auto block max-w-sm items-center justify-center rounded-[24px] md:flex md:max-w-4xl">
                            <div className="flex basis-2xl justify-center sm:basis-7xl">
                                <img
                                    src="img/bfi.webp"
                                    alt=""
                                    className="rounded-tr-[20px]object-cover h-full rounded-tl-[20px] sm:h-72 md:h-96 md:rounded-tr-[0px] md:rounded-bl-[20px]"
                                />
                            </div>
                            <div className="">
                                <p className="font-heading-font relative mb-4 px-10 pt-4 text-lg font-normal md:text-lg lg:mb-6 xl:text-2xl">
                                    We empower our students to join world-class universities and become lifelong learners and compassionate global
                                    citizens.
                                </p>
                                <h2 className="px-10 text-3xl font-normal lg:text-4xl">Vision</h2>
                                <span className="px-10 text-base font-normal">BFI Education Services</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-green-100 py-16 dark:bg-gray-900">
                        <div className="mx-auto block max-w-sm items-center justify-center rounded-[24px] md:flex md:max-w-4xl">
                            <div className="flex basis-2xl justify-center sm:basis-7xl">
                                <img
                                    src="img/bfi.webp"
                                    alt=""
                                    className="rounded-tr-[20px]object-cover h-full rounded-tl-[20px] sm:h-72 md:h-96 md:rounded-tr-[0px] md:rounded-bl-[20px]"
                                />
                            </div>
                            <div className="">
                                <p className="font-heading-font relative mb-4 px-10 pt-4 text-lg font-normal md:text-lg lg:mb-6 xl:text-2xl">
                                    We nurture students to become lifelong learners, responsible global citizens, and compassionate individuals
                                    through a challenging and balanced curriculum in a safe and caring environment.
                                </p>
                                <h2 className="px-10 text-3xl font-normal lg:text-4xl">Mission</h2>
                                <span className="px-10 text-base font-normal">BFI Education Services</span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white py-16 dark:bg-gray-950">
                        <div className="mx-auto block max-w-sm items-center justify-center rounded-[24px] md:flex md:max-w-4xl">
                            <div className="flex basis-2xl justify-center sm:basis-7xl">
                                <img
                                    src="img/bfi.webp"
                                    alt=""
                                    className="rounded-tr-[20px]object-cover h-full rounded-tl-[20px] sm:h-72 md:h-96 md:rounded-tr-[0px] md:rounded-bl-[20px]"
                                />
                            </div>
                            <div className="">
                                <p className="font-heading-font relative mb-4 px-10 pt-4 text-lg font-normal md:text-lg lg:mb-6 xl:text-2xl">
                                    Our school philosophy revolves around five pillars, each representing a core aspect of our commitment to
                                    excellence and holistic development.
                                </p>
                                <h2 className="px-10 text-3xl font-normal lg:text-4xl">Philosophy</h2>
                                <span className="px-10 text-base font-normal">BFI Education Services</span>
                            </div>
                        </div>
                    </SwiperSlide>
                </div>
            </Swiper>
        </div>
    );
}

export default AboutTestimonial;
