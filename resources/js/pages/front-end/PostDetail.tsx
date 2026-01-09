import { DotLoading } from '@/components/front-end/core/dot-loading';
import PostDetailBody from '@/components/front-end/core/post-detail-body';
import FrontEndLayout from '@/layouts/front-end-layout';
import { CategoryTag, Post } from '@/types';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function PostDetail() {
    const { postId } = usePage().props;
    const [post, setPost] = useState<Post>();
    const [categories, setCategories] = useState<CategoryTag[]>();
    const [otherPosts, setOtherPosts] = useState<Post[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [otherPostsLoading, setOtherPostsLoading] = useState<boolean>(true);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/home/get-post-detail/' + postId)
            .then((res) => res.json())
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/api/home/get-category-tag-data')
            .then((res) => res.json())
            .then((res) => {
                setCategories(res.data);
                setCategoriesLoading(false);
            })
            .catch((err) => console.log(err));
        fetch('/api/home/get-post-data?limit=3&current_post=' + postId)
            .then((res) => res.json())
            .then((res) => {
                setOtherPosts(res.data);
                setOtherPostsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [postId]);
    return (
        <>
            <FrontEndLayout>
                <div
                    className="relative bg-cover bg-center bg-no-repeat text-white"
                    style={{
                        backgroundImage: `url(${post?.banner_img})`, // put your image path here
                    }}
                >
                    {/* Overlay */}
                    {/* <div className="absolute inset-0 bg-blue-950/60" /> */}
                    <div className="dark:from-dark-950/90 dark:to-dark-950/90 absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-950/60" />
                    {/* Content */}
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
                            <h2 className="font-merriweather mb-4 text-3xl font-bold md:text-5xl">{post?.title}</h2>
                            <p className="mb-6 max-w-2xl text-lg md:text-xl">{post?.subtitle}</p>
                        </div>
                    </motion.div>
                </div>
                {loading ? (
                    <div className="container mx-auto">
                        <div className="flex h-[50dvh] justify-center gap-10">
                            <DotLoading />
                        </div>
                    </div>
                ) : (
                    <PostDetailBody
                        post={post}
                        otherPosts={otherPosts}
                        categories={categories}
                        otherPostsLoading={otherPostsLoading}
                        categoriesLoading={categoriesLoading}
                    />
                )}
            </FrontEndLayout>
        </>
    );
}

export default PostDetail;
