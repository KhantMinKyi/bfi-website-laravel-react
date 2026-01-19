import DOMPurify from 'dompurify';
import { motion } from 'motion/react';
import GradualSpacingHeader from '../../core/gradual-spacing-header';
type Props = {
    introduction?: string;
    body?: string;
    footer?: string;
};
const AlumniInformations: React.FC<Props> = ({ introduction, body, footer }) => {
    const sanitizedIntroduction = DOMPurify.sanitize(introduction ?? '');
    const sanitizedBody = DOMPurify.sanitize(body ?? '');
    const sanitizedFooter = DOMPurify.sanitize(footer ?? '');
    return (
        <section
            className="relative z-20 flex flex-col justify-center overflow-hidden dark:bg-neutral-950"
            style={{
                backgroundImage: "url('/img/banner2.webp')", // put your image path here
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'soft-light',
            }}
        >
            {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
            <div className="flex flex-col items-center justify-center px-4 pt-10 text-center">
                <img src="/img/bfi.webp" className="max-w-40 dark:hidden" alt="" />
                <img src="/img/bfi_b.webp" className="hidden max-w-40 dark:block" alt="" />
                <div className="flex gap-2">
                    <img src="/img/bfi.webp" className="my-2 h-20" alt="" />
                </div>
            </div>
            <div className="mx-auto">
                {/* <div className="grid grid-cols-12 gap-x-4"> */}
                <div className="p-10">
                    <div className="orico-about-text font-merriweather">
                        <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                            {' '}
                            <GradualSpacingHeader text="BFI Alumni" className="z-10 text-blue-900 dark:text-green-700" />{' '}
                        </h2>
                        <motion.div
                            className="orico-about-text-wrap 111"
                            initial={{ opacity: 0, x: -50 }} // start 50px below
                            whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                            exit={{ opacity: 0, x: -50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.2 }} // trigger when 20% visible
                            transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                        >
                            {/* Should be Information Body with Text Editor  */}

                            <p
                                className="body my-4 max-w-5xl text-xl"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedIntroduction,
                                }}
                            ></p>
                            <p
                                className="body my-4 max-w-5xl text-xl"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizedBody,
                                }}
                            ></p>

                            {/* Should be Information Footer with Text Editor  */}
                            <div className="mt-10 text-center">
                                <p
                                    className="body my-4 max-w-5xl text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizedFooter,
                                    }}
                                ></p>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    );
};

export default AlumniInformations;
