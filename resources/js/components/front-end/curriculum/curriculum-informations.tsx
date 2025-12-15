import { motion } from 'motion/react';
import GradualSpacingHeader from '../core/gradual-spacing-header';
function CurriculumInformations() {
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
            <div className="flex flex-col items-center justify-center px-4 pt-10 text-center">
                <img src="/img/bfi.png" className="max-w-40 dark:hidden" alt="" />
                <img src="/img/bfi_b.png" className="hidden max-w-40 dark:block" alt="" />
            </div>
            <div className="mx-auto">
                {/* <div className="grid grid-cols-12 gap-x-4"> */}
                <div className="p-10">
                    <div className="orico-about-text font-merriweather">
                        <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                            {' '}
                            <GradualSpacingHeader text="Informations" className="z-10 text-blue-900 dark:text-green-700" />{' '}
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
                            <p className="body my-4 max-w-5xl text-xl">
                                Primary is engineered for the holistic development of all its students. The school provides the highest standard of
                                individualized education by fostering a love of learning in the children. Teachers aim to raise more independent
                                learners while challenging them in a balanced way. Aiming to produce independent learners, who are able to communicate
                                effectively. Excursions and field trips that broaden the students & horizons. Projects and hands-on activities that
                                encourage students to explore, inquire, question and apply what they know. Working in an environment marked by
                                encouragement. Creating a stimulating learning environment by displaying students & work.
                            </p>
                            {/* Should be Information Footer with Text Editor  */}
                            <p className="footer my-4 max-w-5xl text-xl">
                                Primary is engineered for the holistic development of all its students. The school provides the highest standard of
                                individualized education by fostering a love of learning in the children. Teachers aim to raise more independent
                                learners while challenging them in a balanced way. Aiming to produce independent learners, who are able to communicate
                                effectively. Excursions and field trips that broaden the students & horizons. Projects and hands-on activities that
                                encourage students to explore, inquire, question and apply what they know. Working in an environment marked by
                                encouragement. Creating a stimulating learning environment by displaying students & work.
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    );
}

export default CurriculumInformations;
