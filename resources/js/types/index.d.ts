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
export type carouselDataType = {
    bgSrc: string;
    headTitle: string;
    colorTitle: string;
    lastTitle?: string;
    subTitle: string;
    desc: string;
    routeLink?: string;
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
    leadership: string[];
}
export interface SisterSchoolHOSMessageType {
    hosImg: string;
    hosMessage: string;
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
    logoUrl: string;
    logoUrlB: string;
    schoolName: string;
    shortName: string;
    schoolOverview: string;
    websiteLink: string;
    history: string;
    leadership: string[];
    hosImg: string;
    hosMessage: string;
}
export interface FaqDataType {
    question: string;
    answer: string;
}
