import { Head } from '@inertiajs/react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    image?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    keywords?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    canonicalUrl,
    image = '/img/bfi.webp',
    type = 'website',
    noIndex = false,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    structuredData,
}) => {
    return (
        <Head title={title}>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="BFI Education Services" />

            {/* Article specific */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Head>
    );
};

export default SEOHead;