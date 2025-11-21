import { motion } from 'motion/react';
import GradualSpacingHeader from '../../core/gradual-spacing-header';
function HowToApply() {
    return (
        <section
            className="relative z-20 flex flex-col justify-center overflow-hidden dark:bg-neutral-950"
            style={{
                backgroundImage: "url('/img/banner2.png')", // put your image path here
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'soft-light',
            }}
        >
            {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <img src="/img/bfi.png" className="max-w-40 dark:hidden" alt="" />
                <img src="/img/bfi_b.png" className="hidden max-w-40 dark:block" alt="" />
            </div>
            <div className="mx-auto">
                {/* <div className="grid grid-cols-12 gap-x-4"> */}
                <div className="p-10">
                    <div className="orico-about-text font-merriweather">
                        <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                            {' '}
                            <GradualSpacingHeader text="How To Apply" className="z-10 text-blue-900 dark:text-green-700" />{' '}
                        </h2>
                        <motion.div
                            className="orico-about-text-wrap 111"
                            initial={{ opacity: 0, x: -50 }} // start 50px below
                            whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                            exit={{ opacity: 0, x: -50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 1, ease: 'easeInOut' }} // longer duration
                        >
                            <p className="m-5">
                                <ol className="max-w-5xl list-inside list-decimal space-y-4 marker:text-xl marker:font-bold marker:text-blue-800 dark:marker:text-green-800">
                                    <li>
                                        <span className="text-xl font-medium">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quo, repellat ex beatae similique
                                            distinctio quibusdam magni suscipit dolorum quisquam consequuntur veniam aperiam id voluptatem hic?
                                            Tempore fugiat expedita quaerat?
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quo, repellat ex beatae similique
                                            distinctio quibusdam magni suscipit dolorum quisquam consequuntur veniam aperiam id voluptatem hic?
                                            Tempore fugiat expedita quaerat?
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quo, repellat ex beatae similique
                                            distinctio quibusdam magni suscipit dolorum quisquam consequuntur veniam aperiam id voluptatem hic?
                                            Tempore fugiat expedita quaerat?
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quo, repellat ex beatae similique
                                            distinctio quibusdam magni suscipit dolorum quisquam consequuntur veniam aperiam id voluptatem hic?
                                            Tempore fugiat expedita quaerat?
                                        </span>
                                    </li>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quo, repellat ex beatae similique
                                        distinctio quibusdam magni suscipit dolorum quisquam consequuntur veniam aperiam id voluptatem hic? Tempore
                                        fugiat expedita quaerat?
                                    </p>
                                </ol>
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    );
}

export default HowToApply;
