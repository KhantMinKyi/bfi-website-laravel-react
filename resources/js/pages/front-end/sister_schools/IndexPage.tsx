import IconCardGroup from '@/components/front-end/about_us/bfi_advantages/icon-card';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import ContactBanner from '@/components/front-end/sister_schools/contact-banner';
import HeadOfSchoolMessage from '@/components/front-end/sister_schools/head-of-school-message';
import HeroBanner from '@/components/front-end/sister_schools/hero-banner';
import OverviewBanner from '@/components/front-end/sister_schools/overview-banner';
import FrontEndLayout from '@/layouts/front-end-layout';
import { carouselDataType, SisterSchool } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function IndexPage() {
    const { props } = usePage<{ data: string }>();
    const { data } = props;
    const [carouselData, setCarouselData] = useState<carouselDataType[]>([]);
    const [carouselDataLoading, setCarouselDataLoading] = useState<boolean>(true);
    const [schoolData, setSchoolData] = useState<SisterSchool>({} as SisterSchool);
    const [schoolDataLoading, setSchoolDataLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/sister_schools/school-data/' + data)
            .then((res) => res.json())
            .then((res) => {
                setCarouselData(res.banners);
                setCarouselDataLoading(false);
                setSchoolData(res.data);
                setSchoolDataLoading(false);
            });
    }, [data]);

    return (
        <FrontEndLayout>
            {carouselDataLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-screen items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <>
                    <CarouselBanner carouselData={carouselData} webUrl={schoolData.website_url} />
                    {schoolDataLoading ? (
                        <div className="container mx-auto flex justify-center gap-10">
                            <div className="flex h-screen items-center justify-center text-lg text-gray-500">
                                <DotLoading />
                            </div>
                        </div>
                    ) : (
                        <>
                            <HeroBanner
                                data={{
                                    logo: schoolData.logo,
                                    schoolName: schoolData.name,
                                    shortName: schoolData.short_name,
                                    schoolOverview: schoolData.introduction,
                                }}
                            />
                            <OverviewBanner data={{ history: schoolData.description, leadership: schoolData.leaderships }} />
                            <HeadOfSchoolMessage
                                data={{
                                    hosImg: schoolData.hos_image,
                                    hosMessage: schoolData.hos_message,
                                    logo: schoolData.logo,
                                    logo_b: schoolData.logo_b,
                                }}
                            />
                            <IconCardGroup />
                            <Counter
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
                            <ContactBanner data={{ logoUrl: schoolData.logo, logoUrlB: schoolData.logo_b, websiteLink: schoolData.website_url }} />
                        </>
                    )}
                </>
            )}
        </FrontEndLayout>
    );
}

export default IndexPage;
