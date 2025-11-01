import AboutTestimonial from '@/components/front-end/core/about-testimonial';
import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import CarouselBanner from '@/components/front-end/home/carousel-banner';
import HeroBanner from '@/components/front-end/home/hero-banner';
import Information from '@/components/front-end/home/information';
import PhotoGallery from '@/components/front-end/home/photo-gallery';
import SisterSchoolCards from '@/components/front-end/home/sister-school-cards';
import FrontEndLayout from '@/layouts/front-end-layout';
import { Programmes } from '@/types';
import { useEffect, useState } from 'react';

function home() {
    const [programmes, setProgrammes] = useState<Programmes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // const timer = setTimeout(() => {
        fetch('https://picsum.photos/v2/list')
            .then((res) => res.json())
            .then((data: Programmes[]) => {
                setProgrammes(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        // }, 2000); // 2-second delay

        // return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
        <FrontEndLayout>
            <>
                <CarouselBanner />
                <SisterSchoolCards />
                <Information />
                <AccordionGallery />
                {loading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <DotLoading />
                        </div>
                    </div>
                ) : (
                    <EducationProgramme programmes={programmes} />
                )}
                <Counter />
                <AboutTestimonial />
                <HeroBanner />
                <PhotoGallery />
            </>
        </FrontEndLayout>
    );
}

export default home;
