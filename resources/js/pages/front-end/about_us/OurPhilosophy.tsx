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
                        <img src="/img/bfi.png" className="max-w-40" alt="" />
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
                    backgroundImage: "url('/img/footer-banner.png')", // put your image path here
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center md:py-10 lg:py-10">
                    <img src="/img/bfi.png" className="max-w-40 dark:hidden" alt="" />
                    <img src="/img/bfi_b.png" className="hidden max-w-40 dark:block" alt="" />
                </div>
                <div className="mx-auto max-w-7xl">
                    {/* <div className="grid grid-cols-12 gap-x-4"> */}
                    <div className="p-10">
                        <div className="orico-about-text font-merriweather">
                            <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                                {' '}
                                <GradualSpacingHeader text="Our Philosophy" className="z-10 text-blue-800 dark:text-green-600" />{' '}
                            </h2>
                            <motion.div
                                className="orico-about-text-wrap 111"
                                initial={{ opacity: 0, x: -50 }} // start 50px below
                                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                            >
                                <p className="mb-5">
                                    operate 4 main campuses and 4 kindergartens in Myanmar. Our campuses are located in Yangon, Mandalay and Nay Pyi
                                    Taw. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur, expedita aut odio id repudiandae
                                    quidem, cum quam porro ex enim sed. Veritatis nulla iure laboriosam maiores consequuntur eligendi ex? operate 4
                                    main campuses and 4 kindergartens in Myanmar. Our campuses are located in Yangon, Mandalay and Nay Pyi Taw. Lorem,
                                    ipsum dolor sit amet consectetur adipisicing elit. Esse aspernatur, expedita aut odio id repudiandae quidem, cum
                                    quam porro ex enim sed. Veritatis nulla iure laboriosam maiores consequuntur eligendi ex?
                                </p>
                            </motion.div>
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
                    <img src="/img/skt_riverside_campus.png" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.png" alt="" className="hidden w-60 rotate-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-1/8 right-[40px] -z-10 -translate-y-1/8"
                    initial={{ opacity: 0, x: 50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/misa.png" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/misa_b.png" alt="" className="hidden w-60 -rotate-z-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 left-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/nisa.png" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/nisa_b.png" alt="" className="hidden w-60 -rotate-z-6 opacity-40 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 right-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_city_campus.png" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_city_campus_b.png" alt="" className="hidden w-60 rotate-6 opacity-40 dark:block" />
                </motion.div>
            </section>
        </FrontEndLayout>
    );
}

export default VisionMissionValue;
