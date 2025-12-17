import * as motion from 'motion/react-client';
function CompetitionBanner() {
    return (
        <div
            className="bg-opci relative bg-cover bg-center bg-no-repeat py-20"
            style={{
                backgroundImage: "url('/img/bfi-advantage.png')", // put your image path here
                opacity: 0.9,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="container mx-auto grid grid-cols-1 items-center p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: -50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold md:text-6xl">Mathemania</h2>
                        <img src="/img/bfi.png" className="max-w-64 dark:hidden" alt="" />
                        <img src="/img/bfi_b.png" className="hidden max-w-64 dark:block" alt="" />
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
                        <p>
                            Mathemania is an annual puzzle contest held in Myanmar and is open to the public. It consists of puzzles that assess
                            students' visual/spatial, counting, arithmetic, pattern finding and logical/reasoning skills. Mathemania is organized by
                            the Math Department and has gained popularity since it was initiated in 2006. Students, parents, educators and media have
                            shown great enthusiasm and support for the event.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CompetitionBanner;
