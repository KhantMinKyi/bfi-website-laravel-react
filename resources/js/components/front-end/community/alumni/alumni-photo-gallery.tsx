'use client';

import { useEffect, useState } from 'react';

interface PhotoItem {
    image: string;
    title: string;
}

interface ApiResponse {
    message: string;
    alumni_photos: PhotoItem[];
}

// Random size configurations for masonry layout
const sizeVariants = [
    { span: 'md:col-span-1 md:row-span-2', height: 'h-full' },
    { span: 'md:col-span-2 md:row-span-1', height: 'h-120' },
    { span: 'md:col-span-1 md:row-span-2', height: 'h-full' },
    { span: 'md:col-span-2 md:row-span-1', height: 'h-120' },
    // { span: 'md:col-span-2 md:row-span-2', height: 'h-96' },
];

const AlumniPhotoGallery = () => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);

                const response = await fetch(`/api/community/get-alumni-photo`);

                const result: ApiResponse = await response.json();

                if (isMounted) {
                    setPhotos(result.alumni_photos);
                }
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false; // ✅ prevent state update on unmount
        };
    }, []);

    const getRandomSize = (index: number) => {
        const seed = index % sizeVariants.length;
        return sizeVariants[seed];
    };

    return (
        <div className="w-full p-4">
            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-fr md:grid-cols-4">
                    {photos.map((photo, index) => {
                        const size = getRandomSize(index);
                        return (
                            <div key={index} className={`group relative overflow-hidden rounded-lg ${size.span} ${size.height}`}>
                                <img
                                    src={photo.image || '/placeholder.svg'}
                                    alt={photo.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="absolute right-0 bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <h3 className="text-lg font-semibold text-balance">{photo.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AlumniPhotoGallery;
