import { SisterSchoolBannerType } from '@/types';
import * as motion from 'motion/react-client';
import React from 'react';

interface HeroBannerProps {
    data: SisterSchoolBannerType;
}
const HeroBanner: React.FC<HeroBannerProps> = ({ data }) => {
    return (
        <div className="relative py-20">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-green-300/30 dark:from-blue-950/30 dark:to-green-950/30" />
            <div className="container mx-auto grid grid-cols-1 p-10 md:grid-cols-1">
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: -50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-center text-4xl font-bold xl:text-6xl">{data.schoolName}</h2>
                        <img src={data.logo} className="max-w-64 xl:max-w-80" alt="SKT Riverside Logo" />
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: 50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'anticipate' }} // longer duration
                >
                    <div className="font-merriweather flex flex-col items-center">
                        <p className="font-merriweather my-6 rounded-2xl px-4 py-2 text-center text-xl font-bold text-blue-900 shadow-2xl md:text-2xl dark:text-green-800 dark:shadow-gray-950">
                            {data.shortName} — Where Bright Minds Grow
                        </p>
                        <p className="font-merriweather mt-2 text-lg italic md:text-xl">{data.schoolOverview}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
