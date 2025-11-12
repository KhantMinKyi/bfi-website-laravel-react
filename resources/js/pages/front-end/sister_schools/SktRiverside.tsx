import CarouselBanner from '@/components/front-end/core/carousel-banner';
import HeroBanner from '@/components/front-end/sister_schools/hero-banner';
import OverviewBanner from '@/components/front-end/sister_schools/overview-banner';
import FrontEndLayout from '@/layouts/front-end-layout';
const carouselData = [
    {
        bgSrc: '/img/skt-rc-3.webp',
        headTitle: 'SKT International School',
        colorTitle: 'Riverside',
        lastTitle: 'Campus',
        subTitle: 'BFI Sister School',
        desc: 'SKT International Riverside Campus was established in the year 2010, located on Shukhinthar Mayopat Road, Yangon.',
        routeLink: '#',
    },

    {
        bgSrc: '/img/skt-rc-2.webp',
        headTitle: 'WORLD-CLASS EDUCATION IN A',
        colorTitle: 'SAFE AND FRIENDLY ENVIRONMENT',
        subTitle: '90% Foreign Teachers',
        desc: 'We empower our students to join world-class universities and become lifelong learners and compassionate global citizens.',
        routeLink: '#',
    },
    {
        bgSrc: '/img/skt-rc-1.webp',
        headTitle: 'The IB Diploma ',
        colorTitle: 'Programme',
        subTitle: 'Quality Education',
        desc: 'Empowering students with a well-rounded curriculum, hands-on learning, and a passion for lifelong growth',
        routeLink: '#',
    },
];
const schoolData = {
    logoUrl: '/img/skt_riverside_campus.png',
    schoolName: 'SKT International School - Riverside Campus',
    shortName: 'Riverside Campus',
    schoolOverview:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque amet reprehenderit minus nemo, dolorem quidem temporibus voluptate esse molestias. Assumenda nobis unde laborum veniam, similique facere nisi vel ut vitae.',
    websiteLink: 'https://skt.edu.mm/skt-riverside-campus',
};
function SktRiverside() {
    return (
        <FrontEndLayout>
            <CarouselBanner carouselData={carouselData} />
            <HeroBanner
                data={{
                    logo: schoolData.logoUrl,
                    schoolName: schoolData.schoolName,
                    shortName: schoolData.shortName,
                    schoolOverview: schoolData.schoolOverview,
                }}
            />
            <OverviewBanner />
        </FrontEndLayout>
    );
}

export default SktRiverside;
