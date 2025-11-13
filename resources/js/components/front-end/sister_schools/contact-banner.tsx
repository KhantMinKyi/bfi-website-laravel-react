import { SisterSchoolContactBannerType } from '@/types';
import * as motion from 'motion/react-client';
interface ContactBannerProps {
    data: SisterSchoolContactBannerType;
}
const ContactBanner = ({ data }: ContactBannerProps) => {
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
                initial={{ opacity: 0, x: -50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
            >
                <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
                    <img src={data.logoUrl} className="max-w-52 dark:hidden" alt="" />
                    <img src={data.logoUrlB} className="hidden max-w-52 dark:block" alt="" />
                    <h2 className="font-merriweather mb-4 text-3xl font-bold text-gray-800 md:text-5xl dark:text-white">Discover more</h2>
                    <p className="md:text-xltext-gray-800 mb-6 max-w-2xl text-lg text-gray-700 dark:text-gray-200">
                        Get in touch with our education group — connecting schools, students, and communities for a brighter future.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <a
                            href={data.websiteLink}
                            target="__blank"
                            className="my-4 cursor-pointer border-2 border-white px-4 py-2 font-semibold text-white transition hover:border-blue-900 hover:bg-blue-900 hover:text-white md:my-0 md:px-5 md:py-3 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                        >
                            Visit to Our Website
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactBanner;
