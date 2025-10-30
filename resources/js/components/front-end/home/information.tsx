import * as motion from 'motion/react-client';
function Information() {
    return (
        <section className="relative z-20 flex flex-col justify-center overflow-hidden py-[120px] sm:py-[80px] sm:pt-[60px] md:py-[90px] md:pt-[70px] dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-12 items-center gap-x-4">
                    <div className="col-span-12 p-10 md:col-span-6">
                        <motion.div
                            className="orico-about-text-wrap 111"
                            initial={{ opacity: 0, x: -50 }} // start 50px below
                            whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                            exit={{ opacity: 0, x: -50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                        >
                            <div className="orico-about-text">
                                <span className="font-heading-font mb-1 inline-block text-xl font-normal text-green-800 underline">“ABOUT US”</span>
                                <h2 className="font-heading-font mb-5 text-3xl font-bold sm:text-4xl lg:text-6xl">BFI Education Services </h2>
                                <p className="mb-5">
                                    operate 4 main campuses and 4 kindergartens in Myanmar. Our campuses are located in Yangon, Mandalay and Nay Pyi
                                    Taw.{' '}
                                </p>
                                <ul className="col:block mb-8 flex">
                                    <li className="relative inline-block py-1 pl-6 text-base font-semibold text-[#687693]">
                                        <i className="absolute top-1 left-0">
                                            <img src="assets/images/about/4.png" alt="" />
                                        </i>
                                        <p>It has survived not only five centuries the leap into.</p>
                                    </li>
                                    <li className="relative inline-block py-1 pl-6 text-base font-semibold text-[#687693]">
                                        <i className="absolute top-1 left-0">
                                            <img src="assets/images/about/5.png" alt="" />
                                        </i>
                                        <p>It has survived not only five centuries the leap into.</p>
                                    </li>
                                </ul>
                                <a className="rounded-4xl bg-blue-800 px-6 py-4 text-white hover:bg-green-800 hover:shadow-2xl" href="about.html">
                                    Get In Touch
                                </a>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="col-span-12 p-10 md:col-span-6"
                        initial={{ opacity: 0, x: 50 }} // start 50px below
                        whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                        exit={{ opacity: 0, x: 50 }} // fade out and slide down
                        viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                        transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                    >
                        <div className="mt-14 pl-0 md:pl-12">
                            <div className="col:p-2 relative z-10 w-full border border-yellow-200 p-5 dark:border-0">
                                <div>
                                    <img src="assets/images/about/ab.jpg" alt="" className="w-full" />
                                </div>
                                <div className="col:w-[160px] col:h-[150px] absolute bottom-[-25px] left-[-25px] flex items-center justify-center rounded-[8px] bg-yellow-600 text-center backdrop-blur-[15px] md:bottom-0 md:left-0 lg:h-[235px] lg:w-[201px]">
                                    <div className="block">
                                        <img src="assets/images/about/badge.svg" alt="" className="mx-auto mt-2 max-w-[40px] lg:max-w-[80px]" />
                                        <span className="mx-auto block max-w-[100px] pt-4 text-center text-sm font-medium text-white capitalize lg:max-w-[133px] lg:text-base">
                                            National Organic Awards 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="absolute top-1/8 left-[40px] -z-10 -translate-y-1/8"
                initial={{ opacity: 0, x: 50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: 50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
            >
                <img src="img/skt_riverside_campus.png" alt="" className="w-60 rotate-6 opacity-20" />
            </motion.div>
            <motion.div
                className="absolute top-1/8 right-[40px] -z-10 -translate-y-1/8"
                initial={{ opacity: 0, x: 50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: 50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
            >
                <img src="img/misa.png" alt="" className="w-60 -rotate-z-6 opacity-20" />
            </motion.div>
            <motion.div
                className="absolute top-8/8 left-[40px] -z-10 -translate-y-8/8"
                initial={{ opacity: 0, x: -50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
            >
                <img src="img/nisa.png" alt="" className="w-60 -rotate-z-6 opacity-20" />
            </motion.div>
            <motion.div
                className="absolute top-8/8 right-[40px] -z-10 -translate-y-8/8"
                initial={{ opacity: 0, x: -50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
            >
                <img src="img/skt_city_campus.png" alt="" className="w-60 rotate-6 opacity-20" />
            </motion.div>
        </section>
    );
}

export default Information;
