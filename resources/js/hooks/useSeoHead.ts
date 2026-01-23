import { useMemo } from 'react';

interface SeoHeadProps {
    title: string;
    description: string;
    routeName?: string;
    routeParams?: Record<string, any>;
    image?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    keywords?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

interface StructuredDataOrganization {
    '@context': string;
    '@type': string;
    name: string;
    url?: string;
    description: string;
    address: {
        '@type': string;
        streetAddress: string;
        addressLocality: string;
        addressCountry: string;
    };
    telephone: string;
    email: string;
    numberOfEmployees: string;
    department?: Array<{
        '@type': string;
        name: string;
        description: string;
    }>;
}

interface StructuredDataWebPage {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url?: string;
    image?: string;
    publisher?: {
        '@type': string;
        name: string;
    };
}

export const useSeoHead = ({
    title,
    description,
    routeName,
    routeParams = {},
    image = '/img/bfi.webp',
    type = 'website',
    noIndex = false,
    keywords,
    author,
    publishedTime,
    modifiedTime,
}: SeoHeadProps) => {
    const canonicalUrl = useMemo(() => {
        try {
            return routeName ? route(routeName, routeParams) : '';
        } catch (_e) {
            return '';
        }
    }, [routeName, routeParams]);

    const fullImageUrl = useMemo(() => {
        if (image.startsWith('http')) return image;
        try {
            const baseUrl = window.location.origin;
            return `${baseUrl}${image}`;
        } catch {
            return image;
        }
    }, [image]);

    const structuredData = useMemo((): StructuredDataOrganization | StructuredDataWebPage => {
        const baseData = {
            '@context': 'https://schema.org',
            name: title,
            description: description,
            url: canonicalUrl || undefined,
        };

        // For homepage or organization pages
        if (routeName === 'home' || routeName === 'about.history') {
            return {
                ...baseData,
                '@type': 'EducationalOrganization',
                name: 'BFI Education Services',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'No.235, Shu Khinn Thar Myo Pat Road, Thaketa',
                    addressLocality: 'Yangon',
                    addressCountry: 'MM',
                },
                telephone: '019410010',
                email: 'contact@bfi-edu.com',
                numberOfEmployees: '200+',
                department: [
                    {
                        '@type': 'School',
                        name: 'BFI Group of Schools',
                        description: 'Network of 9 international schools operated by BFI Education Services.',
                    },
                ],
            } as StructuredDataOrganization;
        }

        // For other pages
        return {
            ...baseData,
            '@type': 'WebPage',
            image: fullImageUrl,
            publisher: {
                '@type': 'EducationalOrganization',
                name: 'BFI Education Services',
            },
        } as StructuredDataWebPage;
    }, [title, description, canonicalUrl, routeName, fullImageUrl]);

    return {
        title,
        description,
        canonicalUrl,
        image: fullImageUrl,
        type,
        noIndex,
        keywords,
        author,
        publishedTime,
        modifiedTime,
        structuredData,
    };
};