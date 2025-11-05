// components/PostCarousel.tsx
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PullUpHeader from './pull-up-header';

export interface PostItem {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
}
export type Posts = {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
};

interface PostsCarouselProps {
    posts: PostItem[];
    categories?: string[];
    onPostClick?: (post: PostItem) => void; // callback for post click
    onFilterChange?: (category: string) => void; // callback for filter change
}

const PostCarousel: React.FC<PostsCarouselProps> = ({ posts, categories, onPostClick, onFilterChange }) => {
    const allCategories = categories || ['All', ...Array.from(new Set(posts.map((c) => c.category)))];
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredposts = selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory);

    const handleFilterChange = (cat: string) => {
        setSelectedCategory(cat);
        if (onFilterChange) onFilterChange(cat);
    };

    return (
        <div className="p-6">
            <h2 className="mb-4">
                <PullUpHeader text="Events & News" />
            </h2>
            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap space-x-4">
                {allCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleFilterChange(cat)}
                        className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-800 ${
                            selectedCategory === cat ? 'text-blue-800 underline decoration-blue-700 underline-offset-3' : 'text-gray-600'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
                <Link
                    href={'/'}
                    className={`my-4 cursor-pointer border border-blue-800 px-4 py-2 font-semibold text-blue-800 transition hover:bg-blue-800 hover:text-white md:my-0 md:px-6 md:py-4`}
                >
                    All Events & News
                </Link>
            </div>

            {/* Carousel */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                // slidesPerView={3}
                navigation={true} // enable navigation arrows
                autoplay={{ delay: 2500 }}
                centeredSlides={true}
                // pagination={true}
                loop={true}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
            >
                {filteredposts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <div className="cursor-pointer overflow-hidden rounded-sm" onClick={() => onPostClick && onPostClick(post)}>
                            <img src={post.image} alt={post.title} className="h-60 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="font-merriweather text-xl font-semibold md:text-2xl">{post.title}</h3>
                                {/* <p className="text-gray-600">{post.description}</p> */}
                                <span className="text-sm text-green-500">{post.category}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PostCarousel;
