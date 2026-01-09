import CompetitionBanner from '@/components/front-end/competition/competition-banner';
import CompetitionInformations from '@/components/front-end/competition/competition-informations';
import CompetitionPhotoGallery from '@/components/front-end/competition/competition-photo-gallery';
import FrontEndLayout from '@/layouts/front-end-layout';
import { Competition } from '@/types';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const IndexPage = () => {
    const { props } = usePage<{ data: string }>();
    const { data } = props;
    const [competitionData, setCompetitionData] = useState<Competition>({} as Competition);
    const [competitionDataLoading, setCompetitionDataLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/competition/competition-data/' + data)
            .then((res) => res.json())
            .then((res) => {
                setCompetitionData(res.data);
                setCompetitionDataLoading(false);
            });
    }, [data]);
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: `url(${competitionData.banner})`, // put your image path here
                }}
            >
                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-blue-950/60" /> */}
                <div className="dark:from-dark-950/90 dark:to-dark-950/90 absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-950/60" />
                {/* Content */}
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                >
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center md:py-40 lg:py-52">
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">{competitionData.name}</h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>

            <CompetitionBanner name={competitionData.name} introduction={competitionData.introduction} />
            {/* <div className="container mx-auto flex justify-center">
                <img src={competitionData.banner} className="max-h-screen" alt="" />
            </div> */}
            <CompetitionInformations body={competitionData.body} footer={competitionData.footer} />
            <CompetitionPhotoGallery slug={competitionData.slug} />
        </FrontEndLayout>
    );
};

export default IndexPage;
