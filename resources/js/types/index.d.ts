import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    haveSubItems: boolean;
    subItems?: SideNavSubItems[];
}

export interface SideNavSubItems {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SideNavItem {
    title: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    subItems?: SideNavSubItems[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Programmes = {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
};

export type TeamCardType = {
    name: string;
    profession?: string;
    imagesrc?: string;
    websiteUrl?: string;
};
export type DonationDataType = {
    title: string;
    desciption: string;
    date: string;
    imgSrc: string;
};
export type carouselDataType2 = {
    bgSrc: string;
    headTitle: string;
    colorTitle: string;
    lastTitle?: string;
    subTitle: string;
    desc: string;
    routeLink?: string;
};
export type carouselDataType = {
    banner_image: string;
    top_sub_title: string;
    title: string;
    bottom_sub_title: string;
    routeLink?: string;
    lastTitle?: string;
};

export interface ImageItem {
    src: string;
    title: string;
    desc: string;
}
export interface schoolAccordionType {
    src: string;
    title: string;
    desc: string;
    bgSrc: string;
    websiteUrl: string;
    contactUsWebsiteUrl?: string;
}
export interface policyCardType {
    src: string;
    title: string;
}
export interface PolicyPdfType {
    src: string;
    title: string;
}
export interface SisterSchoolBannerType {
    logo: string;
    schoolName: string;
    shortName: string;
    schoolOverview: string;
}
export interface SisterSchoolOverViewType {
    history: string;
    leadership: SisterSchoolLeadership[];
}
export interface SisterSchoolHOSMessageType {
    hosImg: string;
    hosMessage: string;
    logo?: string;
    logo_b?: string;
}
export interface CounterType {
    firstNumber?: number;
    firstTitle?: string;
    secondNumber?: number;
    secondTitle?: string;
    thirdNumber?: number;
    thirdTitle?: string;
    fourthNumber?: number;
    fourthTitle?: string;
}

export interface SisterSchoolContactBannerType {
    logoUrl: string;
    logoUrlB: string;
    websiteLink: string;
}
export interface SisterSchoolDataType {
    logo: string;
    logoUrlB: string;
    name: string;
    short_name: string;
    introduction: string;
    website_url: string;
    description: string;
    leaderships: string[];
    hos_image: string;
    hos_name: string;
    hos_message: string;
    website_url?: string;
}
export interface FaqDataType {
    id: string;
    question: string;
    answer: string;
    created_user?: User;
    updated_user?: User;
}
export interface PostSetting {
    id: number;
    title: string;
    is_activity: boolean;
    status: string;
    created_at: string;
    updated_at: string;
}
export interface CategoryTag {
    id: number;
    title: string;
    type: string;
    created_user_id: number;
    updated_user_id?: number;
    status: number;
    created_user: User;
    updated_user?: User;
    related_posts_count?: number;
    created_at: string;
    updated_at: string;
}
export interface Post {
    type: PostSetting;
    post_type_id: number;
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    footer_description?: string;
    banner_img: string;
    images?: string;
    start_date?: date;
    end_date?: date;
    registration_fee?: string;
    award_description?: string;
    video_url?: string;
    location?: string;
    created_user: User;
    updated_user?: User;
    category_tags: PostCategoryTag[];
    status: number;
    category_tag_ids: string;
    created_at: string;
    updated_at: string;
}
export interface PostCategoryTag {
    id: number;
    category_tag_id: number;
    post_id: number;
    category_tag: CategoryTag;
    post: Post;
}
export interface ResponseProps {
    message: string;
    data: Post[];
}
export interface SisterSchoolBanner {
    id: string;
    banner_image: File | null;
    top_sub_title: string;
    title: string;
    bottom_sub_title: string;
    bannerPreview?: string;
    sister_school_id?: number;
}
export interface SisterSchoolLeadership {
    id: string;
    sister_school_id?: number;
    image: File | null;
    name: string;
    position: string;
    leadershipImagePreview?: string;
}
export interface SisterSchool {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    logo: string;
    logo_b: string;
    address: string;
    email: string;
    phone: string;
    website_url: string;
    introduction: string;
    description: string;
    hos_message: string;
    hos_image: string;
    hos_name: string;
    status: boolean;
    created_user: User;
    updated_user?: User;
    banners: SisterSchoolBanner[];
    leaderships: SisterSchoolLeadership[];
}
export interface CurriculumPhoto {
    id: StringIterator;
    curriculum_id?: number;
    image: File | null;
    title: string;
    curriculumPhotoPreview?: string;
    created_user?: User;
    updated_user?: User;
}
export interface Curriculum {
    id: number;
    name: string;
    sub_title: string;
    slug: string;
    logo?: string;
    secondary_logo?: string;
    introduction: string;
    body?: string;
    footer?: string;
    created_user: User;
    updated_user?: User;
    related_photos: CurriculumPhoto[];
}
