import * as motion from 'motion/react-client';
function HistoryTagline() {
    return (
        <div
            className="relative bg-blue-950 py-20 dark:bg-green-950"
            // style={{
            //     backgroundImage: "url('/img/history-banner-backdrop.png')", // put your image path here
            //     opacity: 0.9,
            // }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="container mx-auto grid grid-cols-1 p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111 font-merriweather flex items-center"
                    initial={{ opacity: 0, y: 100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="text-justify indent-8 text-white">
                        <p>
                            The SKT International School (Riverside Campus), opened in 2010 on Shu Khin Thar Myo Pat Road, provides a contemporary
                            learning environment with wide, purpose-built spaces and state-of-the-art facilities.
                        </p>
                        <p>
                            In response to growing demand in Mandalay and Upper Myanmar, the Mandalay International School of Acumen was established
                            in 2004 in Myanmar’s historic second capital. Within its first year, the school saw remarkable success thanks to strong
                            parental support. The Mandalay campus offers Kindergarten through High School programs and features extensive facilities
                            designed to support student development, in alignment with the Yangon curriculum.
                        </p>
                        <p>
                            Nay Pyi Taw International School of Acumen (NISA) opened in 2013 to meet the rising interest in international education in
                            the capital city. The school provides a wide range of facilities—including sports courts, playgrounds, and dining
                            areas—creating an environment where students can grow academically, physically, and socially. With an international
                            teaching staff, NISA warmly welcomes all learners seeking a global-standard education.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: -100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold text-white md:text-6xl">Our Heritage</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default HistoryTagline;
