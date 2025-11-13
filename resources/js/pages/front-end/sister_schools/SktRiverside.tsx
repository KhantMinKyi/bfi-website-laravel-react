import IconCardGroup from '@/components/front-end/about_us/bfi_advantages/icon-card';
import CarouselBanner from '@/components/front-end/core/carousel-banner';
import Counter from '@/components/front-end/core/counter';
import ContactBanner from '@/components/front-end/sister_schools/contact-banner';
import HeadOfSchoolMessage from '@/components/front-end/sister_schools/head-of-school-message';
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
    logoUrlB: '/img/skt_riverside_campus_b.png',
    schoolName: 'SKT International School - Riverside Campus',
    shortName: 'Riverside Campus',
    schoolOverview:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque amet reprehenderit minus nemo, dolorem quidem temporibus voluptate esse molestias. Assumenda nobis unde laborum veniam, similique facere nisi vel ut vitae.',
    websiteLink: 'https://skt.edu.mm/skt-riverside-campus',
    history:
        'SKT International Riverside Campus was established in the year 2010, located on Shukhinthar Mayopat Road, Yangon. Situated in the heart of Yangon, our campus offers a convenient and accessible environment for students, parents, and educators. With modern facilities and a warm, welcoming atmosphere, we are committed to supporting both academic excellence and extracurricular development.',
    leadership: [
        'https://cdn.tailgrids.com/assets/images/marketing/team/team-01/image-01.jpg',
        'https://cdn.tailgrids.com/assets/images/marketing/team/team-01/image-02.jpg',
        'https://cdn.tailgrids.com/assets/images/marketing/team/team-01/image-03.jpg',
        'https://cdn.tailgrids.com/assets/images/marketing/team/team-01/image-04.jpg',
    ],
    hosImg: 'https://cdn.tailgrids.com/assets/images/marketing/team/team-01/image-01.jpg',
    hosMessage:
        'Welcome to SKT International School, Riverside Campus. As Head of School, it’s a true privilege for me to work with such a diverse and vibrant community. I believe deeply in our mission to nurture students into lifelong learners and compassionate individuals, and I see that happening every day in the classrooms, through meaningful conversations, and in the way our students grow with confidence and purpose. Together with our dedicated staff and supportive parents, we are building a school where every child feels valued, challenged, and inspired to reach their full potential.',
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
        </FrontEndLayout>
    );
}

export default SktRiverside;
