import * as motion from 'motion/react-client';
function BFIAdvantageBanner() {
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
                        <h2 className="font-merriweather my-10 text-4xl font-bold md:text-6xl">Why BFI?</h2>
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
                        <p className="font-merriweather my-10 border-l-4 border-l-blue-800 pl-4 text-4xl font-bold text-blue-800 md:text-6xl dark:border-l-green-800 dark:text-green-800">
                            What is The BFI Advantage?
                        </p>
                        <p>
                            BFI offers a strong and trusted education network through its group of four or more sister international schools. This
                            connection allows students to benefit from shared academic standards, experienced leadership teams, and proven teaching
                            practices across all campuses. BFI schools provide a consistent, high-quality learning environment while respecting each
                            campus’s unique culture and community. With access to shared resources, teacher training, and student development
                            programs, BFI ensures stability, innovation, and continuous improvement. Parents can trust BFI to deliver a globally
                            focused education that prepares students for future academic success and life beyond the classroom.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default BFIAdvantageBanner;
