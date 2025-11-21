import Enrollment from '@/components/front-end/admissions/admission_policies/enrollment';
import PolicyCardGroup from '@/components/front-end/admissions/admission_policies/policy-card-group';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import FrontEndLayout from '@/layouts/front-end-layout';
import { policyCardType } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function AdmissionPolicies() {
    const [policyCard, setPolicyCard] = useState<policyCardType[]>([]);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch('/dummy-json/sister-school-accordions-2.json')
            .then((res) => res.json())
            .then((data: policyCardType[]) => {
                setPolicyCard(data);
                setImagesLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <FrontEndLayout>
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
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Admissions Policies</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <Enrollment />
            {imagesLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <PolicyCardGroup policyCard={policyCard} />
            )}
        </FrontEndLayout>
    );
}

export default AdmissionPolicies;
