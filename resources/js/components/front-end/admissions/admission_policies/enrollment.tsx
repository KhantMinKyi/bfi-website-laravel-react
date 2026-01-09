import { motion } from 'motion/react';
import GradualSpacingHeader from '../../core/gradual-spacing-header';
function Enrollment() {
    return (
        <section
            className="relative z-20 flex flex-col justify-center overflow-hidden dark:bg-neutral-950 dark:bg-blend-soft-light"
            style={{
                backgroundImage: "url('/img/banner2.webp')", // put your image path here
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            {/* <div className="absolute inset-0 dark:bg-black/80"></div> */}
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <img src="/img/bfi.webp" className="max-w-40 dark:hidden" alt="" />
                <img src="/img/bfi_b.webp" className="hidden max-w-40 dark:block" alt="" />
            </div>
            <div className="mx-auto">
                {/* <div className="grid grid-cols-12 gap-x-4"> */}
                <div className="p-10">
                    <div className="orico-about-text font-merriweather">
                        <h2 className="font-merriweather text-center text-xl font-bold sm:text-2xl lg:text-4xl">
                            {' '}
                            <GradualSpacingHeader text="ENROLMENT" className="z-10 text-blue-900 dark:text-green-700" />{' '}
                        </h2>
                        <motion.div
                            className="orico-about-text-wrap 111"
                            initial={{ opacity: 0, y: 50 }} // start 50px below
                            whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                            exit={{ opacity: 0, y: 50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                        >
                            <h2 className="text-3xl">Admission Policy and Procedure</h2>
                            <p className="m-5">
                                A parent planning to enrol a student at our schools must complete the student enrolment procedure. The enrolment
                                process requires seven steps:
                            </p>
                            <p className="m-5">
                                <ol className="max-w-5xl list-inside list-decimal space-y-4 marker:text-xl marker:font-bold marker:text-blue-800 dark:marker:text-green-800">
                                    <li>
                                        <span className="text-xl font-medium">
                                            Initial meeting of the parent/guardian with school administration to go over the instructional philosophy,
                                            tuition payment, as well as a review of the school programme and facilities.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">The Pre-admission form must be completed</span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            After the approval of the pre-admission form by respective school administrators, the student is given a
                                            placement test (Fee applies).
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">The admission committee evaluates student placement test results.</span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            A short interview is conducted by administration with the applicant. A decision is made based on the test
                                            results and general impression from the interview.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">Completion of all student information forms.</span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">Return of the completed forms, along with the registration fee.</span>
                                    </li>
                                </ol>
                            </p>
                        </motion.div>

                        <motion.div
                            className="orico-about-text-wrap 111 my-10"
                            initial={{ opacity: 0, y: 50 }} // start 50px below
                            whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                            exit={{ opacity: 0, y: 50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                        >
                            <h2 className="text-3xl">Important Documents to Bring</h2>
                            <p className="m-5">Parents should bring the following materials to assist with the student’s placement:</p>
                            <p className="m-5">
                                <ol className="max-w-5xl list-inside list-decimal space-y-4 marker:text-xl marker:font-bold marker:text-blue-800 dark:marker:text-green-800">
                                    <li>
                                        <span className="text-xl font-medium">
                                            Previous scholastic records from last school attended (last two years).
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">A recommendation letter from the last school attended is needed.</span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            Evidence of date of birth or ID card, passport copy (if applicable)
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">2 photographs</span>
                                    </li>
                                </ol>
                            </p>
                        </motion.div>

                        <motion.div
                            className="orico-about-text-wrap 111 my-10"
                            initial={{ opacity: 0, y: 50 }} // start 50px below
                            whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                            exit={{ opacity: 0, y: 50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                        >
                            <p className="m-2 text-red-600">Important: School administration holds the right to deny any student’s application.</p>
                            <h2 className="text-3xl"> Admission Package</h2>
                            <p className="m-5">
                                Parents/Students/Guardians receive an Admission Package that includes documents such as the Admission Form, Tuition
                                Fee Payment Plan, Student Handbook and the yearly academic calendar.
                            </p>
                            <p className="m-5">
                                <ul className="max-w-5xl list-inside list-disc space-y-4 marker:text-xl marker:font-bold marker:text-blue-800 dark:marker:text-green-800">
                                    <li>
                                        <span className="text-xl font-medium">
                                            All of the above-mentioned forms should be filled in by every parent/guardian during
                                        </span>
                                    </li>
                                </ul>
                            </p>
                        </motion.div>

                        <motion.div
                            className="orico-about-text-wrap 111 my-10"
                            initial={{ opacity: 0, y: 50 }} // start 50px below
                            whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                            exit={{ opacity: 0, y: 50 }} // fade out and slide down
                            viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                            transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                        >
                            <h2 className="text-3xl"> Previous to enrollment.</h2>
                            <p className="m-5">
                                <ul className="max-w-5xl list-inside list-decimal space-y-4 marker:text-xl marker:font-bold marker:text-blue-800 dark:marker:text-green-800">
                                    <li>
                                        <span className="text-xl font-medium">
                                            The Medical Form should be completed and revised when enrolling in school, to show student medical
                                            conditions or illnesses or medications of which the school should be aware.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            It is important that parents fill in the important information concerning their children which includes
                                            emergency contact phone numbers, medical history, etc. In the event of any emergency, the school holds the
                                            right to admit the student to the nearest hospital, in case the parents/guardians of the student cannot be
                                            contacted.
                                        </span>
                                    </li>
                                    <li>
                                        <span className="text-xl font-medium">
                                            The School office should be notified of any changes that might affect the Admission Process.
                                        </span>
                                    </li>
                                </ul>
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    );
}

export default Enrollment;
