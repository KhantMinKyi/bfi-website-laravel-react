import { Link } from '@inertiajs/react';
import * as motion from 'motion/react-client';
function ContactBanner() {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat text-white"
            style={{
                backgroundImage: "url('/img/footer-banner.png')", // put your image path here
            }}
        >
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-blue-950/60" /> */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-green-800/60 dark:from-blue-950/90 dark:to-green-950/90" />
            {/* Content */}
            <motion.div
                className="orico-about-text-wrap 111"
                initial={{ opacity: 0, y: -50 }} // start 50px below
                whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                exit={{ opacity: 0, y: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
            >
                <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
                    <img src="/img/bfi.png" className="max-w-40" alt="" />
                    <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Get in Touch With Our Education Network</h2>
                    <p className="mb-6 max-w-2xl text-lg md:text-xl">
                        Get in touch with our education group — connecting schools, students, and communities for a brighter future.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <a
                            href="tel:+019410010"
                            className="my-4 cursor-pointer border-2 border-white px-4 py-2 font-semibold text-white transition hover:border-blue-900 hover:bg-blue-900 hover:text-white md:my-0 md:px-5 md:py-3 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                        >
                            Call Us
                        </a>
                        <Link
                            href={route('contact_us')}
                            className="my-4 cursor-pointer border-2 border-white px-4 py-2 font-semibold text-white transition hover:border-blue-900 hover:bg-blue-900 hover:text-white md:my-0 md:px-5 md:py-3 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ContactBanner;
