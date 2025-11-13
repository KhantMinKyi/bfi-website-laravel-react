import { SisterSchoolOverViewType } from '@/types';
import * as motion from 'motion/react-client';

interface OverviewBannerProps {
    data: SisterSchoolOverViewType;
}
const OverviewBanner = ({ data }: OverviewBannerProps) => {
    return (
        <div className="relative bg-blue-950 py-20 dark:bg-green-950">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="mx-auto grid grid-cols-1 p-10 md:grid-cols-3 lg:container">
                <motion.div
                    className="orico-about-text-wrap 111 flex flex-col items-center justify-center md:col-span-2"
                    initial={{ opacity: 0, y: -100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold text-white md:text-6xl">Welcome</h2>
                        <p className="font-merriweather my-10 pr-4 text-lg text-white md:text-xl">{data.history}</p>
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 font-merriweather flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <p className="text-2xl text-blue-100">School's Leadership</p>
                    <div className="grid gap-4 pt-10 md:grid-cols-2">
                        {data.leadership.map((l, i) => (
                            <div className="flex items-center justify-center" key={i}>
                                <img src={l} alt="Image 1" className="h-28 w-28 rounded-full object-cover lg:h-40 lg:w-40" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OverviewBanner;
