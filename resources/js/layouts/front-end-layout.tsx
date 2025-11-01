import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import Footer from '@/components/front-end/core/footer';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState, type ReactNode } from 'react';

interface FrondendLayoutProps {
    children: ReactNode;
}

const baseLink =
    'font-heading-font before:content relative block px-[6px] py-[30px] text-sm font-bold uppercase transition-all before:invisible before:absolute before:top-0 before:left-0 before:h-[4px] before:w-full before:rounded-[3px] before:bg-blue-700 before:opacity-0 before:transition-all hover:text-blue-800 hover:before:visible hover:before:opacity-100 lg:text-[17px] xl:px-[16px] xl:py-[35px]';
const activeLink =
    'font-heading-font before:content relative block px-[6px] py-[30px] text-sm font-bold uppercase transition-all before:invisible before:absolute before:top-0 before:left-0 before:h-[4px] before:w-full before:rounded-[3px] before:bg-blue-700 before:opacity-0 before:transition-all text-blue-800 before:visible before:opacity-100 lg:text-[17px] xl:px-[16px] xl:py-[35px]';
export default ({ children }: FrondendLayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();
    const currentPath = new URL(url, window.location.origin).pathname;
    console.log(currentPath);
    console.log(route('home'));

    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };
    const toggleSubMenu = (menu: string) => {
        setActiveSubMenu(activeSubMenu === menu ? null : menu);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setTimeout(() => {
                    setScrolled(true);
                }, 100);
            } else {
                setTimeout(() => {
                    setScrolled(false);
                }, 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <React.Fragment>
            <header
                className={` ${scrolled ? 'sticky top-4 z-50 bg-transparent' : 'relative bg-white dark:bg-gray-950'} transition-all duration-300 ease-in-out`}
            >
                <div className={`absolute top-4 left-24 ${scrolled ? 'hidden' : 'sm:hidden lg:block'}`}>
                    <img src="img/bfi_b.png" alt="" className="w-28 rotate-z-8 opacity-15 dark:opacity-50" />
                </div>
                <div className={`absolute top-4 right-20 ${scrolled ? 'hidden' : 'sm:hidden lg:block'} `}>
                    <img src="img/bfi_b.png" alt="" className="w-44 -rotate-z-6 opacity-15 dark:opacity-50" />
                </div>
                {/* <h1 className="hidden">section heading hidden</h1> */}
                <div className={`z-20 py-[0px] ${scrolled ? 'hidden' : 'block'} transition-all duration-300 ease-in-out`}>
                    <div className="mx-auto max-w-11/12 sm:max-w-9/12">
                        <div className="grid grid-cols-12 items-center gap-4">
                            <div className="relative top-16 left-5 z-20 col-span-3 hidden lg:block">
                                <a href="index.html">
                                    <img src="img/bfi.png" className="max-w-28 transition-all dark:grayscale" alt="" />
                                </a>
                            </div>
                            <div className={`col-span-12 lg:col-span-9 ${scrolled ? 'hidden' : 'block'}`}>
                                <div className="hidden flex-wrap justify-center sm:flex lg:justify-end">
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-phone-call text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Call Us:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                                00 567 458 796 47
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-email text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Call Us:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                                00 567 458 796 47
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mx-3 pr-2 text-left sm:flex">
                                        <div className="col:mb-1 mr-2 h-8 w-8 rounded-full border-[2px] border-[#F7F6F1] text-center leading-8 sm:float-none sm:mx-auto sm:mb-1 sm:h-12 sm:w-12 sm:leading-[48px]">
                                            <i className="fi flaticon-placeholder text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="ml-5 overflow-hidden">
                                            <span className="mb-1 text-xs leading-4 font-normal text-green-500 lg:text-base">Call Us:</span>
                                            <p className="font-heading-font leading-5 font-medium text-[#232323] sm:text-sm dark:text-white">
                                                00 567 458 796 47
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="hidden lg:block  absolute -top-5 left-35 z-20">
                                <a href="index.html">
                                    <img src="img/bfi.png" className=' max-w-28' alt="" />
                                </a>
                            </div> */}
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
                                <a className="flex items-center justify-end pr-2 text-white md:justify-center" href="index.html">
                                    <img className="max-w-20" src="img/bfi.png" alt="" />
                                </a>
                            </div>
                            <ul className="hidden text-[#14212b] lg:block dark:text-gray-50">
                                {/* Home */}
                                <li className="group relative inline-block">
                                    <Link href={route('home')} className={`${currentPath === '/' ? activeLink : baseLink}`}>
                                        Home
                                    </Link>
                                </li>
                                {/* About Us */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        About Us
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Sister Schools
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Our History
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Vision , Mission & Values
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service-single.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Philosophy
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="faq.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Leaderships Teams
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="login.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                BFI Advantage
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* Sister Schools */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        Sister Schools
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                SKT International School ( Riverside Campus)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                SKT International Prechool ( Riverside Campus)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                SKT International School ( City Campus)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                SKT International Prechool ( City Campus)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Mandalay International School of Acumen
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service-single.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Mandalay International School of Acumen ( KinderGarten )
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="faq.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Naypyitaw International School of Acumen
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="login.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Naypyitaw International School of Acumen ( KinderGarten )
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* Curriculum */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        Curriculum
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Pre-School (Ages 2-6)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Primary School (Year 2-6)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Secondary School (Year 7-9)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                IGCSE (Year 10-11)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                The IB Diploma Programme (Year 12-13)
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="service-single.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Cambridge International A-Level
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="faq.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Weekend English Course
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="login.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Weekend English Course
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* Admissions */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        Admissions
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Applying to BFI Sister Schools
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Admission Policies
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="team.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Frequently asked questions
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* BFI Olympiads */}
                                <li className="group relative inline-block">
                                    <a href="#" className={`${currentPath === '/about' ? activeLink : baseLink}`}>
                                        BFI Olympiads
                                    </a>
                                    <ul className="shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] invisible absolute top-[110%] left-0 z-[111] w-[240px] space-y-5 bg-blue-50 px-[7px] pt-[20px] pb-[15px] opacity-0 transition-all group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-gray-800">
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Mathemania Competition
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="testimonial.html"
                                                className="group after:content font-heading-font relative inline-block overflow-hidden px-[15px] text-sm font-bold text-[#14212b] uppercase transition-all after:absolute after:bottom-0 after:left-[15px] after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all hover:after:w-[50%] lg:text-sm dark:text-gray-50 dark:after:bg-white"
                                            >
                                                Spelling Bee Contest
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* contact */}
                                <li className="group relative inline-block">
                                    <Link href={route('home')} className={`${currentPath === '/contact' ? activeLink : baseLink}`}>
                                        Contact Us
                                    </Link>
                                </li>
                                {/* Career */}
                                <li className="group relative inline-block">
                                    <Link href={route('home')} className={`${currentPath === '/career' ? activeLink : baseLink}`}>
                                        Career
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden items-center pr-[15px] sm:pr-0 md:flex lg:pr-[4px]">
                            <a className="mr-2 hidden cursor-pointer rounded-2xl bg-sky-500 px-4 py-2 text-white shadow-2xl md:block" href="#">
                                Contact Us
                            </a>
                            <label className="inline-flex cursor-pointer items-center">
                                {/* <input type="checkbox" value="" className="peer sr-only" /> */}
                                {/* <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div> */}
                                <AppearanceToggleDropdown />
                            </label>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div
                    onClick={toggleMenu}
                    className={`bg-opacity-50 fixed inset-0 bg-black transition-opacity duration-500 ${
                        menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-500 ${
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Close Button */}
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl font-bold text-gray-700">
                        ×
                    </button>

                    {/* Menu Items */}
                    <nav className="font-heading-font mt-16 space-y-4 p-6 text-gray-800 uppercase">
                        {/* Home */}
                        <div>
                            <button onClick={() => toggleSubMenu('home')} className="flex w-full items-center justify-between py-2 text-left">
                                Home
                                <span>{activeSubMenu === 'home' ? '▲' : '▼'}</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'home' ? 'max-h-40' : 'max-h-0'}`}>
                                <ul className="mt-2 ml-4 space-y-4 text-sm text-gray-600">
                                    <li>
                                        <a href="index.html">Home style 1</a>
                                    </li>
                                    <li>
                                        <a href="index-2.html">Home style 2</a>
                                    </li>
                                    <li>
                                        <a href="index-3.html">Home style 3</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <a href="about.html" className="block py-2">
                                About
                            </a>
                        </div>

                        {/* Pages */}
                        <div>
                            <button onClick={() => toggleSubMenu('pages')} className="flex w-full items-center justify-between py-2 text-left">
                                Pages
                                <span>{activeSubMenu === 'pages' ? '▲' : '▼'}</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'pages' ? 'max-h-40' : 'max-h-0'}`}>
                                <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-600">
                                    <li>
                                        <a href="team.html">Team</a>
                                    </li>
                                    <li>
                                        <a href="service.html">Service</a>
                                    </li>
                                    <li>
                                        <a href="faq.html">FAQ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <a href="contact.html" className="block py-2">
                                Contact
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
            {children}
            <Footer />
        </React.Fragment>
    );
};
