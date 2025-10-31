import { useState } from 'react';

interface ImageItem {
    src: string;
    title: string;
    desc: string;
}

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
export default function AccordionGallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="container mx-auto my-20">
            <div className="flex flex-col items-center justify-center text-center">
                <span className="font-base-font mb-10 text-sm font-bold text-gray-300">WHY BFI EDUCATION SERVICES </span>
                <h1 className="font-merriweather mb-5 text-3xl font-bold sm:text-4xl lg:text-6xl">The BFI Advantage</h1>
                <p className="mb-10 max-w-4xl text-base leading-10 font-semibold text-gray-700">
                    active teaching methods and a clear focus on academic excellence. A strong community ethos and a safe and supportive learning
                    environment. BFI students have all they require to succeed.
                </p>
            </div>
            <div className="flex h-[70svh] flex-col sm:flex-row">
                {images.map((image, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={index}
                            className={`relative flex-1 cursor-pointer overflow-hidden transition-all duration-500 ${isActive ? 'flex-[4]' : 'flex-1'}`}
                            onClick={() => setActiveIndex(isActive ? null : index)}
                        >
                            <img src={image.src} alt={image.title} className="h-full w-full object-cover" />
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black/50 transition-opacity duration-500"></div>
                            {/* Closed vertical text */}
                            {!isActive && (
                                <div className="absolute top-0 flex h-full w-full items-center justify-center">
                                    <span className="font-merriweather transform text-xl font-extrabold tracking-wider whitespace-nowrap text-white uppercase sm:-rotate-90 md:text-3xl">
                                        {image.title}
                                    </span>
                                </div>
                            )}

                            {/* Open full overlay */}
                            {isActive && (
                                <div className="absolute inset-0 flex flex-col items-start justify-center p-4 text-white transition-opacity duration-500">
                                    <h3 className="font-merriweather mb-2 text-2xl font-bold uppercase">{image.title}</h3>
                                    <p>{image.desc}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
