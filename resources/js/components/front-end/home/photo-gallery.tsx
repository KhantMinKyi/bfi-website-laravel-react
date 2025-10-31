import { useEffect, useState } from 'react';
import type { Photo } from 'react-photo-album';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import SSR from 'react-photo-album/ssr';
import { DotLoading } from '../core/dot-loading';
// import photos from './photos';
const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

function imageLink(path: string, width: number, height: number, size: number, extension: string) {
    return `/img/${path}.${extension}`;
}
function PhotoGallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                // simulate fetching data (replace with real API later)
                const response = await fetch('/dummy-photos.json');
                const data = await response.json();

                const formattedPhotos = data
                    .map(({ src, ...rest }: any) => {
                        const matcher = src.match(/^(.*)\.(\d+)x(\d+)\.(.*)$/);
                        if (!matcher) return null;

                        const path = matcher[1];
                        const width = Number.parseInt(matcher[2], 10);
                        const height = Number.parseInt(matcher[3], 10);
                        const extension = matcher[4];

                        return {
                            src: imageLink(path, width, height, width, extension),
                            width,
                            height,
                            srcSet: breakpoints.map((bp) => ({
                                src: imageLink(path, width, height, bp, extension),
                                width: bp,
                                height: Math.round((height / width) * bp),
                            })),
                            ...rest,
                        } as Photo;
                    })
                    .filter(Boolean);

                setPhotos(formattedPhotos);
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                    <DotLoading />
                </div>
            ) : (
                <SSR breakpoints={[300, 600, 900, 1200]}>
                    <RowsPhotoAlbum photos={photos} spacing={0} />
                </SSR>
            )}
        </div>
    );
}

export default PhotoGallery;
