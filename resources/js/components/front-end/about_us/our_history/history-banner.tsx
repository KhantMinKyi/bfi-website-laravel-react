import * as motion from 'motion/react-client';
function HistoryBanner() {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat py-20"
            style={{
                backgroundImage: "url('/img/history-banner-backdrop.webp')", // put your image path here
                opacity: 0.9,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-green-900/70 dark:to-gray-950/70" />
            <div className="container mx-auto grid grid-cols-1 p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: -50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold md:text-6xl">Our Journey</h2>
                        <img src="/img/bfi.webp" className="max-w-64 dark:hidden" alt="BFI Logo" />
                        <img src="/img/bfi_b.webp" className="hidden max-w-64 dark:block" alt="BFI Logo" />
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: 50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="font-merriweather flex flex-col items-center">
                        <p className="my-10 border-l-4 border-l-blue-800 pl-4 text-blue-800 dark:border-l-green-600 dark:text-green-600">
                            Established in June 2000 in Yangon, BFI schools (formerly Horizon International Schools) are committed to providing
                            high-quality international education. Every parent hopes for the best learning environment for their child—one that is
                            positive, enriching, and well-equipped to prepare them for future challenges in an increasingly interconnected world.
                        </p>
                        <p>
                            Since its founding, BFI Schools have expanded to four campuses across three cities. The SKT International School (City
                            Campus) in Yangon offers Primary, Secondary, and High School programs from Grades 1 to 10. Located on a spacious and
                            well-designed campus, the school features modern facilities including a soccer pitch, basketball court, playground, and
                            dining hall—all contributing to a well-rounded educational experience. With a diverse teaching staff from around the
                            world, the school proudly welcomes all families seeking international education. The preschool in Bahan, opened in 2005,
                            is conveniently located near the main campus on Pho Sein Road.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default HistoryBanner;
