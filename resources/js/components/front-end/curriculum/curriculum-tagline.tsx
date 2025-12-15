import * as motion from 'motion/react-client';
function CurriculumTagline() {
    return (
        <div
            className="relative bg-blue-950 py-20 dark:bg-green-950"
            // style={{
            //     backgroundImage: "url('/img/history-banner-backdrop.png')", // put your image path here
            //     opacity: 0.9,
            // }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="container mx-auto grid grid-cols-1 p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: -100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold text-white md:text-6xl">Pre School</h2>
                    </div>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 font-merriweather flex items-center"
                    initial={{ opacity: 0, y: 100 }} // start 100px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: 100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <p className="text-center text-base text-white md:text-left md:text-xl">
                        A theme-based approach links the topics to different subjects such as: Music and Movement, Story & Music, Language & Literacy,
                        Math, Science, Fine Arts, Drawing & Painting, ICT, Physical development: Large motor skills, sand and water, Blocks,
                        Gymnastics/Swimming & Various Sports, Health & Safety, Drama.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default CurriculumTagline;
