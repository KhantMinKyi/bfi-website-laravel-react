import PostGrid from '@/components/front-end/core/post-grid';
import PostLoadingSkeleton from '@/components/front-end/core/post-loading-skeleton';
import PullUpHeader from '@/components/front-end/core/pull-up-header';
import FrontEndLayout from '@/layouts/front-end-layout';
import { CategoryTag, Post } from '@/types';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const handleCardClick = (card: Post) => {
    router.visit(route('post-detail', { postId: card.id }));
};
function NewsEvent() {
    const [postsData, setPostsData] = useState<Post[]>([]);
    const [postLoading, setPostLoading] = useState<boolean>(true);
    const [categoryTagData, setCategoryTagData] = useState<CategoryTag[]>([]);
    useEffect(() => {
        fetch('/api/home/get-post-data')
            .then((res) => res.json())
            .then((res) => {
                setPostsData(res.data);
                setPostLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/api/home/get-category-tag-data')
            .then((res) => res.json())
            .then((res) => {
                setCategoryTagData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <FrontEndLayout>
            <div
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('/img/banner2.webp')", // put your image path here
                }}
            >
                {/* Overlay */}
                <div className="dark:from-dark-950/90 dark:to-dark-950/90 absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-950/60" />
                <motion.div
                    className="orico-about-text-wrap 111"
                    initial={{ opacity: 0, x: -50 }} // start 50px below
                    whileInView={{ opacity: 1, x: 1 }} // slide up and fade in
                    exit={{ opacity: 0, x: -50 }} // fade out and slide down
                    viewport={{ once: false, amount: 0.4 }} // trigger when 20% visible
                    transition={{ duration: 0.5, ease: 'easeInOut' }} // longer duration
                >
                    <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center md:py-40 lg:py-52">
                        <img src="/img/bfi.webp" className="max-w-40" alt="" />
                        <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">News & Events </h2>
                        <p className="mb-6 max-w-2xl text-lg md:text-xl">Our path through innovation, challenge, and achievement.</p>
                    </div>
                </motion.div>
            </div>
            <div className="container mx-auto mt-10">
                {postLoading ? (
                    <div className="container mx-auto">
                        <h2 className="mb-4">
                            <PullUpHeader text="News & Events" />
                        </h2>
                        <div className="flex h-[50dvh] justify-center gap-10">
                            <PostLoadingSkeleton />
                            <PostLoadingSkeleton className={'hidden md:block'} />
                            <PostLoadingSkeleton className={'hidden md:block'} />
                        </div>
                    </div>
                ) : (
                    <PostGrid posts={postsData} categories={categoryTagData} onPostClick={handleCardClick} />
                )}
            </div>
        </FrontEndLayout>
    );
}
export default NewsEvent;
