import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState, type ReactNode } from 'react';

interface FrondendLayoutProps {
    children: ReactNode;
}

export default ({ children }: FrondendLayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
            <header className={`  ${scrolled ? 'sticky top-4 z-50 bg-transparent ' : 'relative bg-white dark:bg-gray-950'} transition-all duration-300 ease-in-out   `}>
                <div className={`absolute left-24 top-4  ${scrolled ? 'hidden' : 'sm:hidden lg:block'}`}>
                    <img src="img/bfi_b.png" alt="" className='w-28 rotate-z-8 opacity-15 dark:opacity-50' />
                </div>
                <div className={`absolute right-20 top-4    ${scrolled ? 'hidden' : 'sm:hidden lg:block'} `}>
                    <img src="img/bfi_b.png" alt="" className=' w-44 -rotate-z-6 opacity-15 dark:opacity-50' />
                </div>
                {/* <h1 className="hidden">section heading hidden</h1> */}
                <div className={`py-[0px]  z-20 ${scrolled ? 'hidden' : 'block'} transition-all duration-300 ease-in-out `}>
                    <div className=" mx-auto max-w-11/12 sm:max-w-9/12">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3 hidden lg:block  relative  top-16 left-5 z-20">
                                <a href="index.html">
                                    <img src="img/bfi.png" className=' max-w-28' alt="" />
                                </a>
                            </div>
                            <div className={` col-span-12 lg:col-span-9  ${scrolled ? 'hidden' : 'block'}`}>
                                <div className="sm:flex  lg:justify-end justify-center flex-wrap hidden ">
                                    <div className="mx-3   sm:flex text-left  pr-2">
                                        <div
                                            className="sm:w-12 sm:h-12 sm:leading-[48px] border-[2px] border-[#F7F6F1]
                                     text-center rounded-full mr-2 sm:float-none sm:mx-auto sm:mb-1 w-8 h-8 leading-8 col:mb-1">
                                            <i className="fi flaticon-phone-call  text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="overflow-hidden ml-5 ">
                                            <span
                                                className="font-normal lg:text-base leading-4 text-green-500 mb-1 text-xs">Call
                                                Us:</span>
                                            <p className="text-[#232323] dark:text-white font-medium sm:text-sm leading-5 font-heading-font">00
                                                567 458 796 47</p>
                                        </div>
                                    </div>
                                    <div className="mx-3   sm:flex text-left  pr-2">
                                        <div
                                            className="sm:w-12 sm:h-12 sm:leading-[48px] border-[2px] border-[#F7F6F1]
                                     text-center rounded-full mr-2 sm:float-none sm:mx-auto sm:mb-1 w-8 h-8 leading-8 col:mb-1">
                                            <i className="fi flaticon-email  text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="overflow-hidden ml-5 ">
                                            <span
                                                className="font-normal lg:text-base leading-4 text-green-500 mb-1 text-xs">Call
                                                Us:</span>
                                            <p className="text-[#232323] dark:text-white font-medium sm:text-sm leading-5 font-heading-font">00
                                                567 458 796 47</p>
                                        </div>
                                    </div>
                                    <div className="mx-3   sm:flex text-left  pr-2">
                                        <div
                                            className="sm:w-12 sm:h-12 sm:leading-[48px] border-[2px] border-[#F7F6F1]
                                     text-center rounded-full mr-2 sm:float-none sm:mx-auto sm:mb-1 w-8 h-8 leading-8 col:mb-1">
                                            <i className="fi flaticon-placeholder  text-blue-500 sm:text-lg"></i>
                                        </div>
                                        <div className="overflow-hidden ml-5 ">
                                            <span
                                                className="font-normal lg:text-base leading-4 text-green-500 mb-1 text-xs">Call
                                                Us:</span>
                                            <p className="text-[#232323] dark:text-white font-medium sm:text-sm leading-5 font-heading-font">00
                                                567 458 796 47</p>
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
                <div className=" mx-auto max-w-9/12 mt-4 sm:mt-0  ">
                    <div
                        className="flex items-center justify-between bg-blue-50 rounded-[5px] -mb-6 relative z-10 py-[10px]">
                        <div>
                            <div id="dl-menu" className="dl-menuwrapper ">
                                <button className="dl-trigger px-4 py-2  border-gray-800 border-2 text-gray-800 lg:hidden rounded-xl text-xl ml-2 " onClick={toggleMenu}>  <i className='fa fa-solid fa-bars'></i> </button>

                            </div>
                        </div>
                        <div>
                            <div className=" w-[150px] sm:w-[195px] md:w-[200px] col:w-[150px] col:ml-[50px] block lg:hidden">
                                <a className="flex items-center justify-end pr-2 md:justify-center text-white" href="index.html">
                                    <img className="max-w-20" src="img/bfi.png" alt="" /></a>
                            </div>
                            <ul className="lg:block hidden ">
                                <li className="relative  inline-block group">
                                    <Link href={route('home')} className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible">Home</Link>
                                </li>
                                <li className="relative inline-block">
                                    <a href="about.html" className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible">About</a>
                                </li>
                                <li className="relative inline-block group">
                                    <a href="#" className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible">Pages</a>
                                    <ul className="absolute w-[240px] left-0 top-[110%] pt-[20px] pb-[15px] px-[7px] z-[111] bg-[#fff]
                                shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] transition-all opacity-0 invisible
                                group-hover:opacity-100 group-hover:top-full group-hover:visible ">
                                        <li>
                                            <a href="team.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Team</a>
                                        </li>
                                        <li>
                                            <a href="service.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Service</a>
                                        </li>
                                        <li>
                                            <a href="service-single.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Service Single</a>
                                        </li>
                                        <li>
                                            <a href="testimonial.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Testimonial</a>
                                        </li>
                                        <li>
                                            <a href="faq.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Faq</a>
                                        </li>
                                        <li>
                                            <a href="login.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">login</a>
                                        </li>
                                        <li>
                                            <a href="404.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">404</a>
                                        </li>

                                    </ul>
                                </li>
                                <li className="relative inline-block group">
                                    <a href="#" className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible">Shop</a>
                                    <ul className="absolute w-[240px] left-0 top-[110%] pt-[20px] pb-[15px] px-[7px] z-[111] bg-[#fff]
                                shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] transition-all opacity-0 invisible
                                group-hover:opacity-100 group-hover:top-full group-hover:visible ">
                                        <li>
                                            <a href="shop.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Shop Page</a>
                                        </li>
                                        <li>
                                            <a href="shop-single.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Shop Single</a>
                                        </li>
                                        <li>
                                            <a href="cart.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Cart</a>
                                        </li>
                                        <li>
                                            <a href="checkout.html" className="text-[16px] lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Checkout</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative inline-block group">
                                    <a href="#" className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible">Blog</a>
                                    <ul className="absolute w-[240px] left-0 top-[110%] pt-[20px] pb-[15px] px-[7px] z-[111] bg-[#fff]
                                shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] transition-all opacity-0 invisible
                                group-hover:opacity-100 group-hover:top-full group-hover:visible ">
                                        <li>
                                            <a href="blog.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog With Right Sidebar</a>
                                        </li>
                                        <li>
                                            <a href="blog-left-sidebar.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog With Left Sidebar</a>
                                        </li>
                                        <li>
                                            <a href="blog-fullwidth.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog Fullwidth</a>
                                        </li>
                                        <li className="relative group/group-2">
                                            <a href="#" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog details</a>
                                            <ul className="absolute w-[240px] left-[120%] top-0 pt-[20px] pb-[15px] px-[7px] z-[111] bg-[#fff]
                                        shadow-[0px_2px_20px_0px_rgba(62,65,159,0.09);] opacity-0 invisible
                                        transition-all group-hover/group-2:opacity-100 group-hover/group-2:left-[103%]
                                        group-hover/group-2:visible">
                                                <li>
                                                    <a href="blog-single.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog details right sidebar</a>
                                                </li>

                                                <li>
                                                    <a href="blog-single-left-sidebar.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog details left sidebar</a>
                                                </li>

                                                <li>
                                                    <a href="blog-single-fullwidth.html" className="text-[16px]
                                        lg:text-[16px] inline-block  px-[15px] uppercase
                                        text-[#0a272c] group relative overflow-hidden font-bold transition-all
                                        after:absolute after:left-[15px] after:bottom-0 after:w-0 after:h-[2px]
                                        after:content after:bg-[#ea7c08] after:transition-all font-heading-font
                                        hover:after:w-[50%]">Blog details fullwidth</a>
                                                </li>


                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative inline-block">
                                    <a href="contact.html" className="relative text-[16px] lg:text-[17px] xl:py-[35px]
                                py-[30px] xl:px-[20px] px-[6px]
                                text-[#14212b] block uppercase
                                font-heading-font font-bold transition-all
                                hover:text-blue-800
                                before:absolute before:left-0 before:top-0 before:w-full before:h-[4px]
                                before:bg-blue-700 before:content
                                before:opacity-0 before:invisible before:transition-all before:rounded-[3px]
                                hover:before:opacity-100 hover:before:visible
                            ">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className=" items-center pr-[15px] lg:pr-[4px] sm:pr-0 hidden md:flex">

                            <a className=" py-2 px-4 rounded-2xl mr-2 text-white border-l shadow-2xl cursor-pointer bg-sky-500 hidden md:block"
                                href="contact.html">Contact Us</a>
                        </div>
                    </div>
                </div>
            </header>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[1000px]' : 'max-h-0'
                    }`}
            >
                <div
                    onClick={toggleMenu}
                    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                ></div>


                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-500 z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
                    >
                        ×
                    </button>

                    {/* Menu Items */}
                    <nav className="mt-16 p-6 space-y-4 font-heading-font uppercase text-gray-800">
                        {/* Home */}
                        <div>
                            <button
                                onClick={() => toggleSubMenu('home')}
                                className="w-full flex justify-between items-center py-2 text-left"
                            >
                                Home
                                <span>{activeSubMenu === 'home' ? '▲' : '▼'}</span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'home' ? 'max-h-40' : 'max-h-0'
                                    }`}
                            >
                                <ul className="ml-4 mt-2 space-y-4 text-sm text-gray-600">
                                    <li><a href="index.html">Home style 1</a></li>
                                    <li><a href="index-2.html">Home style 2</a></li>
                                    <li><a href="index-3.html">Home style 3</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <a href="about.html" className="block py-2">About</a>
                        </div>

                        {/* Pages */}
                        <div>
                            <button
                                onClick={() => toggleSubMenu('pages')}
                                className="w-full flex justify-between items-center py-2 text-left"
                            >
                                Pages
                                <span>{activeSubMenu === 'pages' ? '▲' : '▼'}</span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'pages' ? 'max-h-40' : 'max-h-0'
                                    }`}
                            >
                                <ul className="ml-4 mt-2 space-y-2 text-sm text-gray-600">
                                    <li><a href="team.html">Team</a></li>
                                    <li><a href="service.html">Service</a></li>
                                    <li><a href="faq.html">FAQ</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <a href="contact.html" className="block py-2">Contact</a>
                        </div>
                    </nav>
                </div>
            </div>
            {children}
        </React.Fragment>
    )
};
