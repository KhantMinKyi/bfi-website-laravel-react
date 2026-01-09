import CASProgramCardGroup from '@/components/front-end/about_us/community_service_activities/cas_program_card_group';
import CSATagline from '@/components/front-end/about_us/community_service_activities/csa_tagline';
import DonationCardGroup from '@/components/front-end/about_us/community_service_activities/donation_card_group';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import FrontEndLayout from '@/layouts/front-end-layout';
import { CSADataType } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function CommunityServiceActivities() {
    const [DonationData, setDonationData] = useState<CSADataType[]>([]);
    const [donationDataLoading, setDonationDataLoading] = useState<boolean>(false);
    const [CASProgramData, setCASProgramData] = useState<CSADataType[]>([]);
    const [CASProgramDataLoading, setCASProgramDataLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/about_us/get-csa-data/1')
            .then((res) => res.json())
            .then((res) => {
                setDonationData(res.data);
                setDonationDataLoading(false);
            });
        fetch('/api/about_us/get-csa-data/0')
            .then((res) => res.json())
            .then((res) => {
                setCASProgramData(res.data);
                setCASProgramDataLoading(false);
            });
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
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Community Service Activities</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <CSATagline />
            {donationDataLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <DonationCardGroup DonationData={DonationData} />
            )}
            {CASProgramDataLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <CASProgramCardGroup CASProgramData={CASProgramData} />
            )}
        </FrontEndLayout>
    );
}

export default CommunityServiceActivities;
