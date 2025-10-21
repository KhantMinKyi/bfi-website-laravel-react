import React from 'react'

function Information() {
    return (
        <section
            className="relative flex justify-center flex-col z-20 py-[120px] md:pt-[70px] md:py-[90px] sm:py-[80px] sm:pt-[60px] dark:bg-gray-950">
            <div className="  mx-auto max-w-7xl ">
                <div className="grid grid-cols-12 gap-x-4 items-center">
                    <div className="col-span-12 md:col-span-6 p-10">
                        <div className="orico-about-text-wrap 111">
                            <div className="orico-about-text">
                                <span
                                    className="text-xl font-heading-font inline-block mb-1 font-normal underline text-green-800">“ABOUT
                                    US”</span>
                                <h2 className="text-3xl sm:text-4xl  lg:text-6xl font-heading-font mb-5 font-bold ">BFI Education Services  </h2>
                                <p className="mb-5">operate 4 main campuses and 4 kindergartens in Myanmar.
                                    Our campuses are located in Yangon, Mandalay and Nay Pyi Taw. </p>
                                <ul className="mb-8 flex col:block">
                                    <li className="py-1 relative pl-6 font-semibold inline-block text-base  text-[#687693]">
                                        <i className="absolute left-0 top-1">
                                            <img src="assets/images/about/4.png" alt="" />
                                        </i>
                                        <p>It has survived not only
                                            five centuries the leap into.</p>
                                    </li>
                                    <li className="py-1 relative pl-6 font-semibold inline-block text-base  text-[#687693]">
                                        <i className="absolute left-0 top-1">
                                            <img src="assets/images/about/5.png" alt="" />
                                        </i>
                                        <p>It has survived not only
                                            five centuries the leap into.</p>
                                    </li>
                                </ul>
                                <a className=" text-white py-4 px-6 rounded-4xl hover:shadow-2xl bg-blue-800  hover:bg-green-800" href="about.html">Get In
                                    Touch</a>

                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 p-10">
                        <div className=" pl-0 md:pl-12  mt-14">
                            <div className="relative z-10 w-full p-5 col:p-2 border border-yellow-200 dark:border-0">
                                <div>
                                    <img src="assets/images/about/ab.jpg" alt="" className="w-full" />
                                </div>
                                <div className="lg:w-[201px] lg:h-[235px] col:w-[160px] col:h-[150px] bg-yellow-600 rounded-[8px] flex justify-center items-center text-center absolute
                                 left-[-25px] bottom-[-25px]  backdrop-blur-[15px] md:bottom-0 md:left-0">
                                    <div className="block">
                                        <img src="assets/images/about/badge.svg" alt="" className=" max-w-[40px] lg:max-w-[80px] mx-auto mt-2" />
                                        <span
                                            className="block max-w-[100px] lg:max-w-[133px] mx-auto font-medium pt-4 text-center capitalize text-white text-sm lg:text-base">National
                                            Organic Awards 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute left-[40px] top-1/8 -translate-y-1/8 -z-10   "><img
                src="img/skt_riverside_campus.png" alt="" className='w-60 opacity-20 rotate-6' /></div>
            <div className="absolute right-[40px] top-1/8 -translate-y-1/8 -z-10 "><img
                src="img/misa.png" alt="" className='w-60 opacity-20 -rotate-z-6' /></div>
            <div className="absolute left-[40px] top-8/8 -translate-y-8/8 -z-10  "><img
                src="img/nisa.png" alt="" className='w-60 opacity-20 -rotate-z-6' /></div>
            <div className="absolute right-[40px] top-8/8 -translate-y-8/8 -z-10 "><img
                src="img/skt_city_campus.png" alt="" className='w-60 opacity-20 rotate-6' /></div>
        </section>
    )
}

export default Information