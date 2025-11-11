import { ImageItem } from '@/types';
import { useState } from 'react';
interface ImageItemProps {
    images: ImageItem[];
}
export default function AccordionGallery({ images }: ImageItemProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="container mx-auto my-20">
            <div className="flex flex-col items-center justify-center text-center">
                <span className="font-base-font mb-10 text-sm font-bold text-blue-800 dark:text-green-800">WHY BFI EDUCATION SERVICES </span>
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
                            // onClick={() => setActiveIndex(isActive ? null : index)}
                            onPointerEnter={() => setActiveIndex(index)}
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
                                <div className="absolute inset-0 flex flex-col items-start justify-center p-16 text-white transition-opacity duration-500">
                                    <h3 className="font-merriweather mb-2 text-xl font-bold uppercase md:text-4xl">{image.title}</h3>
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
