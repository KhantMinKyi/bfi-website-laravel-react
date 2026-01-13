import { ImageItem } from '@/types';
import { useState } from 'react';
interface ImageItemProps {
    images: ImageItem[];
}
export default function AccordionGallery({ images }: ImageItemProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="container mx-auto my-20">
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
                                <div className="absolute inset-0 flex flex-col items-start justify-center p-2 text-white transition-opacity duration-500 md:p-16">
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
