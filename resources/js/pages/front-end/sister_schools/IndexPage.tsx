import IconCardGroup from '@/components/front-end/about_us/bfi_advantages/icon-card';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import ContactBanner from '@/components/front-end/sister_schools/contact-banner';
import HeadOfSchoolMessage from '@/components/front-end/sister_schools/head-of-school-message';
import HeroBanner from '@/components/front-end/sister_schools/hero-banner';
import OverviewBanner from '@/components/front-end/sister_schools/overview-banner';
import FrontEndLayout from '@/layouts/front-end-layout';
import { carouselDataType, SisterSchoolDataType } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function IndexPage() {
    const { props } = usePage<{ data: string }>();
    const { data } = props;
    const [carouselData, setCarouselData] = useState<carouselDataType[]>([]);
    const [carouselDataLoading, setCarouselDataLoading] = useState<boolean>(true);
    const [schoolData, setSchoolData] = useState<SisterSchoolDataType>({} as SisterSchoolDataType);
    const [schoolDataLoading, setSchoolDataLoading] = useState<boolean>();

    useEffect(() => {
        fetch('/dummy-json/sister-school-carousel-' + data + '.json')
            .then((res) => res.json())
            .then((data: carouselDataType[]) => {
                setCarouselData(data);
                setCarouselDataLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/dummy-json/sister-school-overview-' + data + '.json')
            .then((res) => res.json())
            .then((data: SisterSchoolDataType) => {
                setSchoolData(data);
                setSchoolDataLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <FrontEndLayout>
            {carouselDataLoading ? (
                <div className="container mx-auto flex justify-center gap-10">
                    <div className="flex h-60 items-center justify-center text-lg text-gray-500">
                        <DotLoading />
                    </div>
                </div>
            ) : (
                <>
                    <CarouselBanner carouselData={carouselData} />
                    <HeroBanner
                        data={{
                            logo: schoolData.logoUrl,
                            schoolName: schoolData.schoolName,
                            shortName: schoolData.shortName,
                            schoolOverview: schoolData.schoolOverview,
                        }}
                    />
                    <OverviewBanner data={{ history: schoolData.history, leadership: schoolData.leadership }} />
                    <HeadOfSchoolMessage data={{ hosImg: schoolData.hosImg, hosMessage: schoolData.hosMessage }} />
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
                    <ContactBanner data={{ logoUrl: schoolData.logoUrl, logoUrlB: schoolData.logoUrlB, websiteLink: schoolData.websiteLink }} />
                </>
            )}
        </FrontEndLayout>
    );
}

export default IndexPage;
