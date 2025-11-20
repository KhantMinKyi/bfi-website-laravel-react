import * as motion from 'motion/react-client';
function HistoryBanner() {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat py-20"
            style={{
                backgroundImage: "url('/img/history-banner-backdrop.png')", // put your image path here
                opacity: 0.9,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r dark:from-blue-900/10 dark:to-green-900/10" />
            <div className="container mx-auto grid grid-cols-1 p-10 md:grid-cols-2">
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, y: -50 }} // start 50px below
                    whileInView={{ opacity: 1, y: 1 }} // slide up and fade in
                    exit={{ opacity: 0, y: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 1, ease: 'anticipate' }} // longer duration
                >
                    <div className="flex flex-col items-center">
                        <h2 className="font-merriweather my-10 text-4xl font-bold md:text-6xl">Our Journey</h2>
                        <img src="/img/bfi.png" className="max-w-64 dark:hidden" alt="BFI Logo" />
                        <img src="/img/bfi_b.png" className="hidden max-w-64 dark:block" alt="BFI Logo" />
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
                        <p className="my-10 border-l-4 border-l-blue-800 pl-4 text-blue-800 dark:border-l-green-800 dark:text-green-800">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum
                            perferendis dignissimos aut ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum
                            perferendis dignissimos aut ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit
                            amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis dignissimos aut
                            ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis dignissimos aut ipsam nostrum officiis placeat
                            odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam explicabo in eum
                            fuga, illum ipsa mollitia cum perferendis dignissimos aut ipsam nostrum officiis placeat odit a corrupti! Soluta, esse
                            repellat. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum
                            perferendis dignissimos aut ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit
                            amet consectetur, adipisicing elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis dignissimos aut
                            ipsam nostrum officiis placeat odit a corrupti! Soluta, esse repellat. Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Magnam explicabo in eum fuga, illum ipsa mollitia cum perferendis dignissimos aut ipsam nostrum officiis placeat
                            odit a corrupti! Soluta, esse repellat.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default HistoryBanner;
