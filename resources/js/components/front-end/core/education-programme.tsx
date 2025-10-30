import { Programmes } from '@/types';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
type EducationProgrammeProps = {
    programmes: Programmes[];
};

function EducationProgramme({ programmes }: EducationProgrammeProps) {
    return (
        <div className="container mx-auto py-12">
            <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold">Education Programs</h2>
            </div>
            <Swiper
                grabCursor={true}
                effect={'fade'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -100],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectCreative, Navigation, Autoplay, Pagination]}
                slidesPerView={4}
                spaceBetween={50}
                // autoplay={{ delay: 3000 }}
                pagination={true}
                loop={true}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
            >
                <div className="m-10">
                    {programmes.length > 0 ? (
                        programmes.map((p) => (
                            <SwiperSlide className="">
                                <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <a href="#" className="flex h-56 justify-center align-middle">
                                        <img className="rounded-t-lg" src={p.authorImage} alt="product image" />
                                    </a>
                                    <div className="px-5 pb-5">
                                        <a href="#">
                                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{p.quote}</h5>
                                        </a>
                                        <a href="#">
                                            <h6 className="text-base tracking-tight text-gray-500 dark:text-gray-200">
                                                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                                            </h6>
                                        </a>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">18-09-2025</span>
                                            <a
                                                href="#"
                                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-950"
                                            >
                                                View More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div>No data</div>
                    )}
                </div>
            </Swiper>
        </div>
    );
}

export default EducationProgramme;
