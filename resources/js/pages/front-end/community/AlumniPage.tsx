import AlumniInformations from '@/components/front-end/community/alumni/alumni-informations';
import AlumniPhotoGallery from '@/components/front-end/community/alumni/alumni-photo-gallery';
import ContactBanner from '@/components/front-end/home/contact-banner';
import FrontEndLayout from '@/layouts/front-end-layout';
import { Alumni } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function AlumniPage() {
    const [alumni, setAlumni] = useState<Alumni>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/community/get-alumni-data')
            .then((res) => res.json())
            .then((res) => {
                setAlumni(res.alumni);
                setLoading(false);
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
                <div className="dark:from-dark-950/90 dark:to-dark-950/90 absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-950/60" />
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                >
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center md:py-40 lg:py-52">
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Alumni</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <AlumniInformations introduction={alumni?.introduction} body={alumni?.body} footer={alumni?.footer} />
            <div className="flex flex-col justify-center gap-10 bg-white py-10">
                <h2 className="font-merriweather z-10 text-center text-3xl font-bold text-black sm:text-4xl lg:text-6xl dark:text-black">
                    Alumni all Around the World
                </h2>
                <div className="container mx-auto">
                    <img src={alumni?.banner} className="" alt="" />
                </div>
            </div>
            <AlumniPhotoGallery />
            <ContactBanner />
        </FrontEndLayout>
    );
}

export default AlumniPage;
