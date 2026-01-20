import DOMPurify from 'dompurify';
import * as motion from 'motion/react-client';
import { useState } from 'react';
type Props = {
    name: string;
    introduction: string;
    website_url?: string;
    social_media_banner?: string;
};
const CompetitionBanner: React.FC<Props> = ({ name, introduction, website_url, social_media_banner }) => {
    const sanitizedDescription = DOMPurify.sanitize(introduction ?? '');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-opci relative bg-cover bg-center bg-no-repeat py-20"
            style={{
                backgroundImage: "url('/img/png')", // put your image path here
                opacity: 0.9,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="container mx-auto grid grid-cols-1 items-center p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: -50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold md:text-6xl">{name}</h2>
                        {social_media_banner && (
                            <div className="group relative inline-block cursor-pointer">
                                {/* Thumbnail Image */}
                                <img
                                    src={social_media_banner}
                                    alt=""
                                    className="max-w-64 transition-transform duration-300"
                                    // onClick={() => window.open(social_media_banner, '_blank')}
                                />

                                {/* Overlay */}
                                <div
                                    onClick={() => window.open(social_media_banner, '_blank')}
                                    className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                >
                                    <span className="text-lg font-semibold text-white">Click to View</span>
                                </div>
                            </div>
                        )}
                        {/* <img src="/img/bfi_b.webp" className="hidden max-w-64 dark:block" alt="" /> */}
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: 50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="font-merriweather flex flex-col items-center">
                        <p
                            className=""
                            dangerouslySetInnerHTML={{
                                __html: sanitizedDescription,
                            }}
                        ></p>
                    </div>
                    <div className="mt-4">
                        {website_url && (
                            <a
                                href={website_url}
                                target="_blank"
                                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-800 dark:bg-green-600 hover:dark:bg-green-800"
                            >
                                {' '}
                                Go to Website
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CompetitionBanner;
