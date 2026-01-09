'use client';

import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import PostCarousel from '@/components/front-end/core/post-lists';
import PostLoadingSkeleton from '@/components/front-end/core/post-loading-skeleton';
import FrontEndLayout from '@/layouts/front-end-layout';
import type { Post } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
const PhotoGallery = React.lazy(() => import('@/components/front-end/home/photo-gallery'));
const Information = React.lazy(() => import('@/components/front-end/home/information'));
const ContactBanner = React.lazy(() => import('@/components/front-end/home/contact-banner'));
const CarouselBanner = React.lazy(() => import('@/components/front-end/core/carousel-banner'));
const AccordionGallery = React.lazy(() => import('@/components/front-end/core/accordion-gallery'));
const SisterSchoolCards = React.lazy(() => import('@/components/front-end/home/sister-school-cards'));

const useFetchData = (url: string, initialState: any = null) => {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
                const result = await response.json();
                if (isMounted) {
                    setData(result.data || result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
};

const Welcome = () => {
    const pageTitle = 'BFI Education Services ';
    const pageDescription =
        'BFI Education Services manages 4+ international Group of schools across Myanmar, offering world-class programmes, foreign teachers, IB Diploma pathways, events, and admissions support.';

    const canonicalUrl = useMemo(() => {
        try {
            return route('home');
        } catch (_e) {
            return '';
        }
    }, []);

    const { data: curriculum = [], loading: curriculumLoading, error: curriculumError } = useFetchData('/api/education/get-all-curriculum', []);
    const { data: images = [], loading: imagesLoading, error: imagesError } = useFetchData('/dummy-json/homepage-according-images.json', []);
    const { data: cardsData = [], loading: cardLoading, error: cardsError } = useFetchData('/api/home/get-post-data?limit=6', []);
    const { data: categoryTagData = [], loading: categoryLoading, error: categoryError } = useFetchData('/api/home/get-category-tag-data', []);

    const handleCardClick = (card: Post) => {
        router.visit(route('post-detail', { postId: card.id }));
    };

    const carouselData = [
        {
            banner_image: '/img/SKT_6.webp',
            title: 'BFI',
            bottom_sub_title: 'EDUCATION SERVIES.',
            top_sub_title: '9 Group of Schools',
        },
        {
            banner_image: '/img/SKT_9.webp',
            title: 'Inspiring Brilance',
            bottom_sub_title: 'Building Brighter Futures.',
            top_sub_title: '90% Foreign Teachers',
        },
        {
            banner_image: '/img/SKT_5.webp',
            title: 'WORLD-CLASS EDUCATION IN A',
            bottom_sub_title: 'SAFE AND FRIENDLY ENVIRONMENT',
            top_sub_title: 'The IB Diploma Programme',
        },
    ];

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
                    name: 'BFI Group of Schools',
                    description: 'Network of 9 international schools operated by BFI Education Services.',
                },
            ],
        }),
        [canonicalUrl, pageDescription],
    );

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
                <Suspense fallback={<DotLoading />}>
                    <CarouselBanner carouselData={carouselData} />
                </Suspense>
                <Suspense fallback={<DotLoading />}>
                    <SisterSchoolCards />
                </Suspense>

                <div className="container mx-auto mt-10">
                    {cardLoading ? (
                        <div className="flex h-[50dvh] justify-center gap-10">
                            <PostLoadingSkeleton />
                            <PostLoadingSkeleton className={'hidden md:block'} />
                            <PostLoadingSkeleton className={'hidden md:block'} />
                        </div>
                    ) : cardsError ? (
                        <div className="flex h-[50dvh] items-center justify-center text-red-500">Failed to load posts. Please try again.</div>
                    ) : (
                        <PostCarousel posts={cardsData} categories={categoryTagData} onPostClick={handleCardClick} />
                    )}
                </div>
                <Suspense fallback={<DotLoading />}>
                    <Information />
                </Suspense>
                {imagesLoading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <DotLoading />
                        </div>
                    </div>
                ) : imagesError ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-red-500">Failed to load gallery. Please try again.</div>
                    </div>
                ) : (
                    <Suspense fallback={<DotLoading />}>
                        <AccordionGallery images={images} />
                    </Suspense>
                )}

                {curriculumLoading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <DotLoading />
                        </div>
                    </div>
                ) : curriculumError ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-red-500">
                            Failed to load education programmes. Please try again.
                        </div>
                    </div>
                ) : (
                    <EducationProgramme curriculums={curriculum} />
                )}

                <Counter />
                <Suspense fallback={<DotLoading />}>
                    <PhotoGallery />
                </Suspense>
                <Suspense fallback={<DotLoading />}>
                    <ContactBanner />
                </Suspense>
            </>
        </FrontEndLayout>
    );
};

export default Welcome;
