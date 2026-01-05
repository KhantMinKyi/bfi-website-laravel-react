import { SisterSchool, TeamCardType } from '@/types';
import { motion } from 'motion/react';
import React from 'react';
type Props = {
    schoolAccordions: SisterSchool[];
    title?: string;
    body?: string;
};
const SisterSchoolAccordion: React.FC<Props> = ({ schoolAccordions, title = null, body = null }) => {
    return (
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 dark:bg-gray-950">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                            <h2 className="font-merriweather text-dark mb-3 text-3xl leading-[1.2] font-bold sm:text-4xl md:text-[40px] dark:text-white">
                                {title ? title : 'Applying to BFI Sister Schools'}
                            </h2>
                            <p className="text-body-color font-merriweather text-base text-blue-800 dark:text-green-800">
                                {body ? body : 'Click the image and check out what our sister school has to offer'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center">
                    {schoolAccordions.map((t, i) => (
                        <motion.div
                            className="orico-about-text-wrap 111"
                            key={i}
                            initial={{ opacity: 0, y: -50 }} // start 50px below
                            whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                            exit={{ opacity: 0, y: -50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: (i + 1) * 0.2, ease: 'easeInOut' }} // longer duration
                        >
                            <SisterSchoolAccordionCard name={t.name} imagesrc={t.logo} websiteUrl={t.website_url} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SisterSchoolAccordion;

const SisterSchoolAccordionCard: React.FC<TeamCardType> = ({ imagesrc, name, websiteUrl }) => {
    return (
        <>
            <a className="w-full cursor-pointer px-4 md:w-1/2 xl:w-1/4" href={websiteUrl} target="__blank">
                <div className="mx-auto mb-10 w-44 max-w-[370px] md:w-84">
                    <div
                        className="relative overflow-hidden rounded-lg transition-all hover:scale-110"
                        style={{
                            backgroundImage: `url(${imagesrc})`, // put your image path here
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="h-56 w-44 md:h-96 md:w-84"> </div>
                        {/* <img src={imagesrc} alt="" className="h-56 w-44 md:h-96 md:w-84" /> */}
                        <div className="absolute bottom-5 left-0 w-44 text-center md:w-84">
                            <div className="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-gray-900">
                                <h3 className="text-dark text-base font-semibold md:text-lg">{name}</h3>
                                {/* <p className="text-body-color text-xs text-blue-800 dark:text-green-800">{profession}</p> */}
                                <div>
                                    <span className="absolute bottom-0 left-0">
                                        <svg width={61} height={30} viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx={16} cy={45} r={45} fill="#13C296" fillOpacity="0.11" />
                                        </svg>
                                    </span>
                                    <span className="absolute top-0 right-0">
                                        <svg width={20} height={25} viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#3056D3" />
                                            <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#3056D3" />
                                            <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#3056D3" />
                                            <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#3056D3" />
                                            <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#3056D3" />
                                            <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#3056D3" />
                                            <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#3056D3" />
                                            <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#3056D3" />
                                            <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#3056D3" />
                                            <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#3056D3" />
                                            <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#3056D3" />
                                            <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#3056D3" />
                                            <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#3056D3" />
                                            <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#3056D3" />
                                            <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#3056D3" />
                                            <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#3056D3" />
                                            <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#3056D3" />
                                            <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#3056D3" />
                                            <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#3056D3" />
                                            <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#3056D3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
};
