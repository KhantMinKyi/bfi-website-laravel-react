'use client';

// components/post-grid.tsx
import type { CategoryTag, Post } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import PullUpHeader from './pull-up-header';

interface PostGridProps {
    posts: Post[];
    categories?: CategoryTag[];
    onPostClick?: (post: Post) => void;
    onFilterChange?: (catId: number | 'All') => void;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, categories, onPostClick, onFilterChange }) => {
    const allCategories = categories || [];
    const [selectedCategory, setSelectedCategory] = useState<number | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const filteredPosts =
        selectedCategory === 'All'
            ? posts
            : posts.filter((post) => {
                  const postCategoryIds = post.category_tags.map((category_tag) => Number(category_tag.category_tag_id));
                  return postCategoryIds.includes(Number(selectedCategory));
              });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const handleFilterChange = (catId: number | 'All') => {
        setSelectedCategory(catId);
        setCurrentPage(1); // Reset to first page when filter changes

        if (onFilterChange) {
            onFilterChange(catId);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-6">
            <h2 className="mb-4">
                <PullUpHeader text="News & Events" />
            </h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap gap-4">
                {allCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleFilterChange(cat.id)}
                        className={`cursor-pointer px-4 py-2 font-semibold transition hover:text-blue-800 ${
                            selectedCategory === cat.id ? 'text-blue-800 underline decoration-blue-700 underline-offset-4' : 'text-gray-600'
                        }`}
                    >
                        {cat.title}
                    </button>
                ))}

                <button
                    className={`cursor-pointer border border-blue-800 px-4 py-2 font-semibold text-blue-800 transition hover:bg-blue-800 hover:text-white md:px-6 md:py-2`}
                    onClick={() => handleFilterChange('All')}
                >
                    All Events & News
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {currentPosts.map((post) => (
                    <div
                        key={post.id}
                        className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-lg"
                        onClick={() => onPostClick && onPostClick(post)}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={post.banner_img || '/placeholder.svg'}
                                alt={post.title}
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-merriweather mb-2 line-clamp-2 text-lg font-semibold md:text-xl">{post.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.category_tags.map((ct) => (
                                    <span className="rounded bg-blue-500 px-2 py-1 text-xs text-white dark:bg-green-500" key={ct.id}>
                                        {ct.category_tag.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`min-w-[40px] rounded px-3 py-2 text-sm font-medium transition ${
                                    currentPage === page ? 'bg-blue-800 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Posts count info */}
            <div className="mt-4 text-center text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
            </div>
        </div>
    );
};

export default PostGrid;
