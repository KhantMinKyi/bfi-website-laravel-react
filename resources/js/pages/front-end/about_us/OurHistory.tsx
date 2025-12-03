import HistoryBanner from '@/components/front-end/about_us/our_history/history-banner';
import HistoryProgressBar from '@/components/front-end/about_us/our_history/history-progess-bar';
import HistoryTagline from '@/components/front-end/about_us/our_history/history-tagline';
import FrontEndLayout from '@/layouts/front-end-layout';
import * as motion from 'motion/react-client';
const events = [
    { year: '2000', title: 'Established Horizon' },
    { year: '2004', title: 'MISA ' },
    { year: '2010', title: 'SKT Riverside Campus' },
    { year: '2013', title: 'NISA ' },
];
function OurHistory() {
    return (
        <FrontEndLayout>
            <>
                <div
                    className="relative bg-cover bg-center bg-no-repeat text-white"
                    style={{
                        backgroundImage: "url('/img/SKT_11.jpg')", // put your image path here
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
                            <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Our history</h2>
                            <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                        </div>
                    </motion.div>
                </div>
                <HistoryBanner />
                <HistoryProgressBar events={events} />
                <HistoryTagline />
            </>
        </FrontEndLayout>
    );
}

export default OurHistory;
