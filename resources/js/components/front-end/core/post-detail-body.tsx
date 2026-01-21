import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem, CategoryTag, Post } from '@/types';
import { Link } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import { CalendarCheck, Pin } from 'lucide-react';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
import { DotLoading } from './dot-loading';

interface PostDetailProps {
    post?: Post;
    otherPosts?: Post[];
    categories?: CategoryTag[];
    otherPostsLoading?: boolean;
    categoriesLoading?: boolean;
}
function getYouTubeEmbedUrl(url: string) {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}
const PostDetailBody: React.FC<PostDetailProps> = ({ post, otherPosts, categories, otherPostsLoading, categoriesLoading }) => {
    const sanitizedDescription = DOMPurify.sanitize(post?.description ?? '');
    const sanitizedFooterDescription = DOMPurify.sanitize(post?.footer_description ?? '');
    const images = post?.images?.split(',');
    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'News & Events',
            href: '/community/news-and-events',
        },
        {
            title: `${post?.title}`,
            href: '#',
        },
    ];
    return (
        <>
            <section className="blog-page section-padding bg-gray-50 py-12 pt-20 dark:bg-neutral-950">
                <div className="container mx-auto px-4">
                    <div className="mb-4">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className="row flex flex-wrap">
                        <div className="col-lg-7 col-sm-12 col-xs-12 w-full lg:w-7/12">
                            <div className="arti_single rounded-lg p-6 shadow-lg">
                                <div className="arti_img_two mb-4">
                                    <img src={post?.banner_img} className="max-h-[500px] w-full rounded-lg" alt="Blog image" />
                                </div>
                                <div className="arti_content leading-relaxed text-gray-700">
                                    <p></p>
                                </div>
                                <div className="arti_sp mt-6">
                                    <h2 className="font-merriweather text-2xl font-bold text-blue-800 md:text-4xl dark:text-green-700">
                                        {post?.title}
                                    </h2>
                                    <h2 className="font-merriweather my-2 text-lg font-bold text-gray-800 md:text-xl dark:text-gray-100">
                                        {post?.subtitle}
                                    </h2>
                                    {post?.type && post?.type.is_activity == true && (
                                        <div className="my-8 flex gap-6">
                                            <span className="flex gap-2 text-green-700">
                                                <Pin />
                                                <strong>{post?.location}</strong>
                                            </span>
                                            <span className="flex gap-2 text-green-700">
                                                <CalendarCheck />
                                                <strong>
                                                    {post?.start_date} - {post?.end_date}
                                                </strong>
                                            </span>
                                        </div>
                                    )}
                                    {/* Body */}
                                    <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
                                    <div className="my-10 grid grid-cols-2">
                                        {images?.map((i) => (
                                            <div
                                                className="h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:h-72 dark:bg-neutral-950"
                                                style={{
                                                    backgroundImage: `url(/${i})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                                key={i}
                                            ></div>
                                        ))}
                                    </div>
                                    {/* Footer Description */}
                                    <div dangerouslySetInnerHTML={{ __html: sanitizedFooterDescription }}></div>
                                    {post?.video_url && (
                                        <div className="my-6 flex justify-center">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={getYouTubeEmbedUrl(post?.video_url)}
                                                title="YouTube Video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                                <div className="share_sp mt-6">
                                    <h4 className="text-lg font-semibold">Share</h4>

                                    <ul className="mt-2 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                        {/* Facebook */}
                                        <li>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                            >
                                                <FiFacebook />
                                                Facebook
                                            </a>
                                        </li>

                                        {/* Twitter / X */}
                                        <li>
                                            <a
                                                href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${pageTitle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-400 hover:text-blue-600"
                                            >
                                                <FiTwitter />
                                                Twitter
                                            </a>
                                        </li>

                                        {/* Instagram (no direct web share) */}
                                        <li>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                                className="flex items-center gap-1 text-pink-500 hover:text-pink-700"
                                            >
                                                <FiInstagram />
                                                Copy Link
                                            </button>
                                        </li>

                                        {/* LinkedIn */}
                                        <li>
                                            <a
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-700 hover:text-blue-900"
                                            >
                                                <FiLinkedin />
                                                Linkedin
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        {/* Right Side Data */}
                        <div className="col-lg-5 col-sm-12 col-xs-12 mt-8 w-full shadow lg:mt-0 lg:w-5/12">
                            <div className="font-merriweather rounded-xl p-4 dark:bg-neutral-900">
                                <div className="sidebar_title border-b border-gray-300 pb-2 text-3xl">
                                    <h4>Popular News & Events</h4>
                                </div>
                                {otherPostsLoading ? (
                                    <div className="container mx-auto">
                                        <div className="flex h-[15dvh] justify-center gap-10">
                                            <DotLoading />
                                        </div>
                                    </div>
                                ) : (
                                    otherPosts?.map((op) => (
                                        <div key={op.id}>
                                            <Link href={route('post-detail', op.id)} className="my-2 grid grid-cols-12 items-center">
                                                <img className="col-span-2 w-20" src={op.banner_img} alt="" />
                                                <h5 className="col-span-10">{op.title} </h5>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="font-merriweather my-2 rounded-xl p-4 dark:bg-neutral-900">
                                <div className="sidebar_title border-b border-gray-300 pb-2 text-3xl">
                                    <h4>Follow us</h4>
                                </div>
                                <div className="single_social grid grid-cols-2 gap-4 text-xs text-white sm:text-base md:text-lg">
                                    <a className="my-2 flex items-center gap-2 rounded  bg-neutral-950 p-2" href='https://www.facebook.com/share/17irZtXNj1/' target='_blank'>
                                        <FiFacebook className='text-blue-600' />
                                        <span className="item-list sm:block">150K Likes</span>
                                    </a>
                                    {/* 
                                    <div className="my-2 flex items-center gap-2 rounded  bg-gray-950 p-2">
                                        <FiTwitter className='text-blue-500' />
                                        <span className="item-list sm:block">138K Followers</span>
                                    </div>

                                    <div className="my-2 flex items-center gap-2 rounded bg-gray-950 dark:bg-gray-950 p-2">
                                        <FiYoutube className='text-red-600' />
                                        <span className="item-list sm:block">90K Subscribers</span>
                                    </div>

                                    <div className="my-2 flex items-center gap-2 rounded bg-gray-950 p-2">
                                        <FiInstagram className='text-rose-600'/>
                                        <span className="item-list sm:block">350K Followers</span>
                                    </div> */}
                                </div>
                            </div>
                            <div className="font-merriweather my-2 rounded-xl p-4 dark:bg-neutral-900">
                                <div className="sidebar_title border-b border-gray-300 pb-2 text-3xl">
                                    <h4>Categories & Tags</h4>
                                </div>
                                <div className="my-6">
                                    {categoriesLoading ? (
                                        <div className="container mx-auto">
                                            <div className="flex h-[15dvh] justify-center gap-10">
                                                <DotLoading />
                                            </div>
                                        </div>
                                    ) : (
                                        categories?.map((cate) => (
                                            <div className="my-2" key={cate.id}>
                                                <span className="text-lg underline underline-offset-4">{cate.title}</span>
                                                <sup className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">{cate.related_posts_count}</sup>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostDetailBody;
