// components/PostCarousel.tsx
import { CategoryTag, Post } from '@/types';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PullUpHeader from './pull-up-header';

interface PostsCarouselProps {
    posts: Post[];
    categories?: CategoryTag[];
    onPostClick?: (post: Post) => void; // callback for post click
    onFilterChange?: (catId: number | 'All') => void; // callback for filter change
}

const PostCarousel: React.FC<PostsCarouselProps> = ({ posts, categories, onPostClick, onFilterChange }) => {
    // const allCategories = categories || ['All', ...Array.from(new Set(posts.map((c) => c.description)))];
    const allCategories = categories || [];
    const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');

    const filteredPosts =
        selectedCategory === 'All'
            ? posts
            : posts.filter((post) => {
                  // split the comma-separated string into an array of numbers
                  const postCategoryIds = post.category_tags.map((category_tag) => Number(category_tag.category_tag_id));
                  // if category_tag_ids is string[], convert to number

                  return postCategoryIds.includes(Number(selectedCategory));
              });

    const handleFilterChange = (catId: number | 'All') => {
        setSelectedCategory(catId);

        if (onFilterChange) {
            onFilterChange(catId); // make sure onFilterChange type accepts number | 'All'¸
        }
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
                        key={cat.id}
                        onClick={() => handleFilterChange(cat.id)}
                        className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-800 ${
                            selectedCategory === cat.id ? 'text-blue-800 underline decoration-blue-700 underline-offset-3' : 'text-gray-600'
                        }`}
                    >
                        {cat.title}
                    </button>
                ))}

                <button
                    className={`my-4 cursor-pointer border border-blue-800 px-4 py-2 font-semibold text-blue-800 transition hover:bg-blue-800 hover:text-white md:my-0 md:px-6 md:py-4`}
                    onClick={() => handleFilterChange('All')}
                >
                    All Events & News
                </button>
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
                {filteredPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <div className="cursor-pointer overflow-hidden rounded-sm" onClick={() => onPostClick && onPostClick(post)}>
                            <img src={post.banner_img} alt={post.title} className="h-60 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="font-merriweather text-xl font-semibold md:text-2xl">{post.title}</h3>
                                {/* <p className="text-gray-600">{post.description}</p> */}
                                {post.category_tags.map((ct) => (
                                    <span className="mx-1 rounded bg-blue-500 p-1 text-sm text-white dark:bg-green-500" key={ct.id}>
                                        {ct.category_tag.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PostCarousel;
