import AboutTestimonial from '@/components/front-end/core/about-testimonial';
import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import PostCarousel, { PostItem } from '@/components/front-end/core/post-lists';
import PostLoadingSkeleton from '@/components/front-end/core/post-loading-skeleton';
import PullUpHeader from '@/components/front-end/core/pull-up-header';
import CarouselBanner from '@/components/front-end/home/carousel-banner';
import ContactBanner from '@/components/front-end/home/contact-banner';
import HeroBanner from '@/components/front-end/home/hero-banner';
import Information from '@/components/front-end/home/information';
import PhotoGallery from '@/components/front-end/home/photo-gallery';
import SisterSchoolCards from '@/components/front-end/home/sister-school-cards';
import FrontEndLayout from '@/layouts/front-end-layout';
import { ImageItem, Programmes } from '@/types';
import { useEffect, useState } from 'react';

const handleCardClick = (card: PostItem) => {
    alert(`You clicked: ${card.title}`);
};

const handleFilterChange = (category: string) => {
    console.log('Filter changed to:', category);
};

function home() {
    const [programmes, setProgrammes] = useState<Programmes[]>([]);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [cardsData, setCardsData] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);
    const [cardLoading, setCardLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://picsum.photos/v2/list')
            .then((res) => res.json())
            .then((data: Programmes[]) => {
                setProgrammes(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/dummy-json/homepage-according-images.json')
            .then((res) => res.json())
            .then((data: ImageItem[]) => {
                setImages(data);
                setImagesLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/dummy-json/post-items.json')
            .then((res) => res.json())
            .then((data: PostItem[]) => {
                setCardsData(data);
                setCardLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <FrontEndLayout>
            <>
                <CarouselBanner />
                <SisterSchoolCards />
                <Information />

                {imagesLoading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <DotLoading />
                        </div>
                    </div>
                ) : (
                    <AccordionGallery images={images} />
                )}
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
                <div className="container mx-auto mt-10">
                    {cardLoading ? (
                        <div className="container mx-auto">
                            <h2 className="mb-4">
                                <PullUpHeader text="Events & News" />
                            </h2>
                            <div className="flex h-[50dvh] justify-center gap-10">
                                <PostLoadingSkeleton />
                                <PostLoadingSkeleton className={'hidden md:block'} />
                                <PostLoadingSkeleton className={'hidden md:block'} />
                            </div>
                        </div>
                    ) : (
                        <PostCarousel posts={cardsData} onPostClick={handleCardClick} onFilterChange={handleFilterChange} />
                    )}
                </div>
                <ContactBanner />
            </>
        </FrontEndLayout>
    );
}

export default home;
