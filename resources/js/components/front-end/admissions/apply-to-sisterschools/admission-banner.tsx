import * as motion from 'motion/react-client';
function AdmissionBanner() {
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
                        <h2 className="font-merriweather my-10 text-2xl font-bold md:text-4xl">The Enrolment Process</h2>
                        <img src="/img/bfi.png" className="max-w-64 dark:hidden" alt="" />
                        <img src="/img/bfi_b.png" className="hidden max-w-64 dark:block" alt="" />
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 flex flex-col justify-center"
                    initial={{ opacity: 0, y: 50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="font-merriweather">
                        <p className="font-merriweather my-10 border-l-4 border-l-blue-800 pl-4 text-2xl font-bold text-blue-800 md:text-4xl dark:border-l-green-800 dark:text-green-800">
                            Welcome to Our Learning Community
                        </p>
                        <p>
                            Choosing the right school for your child is an important step in shaping their future. At BFI Group of Schools , we are
                            committed to providing a nurturing and dynamic learning environment that fosters academic excellence, creativity, and
                            personal growth. Our admissions process is designed to help families understand what makes our school unique. We encourage
                            you to visit our campus, meet our dedicated educators, and experience firsthand the engaging and supportive atmosphere
                            that defines our community. Let us guide you through each step to ensure a smooth and informed enrollment journey for your
                            child.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default AdmissionBanner;
