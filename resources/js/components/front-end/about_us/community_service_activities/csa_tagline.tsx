import * as motion from 'motion/react-client';
function CSATagline() {
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
                    className="orico-about-text-wrap 111 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: -100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold text-white md:text-6xl">Our Community Servies</h2>
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 font-merriweather flex items-center"
                    initial={{ opacity: 0, y: 100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <p className="text-white">
                        BFI Schools believe that it is essential to contribute to its community in meaningful ways. For this purpose the school
                        promotes community service through the Creativity Action and Service (CAS) program as part of its holistic and balanced
                        international education.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default CSATagline;
