// components/HistoryProgressBar.tsx
import * as motion from 'motion/react-client';
import React from 'react';

type SchoolEvent = {
    year: string;
    title: string;
    description?: string;
};

type Props = {
    events: SchoolEvent[];
};

const HistoryProgressBar: React.FC<Props> = ({ events }) => {
    return (
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-6 px-4 py-10 md:flex-row md:items-center md:px-10 md:py-20 dark:bg-neutral-950">
            {events.map((event, index) => (
                <div key={index} className="flex flex-col items-center justify-start md:flex-row md:items-start md:gap-6">
                    {/* Circle */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }} // triggers only when in viewport
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="h-6 w-6 rounded-full border-2 border-white bg-blue-900 shadow-md md:h-8 md:w-8 dark:border-green-200 dark:bg-green-300"
                    />

                    {/* Line connecting events */}
                    {index !== events.length - 1 && (
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="mx-3 hidden w-1 bg-gray-300 md:block"
                        />
                    )}

                    {/* Event info */}
                    <div className="mt-3 text-center md:mt-0 md:mr-3 md:text-left">
                        <p className="text-lg font-bold text-blue-900 dark:text-green-500">{event.year}</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{event.title}</p>
                        {event.description && <p className="mt-1 text-sm text-gray-500">{event.description}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryProgressBar;
