import GradualSpacingHeader from '@/components/front-end/core/gradual-spacing-header';
import FrontEndLayout from '@/layouts/front-end-layout';
import { motion } from 'motion/react';
function VisionMissionValue() {
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('/img/SKT_9.webp')", // put your image path here
                }}
            >
                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-blue-950/60" /> */}
                <div className="dark:from-dark-950/90 dark:to-dark-950/90 absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-950/60" />
                {/* Content */}
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                >
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center md:py-40 lg:py-52">
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Our Philosophy</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">The foundation of who we are and what we aim to achieve.</p>
                    </div>
                </motion.div>
            </div>
            {/* <div className="h-screen">VisionMissionValue</div> */}
            <motion.div
                className="orico-about-text-wrap 111"
                initial={{ opacity: 0, x: -50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
            ></motion.div>
            <section
                className="relative z-20 flex flex-col justify-center overflow-hidden dark:bg-neutral-950"
                style={{
                    backgroundImage: "url('/img/footer-banner.webp')", // put your image path here
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center md:py-10 lg:py-10">
                    <img src="/img/bfi.webp" className="max-w-40 dark:hidden" alt="" />
                    <img src="/img/bfi_b.webp" className="hidden max-w-40 dark:block" alt="" />
                </div>
                <div className="mx-auto max-w-7xl">
                    {/* <div className="grid grid-cols-12 gap-x-4"> */}
                    <div className="p-10">
                        <div className="orico-about-text font-merriweather">
                            <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                                {' '}
                                <GradualSpacingHeader text="Our Philosophy" className="z-10 text-blue-800 dark:text-green-600" />{' '}
                            </h2>
                            <div className="grid md:grid-cols-2 md:gap-10">
                                <div className="flex justify-center align-middle">
                                    <img src="/img/philosophy.webp" alt="" className="block max-h-10/12 dark:hidden" />
                                    <img src="/img/philosophy_b.webp" alt="" className="hidden max-h-10/12 dark:block" />
                                </div>
                                <div className="mb-5 text-xl">
                                    Our school philosophy revolves around five pillars, each representing a core aspect of our commitment to
                                    excellence and holistic development.
                                    <h2 className="font-merriweather my-2 text-2xl font-bold">Science and Mathematics:</h2>
                                    <p>
                                        Building Foundations for Inquiry and Discovery Our curriculum is designed to ignite curiosity, encourage
                                        critical thinking, and instill a passion for inquiry-based learning. We empower our students to tackle
                                        real-world challenges and contribute meaningfully to a rapidly evolving global society.
                                    </p>
                                    <hr className="my-2" />
                                    <h2 className="font-merriweather my-2 text-2xl font-bold">Technology Integration:</h2>
                                    <p>
                                        Shaping Future Innovators Through a dynamic and evolving curriculum, we prepare our students to be adaptive,
                                        creative, and ethical users of technology, positioning them as leaders in an increasingly digital world.
                                    </p>
                                    <hr className="my-2" />
                                    <h2 className="font-merriweather my-2 text-2xl font-bold">Physical Education:</h2>
                                    <p>
                                        Sports, Games, and Events: Fostering Wellness and Team Spirit By fostering inclusivity and providing diverse
                                        opportunities for physical activity, we aim to instill a lifelong love for fitness, teamwork, and
                                        sportsmanship, nurturing well-rounded individuals who understand the importance of a healthy lifestyle.
                                    </p>
                                    <hr className="my-2" />
                                    <h2 className="font-merriweather my-2 text-2xl font-bold">Internationalism:</h2>
                                    <p>
                                        Cultivating Global Citizens We strive to create a global learning environment by incorporating international
                                        perspectives into our curriculum, promoting cultural exchange programs, and encouraging an appreciation for
                                        diversity.
                                    </p>
                                    <hr className="my-2" />
                                    <h2 className="font-merriweather my-2 text-2xl font-bold">Character and Values Education:</h2>
                                    <p>
                                        Shaping Ethical Leaders Our curriculum places a strong emphasis on the development of moral integrity,
                                        empathy, and resilience. We aim to cultivate ethical leaders who not only excel academically but also
                                        contribute positively to their communities, demonstrating a commitment to social responsibility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <motion.div
                    className="absolute top-1/8 left-[40px] -z-10 -translate-y-1/8"
                    initial={{ opacity: 0, x: 50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_riverside_campus.webp" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.webp" alt="" className="hidden w-60 rotate-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-1/8 right-[40px] -z-10 -translate-y-1/8"
                    initial={{ opacity: 0, x: 50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/misa.webp" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/misa_b.webp" alt="" className="hidden w-60 -rotate-z-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 left-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/nisa.webp" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/nisa_b.webp" alt="" className="hidden w-60 -rotate-z-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 right-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_city_campus.webp" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_city_campus_b.webp" alt="" className="hidden w-60 rotate-6 opacity-40 dark:block" />
                </motion.div>
            </section>
        </FrontEndLayout>
    );
}

export default VisionMissionValue;
