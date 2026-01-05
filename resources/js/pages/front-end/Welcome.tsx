import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import PostCarousel from '@/components/front-end/core/post-lists';
import PostLoadingSkeleton from '@/components/front-end/core/post-loading-skeleton';
import PullUpHeader from '@/components/front-end/core/pull-up-header';
import ContactBanner from '@/components/front-end/home/contact-banner';
import Information from '@/components/front-end/home/information';
import PhotoGallery from '@/components/front-end/home/photo-gallery';
import SisterSchoolCards from '@/components/front-end/home/sister-school-cards';
import FrontEndLayout from '@/layouts/front-end-layout';
import { CategoryTag, Curriculum, ImageItem, Post } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const handleCardClick = (card: Post) => {
    router.visit(route('post-detail', { postId: card.id }));
};

const carouselData = [
    {
        banner_image: '/img/skt_6.jpg',
        title: 'BFI',
        bottom_sub_title: 'EDUCATION SERVIES.',
        top_sub_title: '4 Sister Schools',
    },

    {
        banner_image: '/img/skt_9.jpg',
        title: 'Inspiring Brilance',
        bottom_sub_title: 'Building Brighter Futures.',
        top_sub_title: '90% Foreign Teachers',
    },

    {
        banner_image: '/img/skt_5.jpg',
        title: 'WORLD-CLASS EDUCATION IN A',
        bottom_sub_title: 'SAFE AND FRIENDLY ENVIRONMENT',
        top_sub_title: 'The IB Diploma Programme',
    },
];

function Welcome() {
    const [curriculum, setCurriculum] = useState<Curriculum[]>([]);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [cardsData, setCardsData] = useState<Post[]>([]);
    const [categoryTadData, setCategoryTadData] = useState<CategoryTag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [imagesLoading, setImagesLoading] = useState<boolean>(true);
    const [cardLoading, setCardLoading] = useState<boolean>(true);

    const pageTitle = 'BFI Education Services ';
    const pageDescription =
        'BFI Education Services manages 4+ international sister schools across Myanmar, offering world-class programmes, foreign teachers, IB Diploma pathways, events, and admissions support.';
    const canonicalUrl = useMemo(() => {
        try {
            return route('home');
        } catch (_e) {
            return '';
        }
    }, []);

    const structuredData = useMemo(
        () => ({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'BFI Education Services',
            url: canonicalUrl || undefined,
            description: pageDescription,
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'No.235, Shu Khinn Thar Myo Pat Road, Thaketa',
                addressLocality: 'Yangon',
                addressCountry: 'MM',
            },
            telephone: '019410010',
            email: 'contact@bfi.edu.mm',
            numberOfEmployees: '200+',
            department: [
                {
                    '@type': 'School',
                    name: 'BFI Sister Schools',
                    description: 'Network of 4-8 international sister schools operated by BFI Education Services.',
                },
            ],
        }),
        [canonicalUrl, pageDescription],
    );

    useEffect(() => {
        fetch('/api/education/get-all-curriculum')
            .then((res) => res.json())
            .then((res) => {
                setCurriculum(res.data);
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
        fetch('/api/home/get-post-data?limit=6')
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
                <Head title={pageTitle}>
                    <meta name="description" content={pageDescription} />
                    {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
                    <meta name="robots" content="index,follow" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={pageDescription} />
                    <meta property="og:url" content={canonicalUrl} />
                    <meta property="og:image" content="/img/bfi.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={pageTitle} />
                    <meta name="twitter:description" content={pageDescription} />
                    <meta name="twitter:image" content="/img/bfi.png" />
                    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                </Head>
                <h1 className="sr-only">{pageTitle}</h1>
                <CarouselBanner carouselData={carouselData} />
                <SisterSchoolCards />
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
                    <EducationProgramme curriculums={curriculum} />
                )}
                <Counter />
                {/* <AboutTestimonial /> */}
                <PhotoGallery />

                <ContactBanner />
            </>
        </FrontEndLayout>
    );
}

export default Welcome;
