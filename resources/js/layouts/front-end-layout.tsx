import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import Footer from '@/components/front-end/core/footer';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState, type ReactNode } from 'react';
import MobileLayout from './mobile-layout';

interface FrondendLayoutProps {
    children: ReactNode;
}
interface SisterSchoolNav {
    slug: string;
    name: string;
    // add any other fields
}

interface SharedProps {
    sisterSchools: SisterSchoolNav[];
    [key: string]: any; //
}
const baseLink =
    'font-heading-font before:content relative block px-[6px] py-[30px] text-sm font-bold uppercase transition-all before:invisible before:absolute before:top-0 before:left-0 before:h-[4px] before:w-full before:rounded-[3px] before:bg-blue-700 before:opacity-0 before:transition-all hover:text-blue-800 dark:hover:text-green-800  hover:before:visible dark:before:bg-green-700 hover:before:opacity-100 lg:text-[14px]  xl:px-[16px] xl:py-[35px]';
const activeLink =
    'font-heading-font before:content relative block px-[6px] py-[30px] text-sm font-bold uppercase transition-all before:invisible before:absolute before:top-0 before:left-0 before:h-[4px] before:w-full before:rounded-[3px] before:bg-blue-700 before:opacity-0 before:transition-all text-blue-800 dark:text-green-800 dark:before:bg-green-800 before:visible before:opacity-100 lg:text-[14px]  xl:px-[16px] xl:py-[35px]';

