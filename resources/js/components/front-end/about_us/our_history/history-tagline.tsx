import * as motion from 'motion/react-client';
function HistoryTagline() {
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
                    className="orico-about-text-wrap 111 font-merriweather flex items-center"
                    initial={{ opacity: 0, x: 100 }} // start 100px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: 100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <p className="text-white">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis
                        dignissimos aut ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis dignissimos aut ipsam nostrum officiis
                        placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit amet consectetur, adipisicing
                    </p>
                </motion.div>
                <motion.div
                    className="orico-about-text-wrap 111 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, x: -100 }} // start 100px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -100 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 40% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold text-white md:text-6xl">Our Heritage</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default HistoryTagline;
