import { SisterSchoolHOSMessageType } from '@/types';
import * as motion from 'motion/react-client';

interface HeadOfSchoolMessageProps {
    data: SisterSchoolHOSMessageType;
}
const HeadOfSchoolMessage = ({ data }: HeadOfSchoolMessageProps) => {
    return (
        <div>
            <section
                className="relative z-20 flex flex-col justify-center overflow-hidden dark:bg-neutral-950"
                style={{
                    backgroundImage: "url('/img/footer-banner.png')", // put your image path here
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center md:py-10 lg:py-10">
                    <img src={data.hosImg} className="h-40 w-40 rounded-full object-cover md:h-52 md:w-52 lg:h-80 lg:w-80" alt="" />
                </div>
                <div className="mx-auto max-w-7xl">
                    {/* <div className="grid grid-cols-12 gap-x-4"> */}
                    <div className="p-10">
                        <div className="orico-about-text font-merriweather">
                            <h2 className="font-merriweather mb-4 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
                                Head of School's Message
                            </h2>

                            <motion.div
                                className=""
                                initial={{ opacity: 0, x: -50 }} // start 50px below
                                whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                                exit={{ opacity: 0, x: -50 }} // fade out and slide down
                                viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                                transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                            >
                                <p className="mb-5 text-lg italic">{data.hosMessage}</p>
                            </motion.div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <motion.div
                    className="absolute top-1/8 left-[40px] -z-10 -translate-y-1/8"
                    initial={{ opacity: 0, x: 50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_riverside_campus.png" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.png" alt="" className="hidden w-60 rotate-6 opacity-20 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-1/8 right-[40px] -z-10 -translate-y-1/8"
                    initial={{ opacity: 0, x: 50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_riverside_campus.png" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.png" alt="" className="hidden w-60 -rotate-z-6 opacity-20 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 left-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_riverside_campus.png" alt="" className="w-60 -rotate-z-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.png" alt="" className="hidden w-60 -rotate-z-6 opacity-20 dark:block" />
                </motion.div>
                <motion.div
                    className="absolute top-8/8 right-[40px] -z-10 -translate-y-8/8"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                >
                    <img src="/img/skt_riverside_campus.png" alt="" className="w-60 rotate-6 opacity-20 dark:hidden" />
                    <img src="/img/skt_riverside_campus_b.png" alt="" className="hidden w-60 rotate-6 opacity-20 dark:block" />
                </motion.div>
            </section>
        </div>
    );
};

export default HeadOfSchoolMessage;
