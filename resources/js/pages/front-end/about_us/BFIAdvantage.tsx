import BFIAdvantageBanner from '@/components/front-end/about_us/bfi_advantages/bfi-advantange-banner';
import IconCardGroup from '@/components/front-end/about_us/bfi_advantages/icon-card';
import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import FrontEndLayout from '@/layouts/front-end-layout';
import { ImageItem } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function BFIAdvantage() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/dummy-json/advantange-page-according-images.json')
            .then((res) => res.json())
            .then((data: ImageItem[]) => {
                setImages(data);
                setImagesLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('/img/banner4.webp')", // put your image path here
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
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">BFI CORE VALUES</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <BFIAdvantageBanner />
            <IconCardGroup />

            {imagesLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <>
                    <div className="mt-4 flex flex-col items-center justify-center text-center">
                        <span className="font-base-font mb-10 text-sm font-bold text-blue-800 dark:text-green-800">WHY BFI EDUCATION SERVICES </span>
                        <h1 className="font-merriweather mb-5 text-3xl font-bold sm:text-4xl lg:text-6xl">The BFI Core Values</h1>
                        <p className="mb-4 max-w-4xl p-4 text-base leading-10 font-semibold text-gray-700 md:p-0">
                            active teaching methods and a clear focus on academic excellence. A strong community ethos and a safe and supportive
                            learning environment. BFI students have all they require to succeed.
                        </p>
                    </div>
                    <AccordionGallery images={images} />
                </>
            )}
        </FrontEndLayout>
    );
}

export default BFIAdvantage;
