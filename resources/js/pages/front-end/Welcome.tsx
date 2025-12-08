import AboutTestimonial from '@/components/front-end/core/about-testimonial';
import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import PostCarousel from '@/components/front-end/core/post-lists';
import PostLoadingSkeleton from '@/components/front-end/core/post-loading-skeleton';
import PullUpHeader from '@/components/front-end/core/pull-up-header';
import ContactBanner from '@/components/front-end/home/contact-banner';
import HeroBanner from '@/components/front-end/home/hero-banner';
import Information from '@/components/front-end/home/information';
import PhotoGallery from '@/components/front-end/home/photo-gallery';
import SisterSchoolCards from '@/components/front-end/home/sister-school-cards';
import FrontEndLayout from '@/layouts/front-end-layout';
import { CategoryTag, ImageItem, Post, Programmes } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const handleCardClick = (card: Post) => {
    router.visit(route('post-detail', { postId: card.id }));
};

const carouselData = [
    {
        bgSrc: '/img/skt_6.jpg',
        headTitle: 'BFI',
        colorTitle: 'EDUCATION',
        lastTitle: 'SERVIES.',
        subTitle: '4 Sister Schools',
        desc: 'Lorem Ipsum has been the industry`s standard text since the printer took galley make.',
        routeLink: '#',
    },

    {
        bgSrc: '/img/skt_9.jpg',
        headTitle: 'Inspiring Brilance',
        colorTitle: 'Building Brighter',
        lastTitle: 'Futures.',
        subTitle: '90% Foreign Teachers',
        desc: 'Lorem Ipsum has been the industry`s standard text since the printer took galley make.',
        routeLink: '#',
    },

    {
        bgSrc: '/img/skt_5.jpg',
        headTitle: 'WORLD-CLASS EDUCATION IN A',
        colorTitle: 'SAFE AND FRIENDLY ENVIRONMENT',
        subTitle: 'The IB Diploma Programme',
        desc: 'Lorem Ipsum has been the industry`s standard text since the printer took galley make.',
        routeLink: '#',
    },
];

function Welcome() {
    const [programmes, setProgrammes] = useState<Programmes[]>([]);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [cardsData, setCardsData] = useState<Post[]>([]);
    const [categoryTadData, setCategoryTadData] = useState<CategoryTag[]>([]);
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
        fetch('/api/home/get-post-data')
            .then((res) => res.json())
            .then((res) => {
                setCardsData(res.data);
                setCardLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/api/home/get-category-tag-data')
            .then((res) => res.json())
            .then((res) => {
                setCategoryTadData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <FrontEndLayout>
            <>
                <CarouselBanner carouselData={carouselData} />
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
                        <PostCarousel
                            posts={cardsData}
                            categories={categoryTadData}
                            onPostClick={handleCardClick}
                            // onFilterChange={handleFilterChange}
                        />
                    )}
                </div>
                <ContactBanner />
            </>
        </FrontEndLayout>
    );
}

export default Welcome;