export const routePath = (name: string) => new URL(route(name)).pathname;
export default ({ children }: FrondendLayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();
    const currentPath = new URL(url, window.location.origin).pathname;
    const { sisterSchools } = usePage<SharedProps>().props;

    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const subLinkActive = 'after:w-[50%]';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleSubMenu = (menu: string) => {
        setActiveSubMenu(activeSubMenu === menu ? null : menu);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
                setTimeout(() => {}, 10);
            } else {
                setTimeout(() => {
                    setScrolled(false);
                }, 10);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <React.Fragment>
            <header
                className={` ${scrolled ? 'sticky top-4 z-50 bg-transparent' : 'relative bg-white dark:bg-gray-950'} scroll-smooth transition-all duration-300 ease-in-out`}
            >
                <div className={`absolute top-4 left-24 ${scrolled ? 'hidden' : 'sm:hidden lg:block'}`}>
                    <img src="/img/bfi.png" alt="" className="w-28 rotate-z-8 opacity-15 dark:hidden" />
                    <img src="/img/bfi_b.png" alt="" className="hidden w-28 rotate-z-8 dark:block dark:opacity-80" />
                </div>
                <div className={`absolute top-4 right-20 ${scrolled ? 'hidden' : 'sm:hidden lg:block'} `}>
                    <img src="/img/bfi.png" alt="" className="w-44 -rotate-z-6 opacity-15 dark:hidden" />
                    <img src="/img/bfi_b.png" alt="" className="hidden w-44 -rotate-z-6 dark:block dark:opacity-80" />
                </div>
                {/* <h1 className="hidden">section heading hidden</h1> */}
                <div className={`z-20 py-[10px] lg:py-0 ${scrolled ? 'hidden' : 'block'} transition-all duration-300 ease-in-out`}>
                    <div className="mx-auto max-w-11/12 sm:max-w-9/12">
                        <div className="grid grid-cols-12 items-center gap-4">
                            <div className="relative top-16 left-5 z-20 col-span-2 hidden lg:block">
                                <Link href={route('home')}>
                                    <img src="/img/bfi.png" className="max-w-28 transition-all dark:hidden" alt="" />
                                    <img src="/img/bfi_b.png" className="hidden max-w-28 transition-all dark:block" alt="" />
                                </Link>
                            </div>
                            <div className={`col-span-12 lg:col-span-10 ${scrolled ? 'hidden' : 'block'}`}>
                                <div className="hidden flex-wrap justify-center sm:flex lg:justify-end">
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-phone-call text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Call Us:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                            019410010
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-email text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Email:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                                contact@bfi.edu.mm
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-placeholder text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Address:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                                No.235, Shu Khinn Thar Myo Pat Road,Thaketa, Yangon.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute top-2 left-36 z-20 lg:left-40 xl:left-56 2xl:left-64 dark:grayscale ${scrolled ? 'hidden lg:block' : 'hidden'}`}
                >
                    <Link href={route('home')} className="scroll-smooth">
                        <img src="/img/bfi.png " className="block max-w-18 dark:hidden" alt="" />
                        <img src="/img/bfi_b.png " className="hidden max-w-18 dark:block" alt="" />
                    </Link>
                </div>

                <div className="mx-auto mt-4 max-w-9/12 sm:mt-0">
                    <div className="relative z-10 -mb-6 flex items-center justify-between rounded-[5px] bg-blue-50 py-[10px] dark:bg-gray-900">
                        <div>
                            <div id="dl-menu" className="dl-menuwrapper">
                                <button
                                    className="dl-trigger ml-2 rounded-xl border-2 border-gray-800 px-4 py-2 text-xl text-gray-800 lg:hidden dark:text-gray-50"
                                    onClick={toggleMenu}
                                >
                                    {' '}
                                    <i className="fa fa-solid fa-bars"></i>{' '}
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="col:w-[150px] col:ml-[50px] block w-[150px] sm:w-[195px] md:w-[200px] lg:hidden">
                                <a className="flex items-center justify-end pr-2 text-white lg:justify-center" href={route('home')}>
                                    <img className="max-w-20 dark:hidden" src="/img/bfi.png" alt="" />
                                    <img className="hidden max-w-20 dark:block" src="/img/bfi_b.png" alt="" />
                                </a>
                            </div>
                            <ul className={`hidden text-[#14212b] lg:block dark:text-gray-50 ${scrolled ? '' : 'sm:hidden lg:block'} `}>
                                {/* Home */}
                                <li className="group relative inline-block">
                                    <Link href={route('home')} className={`${currentPath === routePath('home') ? activeLink : baseLink}`}>
                                        Home
                                    </Link>
                                </li>
                                {/* About Us */}
                                <li className="group relative inline-block">
                                    <a
                                        href="#"
                                        className={` ${
                                            currentPath === routePath('our_history') ||
                                            currentPath === routePath('vision_mission_value') ||
                                            currentPath === routePath('philosophy') ||
                                            // currentPath === routePath('leadership_teams') ||
                                            currentPath === routePath('bfi_advantage')
                                                ? activeLink
                                                : baseLink
                                        }`}
                                    >
                                        About Us
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <Link
                                                href={route('our_history')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('our_history') ? subLinkActive : ''} `}
                                            >
                                                Our History
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('vision_mission_value')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('vision_mission_value') ? subLinkActive : ''}`}
                                            >
                                                Vision , Mission & Values
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('philosophy')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('philosophy') ? subLinkActive : ''} `}
                                            >
                                                Philosophy
                                            </Link>
                                        </li>

                                        {/*                                         
                                        <li>
                                            <Link
                                                href={route('leadership_teams')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('leadership_teams') ? subLinkActive : ''} `}
                                            >
                                                Leaderships Teams
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link
                                                href={route('bfi_advantage')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('bfi_advantage') ? subLinkActive : ''}`}
                                            >
                                                BFI Advantage
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href={route('community_service_activities')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('community_service_activities') ? subLinkActive : ''} `}
                                            >
                                                COMMUNITY SERVICE ACTIVITIES
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                {/* Sister Schools */}
                                <li className="group relative inline-block">
                                    <Link
                                        href="#"
                                        className={`${
                                            sisterSchools.some((ss) => currentPath === '/sister_schools/school-data/' + ss.slug)
                                                ? activeLink
                                                : baseLink
                                        }`}
                                    >
                                        Sister Schools
                                    </Link>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        {sisterSchools.map((ss) => (
                                            <li key={ss.slug}>
                                                <Link
                                                    href={route('sister_school.data', ss.slug)}
                                                    className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === '/sister_schools/school-data/' + ss.slug ? subLinkActive : ''}`}
                                                >
                                                    {ss.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                {/* Curriculum */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        Curriculum
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <Link
                                                href={route('preschool')}
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Pre-School
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Primary School (Year 2-6)
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Secondary School (Year 7-9)
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                IGCSE (Year 10-11)
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="service-single.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                IB Diploma Programme (Year 12-13)
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                {/* Admissions */}
                                {/* <li className="group relative inline-block">
                                    <a
                                        href="#"
                                        className={`${
                                            currentPath === routePath('apply_to_bfi_sister_schools') ||
                                            currentPath === routePath('admission_policies')
                                                ? // currentPath === routePath('faq')
                                                  activeLink
                                                : baseLink
                                        }`}
                                    >
                                        Admissions
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <Link
                                                href={route('apply_to_bfi_sister_schools')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('apply_to_bfi_sister_schools') ? subLinkActive : ''}`}
                                            >
                                                Applying to BFI Sister Schools
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admission_policies')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('admission_policies') ? subLinkActive : ''}`}
                                            >
                                                Admission Policies
                                            </Link>
                                        </li>
                                    </ul>
                                </li> */}
                                {/* COMPETITION */}
                                <li className="group relative inline-block">
                                    <a
                                        href="#"
                                        className={`${
                                            currentPath === routePath('apply_to_bfi_sister_schools') ||
                                            currentPath === routePath('admission_policies')
                                                ? // currentPath === routePath('faq')
                                                  activeLink
                                                : baseLink
                                        }`}
                                    >
                                        COMPETITION
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <Link
                                                href={route('apply_to_bfi_sister_schools')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('apply_to_bfi_sister_schools') ? subLinkActive : ''}`}
                                            >
                                                MATHEMANIA
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admission_policies')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('admission_policies') ? subLinkActive : ''}`}
                                            >
                                                Spelling Bee
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admission_policies')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('admission_policies') ? subLinkActive : ''}`}
                                            >
                                                Science Project Competition
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admission_policies')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('admission_policies') ? subLinkActive : ''}`}
                                            >
                                                BFI Football Tournament
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admission_policies')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('admission_policies') ? subLinkActive : ''}`}
                                            >
                                                Robofest
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link
                                                href={route('faq')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('faq') ? subLinkActive : ''}`}
                                            >
                                                Frequently asked questions
                                            </Link>
                                        </li> */}
                                    </ul>
                                </li>
                                {/* BFI Olympiads */}
                                <li className="group relative inline-block">
                                    <Link href="#" className={`${currentPath === '/career' ? activeLink : baseLink}`}>
                                        BFI Olympiads
                                    </Link>
                                </li>
                                {/* Community */}
                                <li className="group relative inline-block">
                                    <a
                                        href="#"
                                        className={`${
                                            currentPath === routePath('contact_us') || currentPath === routePath('faq') ? activeLink : baseLink
                                        }`}
                                    >
                                        Community
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <Link
                                                href={route('contact_us')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('contact_us') ? subLinkActive : ''}`}
                                            >
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('faq')}
                                                className={`group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white ${currentPath === routePath('faq') ? subLinkActive : ''}`}
                                            >
                                                FAQ
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                {/* Career */}
                                <li className="group relative inline-block">
                                    <Link href={route('home')} className={`${currentPath === '/career' ? activeLink : baseLink}`}>
                                        Career
                                    </Link>
                                </li>
                                <li className="group relative inline-block">
                                    <AppearanceToggleDropdown />
                                </li>
                            </ul>
                        </div>
                        {/* <div className={`hidden items-center pr-[15px] sm:pr-0 md:flex lg:pr-[4px] ${scrolled ? 'block' : 'hidden'} `}>
                            <a
                                className="mr-2 hidden cursor-pointer rounded-2xl bg-sky-500 px-4 py-2 text-white shadow-2xl sm:block md:hidden"
                                href="#"
                            >
                                Contact Us
                            </a>
                            <label className="inline-flex cursor-pointer items-center">
                                <AppearanceToggleDropdown />
                            </label>
                        </div> */}
                    </div>
                </div>
            </header>
            <div className={`overflow-auto transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div
                    onClick={toggleMenu}
                    className={`bg-opacity-50 fixed inset-0 bg-black transition-opacity duration-500 ${
                        menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 z-50 h-full w-72 transform overflow-auto bg-white shadow-xl transition-transform duration-500 dark:bg-gray-950 ${
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Close Button */}
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl font-bold text-gray-700">
                        ×
                    </button>

                    {/* Mobile Menu Items */}
                    <MobileLayout toggleSubMenu={toggleSubMenu} activeSubMenu={activeSubMenu} currentPath={currentPath} />
                </div>
            </div>
            {children}
            <Footer />
        </React.Fragment>
    );
};
