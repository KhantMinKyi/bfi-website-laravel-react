import VmvStatus from '@/components/front-end/about_us/our_vmv/vmv-status';
import FrontEndLayout from '@/layouts/front-end-layout';
import { motion } from 'motion/react';
function VisionMissionValue() {
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('/img/SKT_9.webp')", // put your image path here
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
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">Our Vision , Mission & Values</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">The foundation of who we are and what we aim to achieve.</p>
                    </div>
                </motion.div>
            </div>
            {/* <div className="h-screen">VisionMissionValue</div> */}
            <motion.div
                className="orico-about-text-wrap 111"
                initial={{ opacity: 0, x: -50 }} // start 50px below
                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
            ></motion.div>
            <VmvStatus />
        </FrontEndLayout>
    );
}

export default VisionMissionValue;
