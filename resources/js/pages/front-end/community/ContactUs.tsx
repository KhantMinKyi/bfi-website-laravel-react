import SisterSchoolAccordion from '@/components/front-end/admissions/apply-to-sisterschools/sister-school-accordion';
import ContactForm from '@/components/front-end/contact_is/contact-form';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import FrontEndLayout from '@/layouts/front-end-layout';
import { SisterSchool } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function ContactUs() {
    const [schoolAccordions, setSchoolAccordions] = useState<SisterSchool[]>([]);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/sister_schools/get-all-sister-school')
            .then((res) => res.json())
            .then((res) => {
                setSchoolAccordions(res.data);
                setImagesLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('/img/SKT_11.webp')", // put your image path here
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
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Contact Us</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <ContactForm />
            {imagesLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <SisterSchoolAccordion
                    schoolAccordions={schoolAccordions}
                    title="Vist to Our Schools Websites"
                    body="Discover our group of schools online and learn more about their campuses, programs, admissions, and student life. "
                />
            )}
        </FrontEndLayout>
    );
}

export default ContactUs;
