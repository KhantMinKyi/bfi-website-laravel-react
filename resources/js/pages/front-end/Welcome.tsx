import AboutTestimonial from '@/components/front-end/core/about-testimonial';
import AccordionGallery from '@/components/front-end/core/accordion-gallery';
import Counter from '@/components/front-end/core/counter';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import EducationProgramme from '@/components/front-end/core/education-programme';
import PostCarousel, { PostItem, Posts } from '@/components/front-end/core/post-lists';
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

const cardsData: PostItem[] = [
    {
        id: 1,
        title: 'The government of Myanmar has issued advisory statements to close all Pre-school classes temporarily',
        category: 'Event',
        description: 'This is card 1',
        image: 'https://www.wolters-cat-dog.de/media/4c/8b/e4/1706866207/WOLTERS_Funny_Dummy_Mood_web%20(1).webp',
    },
    {
        id: 2,
        title: 'SKT International School: School Calendar',
        category: 'News',
        description: 'This is card 2',
        image: 'https://www.wolters-cat-dog.de/media/4c/8b/e4/1706866207/WOLTERS_Funny_Dummy_Mood_web%20(1).webp',
    },
    {
        id: 3,
        title: 'BFI Football Tournament',
        category: 'Event',
        description: 'This is card 3',
        image: 'https://www.wolters-cat-dog.de/media/4c/8b/e4/1706866207/WOLTERS_Funny_Dummy_Mood_web%20(1).webp',
    },
    {
        id: 4,
        title: 'BFI Sport day is Here!',
        category: 'Event',
        description: 'This is card 4',
        image: 'https://www.wolters-cat-dog.de/media/4c/8b/e4/1706866207/WOLTERS_Funny_Dummy_Mood_web%20(1).webp',
    },
    {
        id: 5,
        title: 'Spelling Bee is Comming!!',
        category: 'News',
        description: 'This is card 5',
        image: 'https://www.wolters-cat-dog.de/media/4c/8b/e4/1706866207/WOLTERS_Funny_Dummy_Mood_web%20(1).webp',
    },
];

// Text Need to Change
const images: ImageItem[] = [
    {
        src: '/img/SKT_1.png',
        title: 'Parallel Education Model',
        desc: 'Our Parallel Education Model delivers teaching and learning in a way that recognises the unique and changing social, emotional and educational needs of all students.',
    },
    {
        src: '/img/SKT_2.png',
        title: 'Community Focused',
        desc: 'All sister schools under BFI are above all an integrated and passionate community of students, teachers, parents, guardians and alumni, working together to ensure BFI remains a supportive and enriching environment in which to learn and socialise.',
    },
    {
        src: '/img/SKT_3.png',
        title: 'Explicit Teaching Model',
        desc: 'Our innovative Explicit Teaching Model provides the best possible start for all BFI Junior School students, helping them engage with and master the core skills of Literacy and Numeracy.',
    },
    {
        src: '/img/SKT_4.jpg',
        title: 'Education awards',
        desc: 'All sister schools under BFI has achieved national recognition and received a host of respected awards – the results of a unique combination of innovation, unrivalled educators and extraordinary results.',
    },
    {
        src: '/img/SKT_11.jpg',
        title: 'Academic success',
        desc: 'BFI Education Services is acclaimed as a great Company because of its sister schools` outstanding academic results and a unique combination of factors that deliver more than the sum of their parts.',
    },
];
const handleCardClick = (card: PostItem) => {
    alert(`You clicked: ${card.title}`);
};

const handleFilterChange = (category: string) => {
    console.log('Filter changed to:', category);
};

function home() {
    const [programmes, setProgrammes] = useState<Programmes[]>([]);
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [postLoading, setPostLoading] = useState<boolean>(true);

    useEffect(() => {
        // const timer = setTimeout(() => {
        fetch('https://picsum.photos/v2/list')
            .then((res) => res.json())
            .then((data: Programmes[]) => {
                setProgrammes(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('https://picsum.photos/v2/list')
            .then((res) => res.json())
            .then((data: Programmes[]) => {
                setPosts(data);
                setPostLoading(false);
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
                <AccordionGallery images={images} />
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
                    {postLoading ? (
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
