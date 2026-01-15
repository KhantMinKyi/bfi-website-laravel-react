'use client';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import HeroBanner from '@/components/front-end/sister_schools/hero-banner';
import OverviewBanner from '@/components/front-end/sister_schools/overview-banner';
import FrontEndLayout from '@/layouts/front-end-layout';
import type { carouselDataType, SisterSchool } from '@/types';
import { usePage } from '@inertiajs/react';
import { lazy, memo, Suspense, useEffect, useState } from 'react';

const LazyCounter = lazy(() => import('@/components/front-end/core/counter'));
const LazyContactBanner = lazy(() => import('@/components/front-end/sister_schools/contact-banner'));
const LazyIconCardGroup = lazy(() => import('@/components/front-end/about_us/bfi_advantages/icon-card'));

function LazyLoadingSkeleton() {
    return (
        <div className="container mx-auto flex justify-center gap-10 py-20">
            <div className="flex items-center justify-center text-lg text-gray-500">
                <DotLoading />
            </div>
        </div>
    );
}

const MainHeader = memo(({ carouselData, schoolData }: any) => (
    <>
        <CarouselBanner carouselData={carouselData} webUrl={schoolData.website_url} />
        <HeroBanner
            data={{
                logo: schoolData.logo,
                schoolName: schoolData.name,
                shortName: schoolData.short_name,
                schoolOverview: schoolData.introduction,
            }}
        />
        <OverviewBanner
            data={{ history: schoolData.description, leadership: schoolData.leaderships, related_campuses: schoolData.related_campuses }}
        />
        {/* <HeadOfSchoolMessage
            data={{
                hosMessage: schoolData.hos_message,
                logo: schoolData.logo,
                logo_b: schoolData.logo_b,
            }}
        /> */}
    </>
));

MainHeader.displayName = 'MainHeader';

function IndexPage() {
    const { props } = usePage<{ data: string }>();
    const { data } = props;
    const [carouselData, setCarouselData] = useState<carouselDataType[]>([]);
    const [schoolData, setSchoolData] = useState<SisterSchool | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/sister_schools/school-data/${data}`);
                if (!response.ok) throw new Error('Failed to fetch school data');

                const result = await response.json();
                setCarouselData(result.banners || []);
                setSchoolData(result.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [data]);

    if (error) {
        return (
            <FrontEndLayout>
                <div className="container mx-auto flex justify-center py-20">
                    <div className="text-center text-red-500">
                        <p>Error loading page: {error}</p>
                    </div>
                </div>
            </FrontEndLayout>
        );
    }

    return (
        <FrontEndLayout>
            {isLoading ? (
                <div className="container mx-auto flex justify-center py-20">
                    <LazyLoadingSkeleton />
                </div>
            ) : schoolData ? (
                <>
                    {/* Critical content - loads immediately */}
                    <MainHeader carouselData={carouselData} schoolData={schoolData} />

                    <Suspense fallback={<LazyLoadingSkeleton />}>
                        <LazyIconCardGroup />
                    </Suspense>

                    {/* <Suspense fallback={<LazyLoadingSkeleton />}>
                        <LazyCounter
                            data={{
                                firstNumber: 160,
                                firstTitle: 'students',
                                secondNumber: 300,
                                secondTitle: 'Alumini Worldwide',
                                thirdNumber: 92,
                                thirdTitle: 'Foreign Teachers',
                                fourthNumber: 163,
                                fourthTitle: 'Winning Award',
                            }}
                        />
                    </Suspense> */}

                    <Suspense fallback={<LazyLoadingSkeleton />}>
                        <LazyContactBanner data={{ logoUrl: schoolData.logo, logoUrlB: schoolData.logo_b, websiteLink: schoolData.website_url }} />
                    </Suspense>
                </>
            ) : (
                <div className="container mx-auto flex justify-center py-20">
                    <div className="text-center text-gray-500">No data available</div>
                </div>
            )}
        </FrontEndLayout>
    );
}

export default IndexPage;
