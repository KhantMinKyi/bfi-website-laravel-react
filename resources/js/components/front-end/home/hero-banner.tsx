import React from 'react'

function HeroBanner() {
    return (
        <div
            className="bg-blue-950 dark:bg-gray-900 py-10 ">
            {/* <div className="wraper "> */}
            <div className="grid grid-cols-12 gap-x-4 ">
                <div className="col-span-12 sm:col-span-6 md:col-span-4 col:col-span-12 my-auto py-10 pl-4">
                    <div
                        className="flex items-center justify-center md:mb-4 md:justify-center sm:mb-8 sm:flex-wrap sm:text-center col:block">
                        <div>
                            <div
                                className="w-[70px] h-[70px] bg-white rounded-full flex justify-center items-center relative dark:bg-white md:w-[60px] md:h-[60px]
                                            sm:mx-auto  sm:mb-3  before:absolute before:left-[-10%]  before:top-[-10%] before:border-white before:border before:border-dashed before:w-[120%] before:h-[120%] before:rounded-[50%] lg:before:border-[#232323]">
                                <img src="assets/images/icon/1.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 xl:px-5 md:pr-0">
                            <h4
                                className="font-normal text-2xl text-gray-50 mb-3 xl:text-xl xl:mb-1 dark:text-white md:text-lg">
                                Free Deliver</h4>
                            <p className="text-gray-50  xl:text-sm">Lorem ipsum simply dummy text the
                                printing type setting.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 col:col-span-12  my-auto py-10 pl-4">
                    <div
                        className="flex items-center justify-center md:mb-4 md:justify-center sm:mb-8 sm:flex-wrap sm:text-center col:block">
                        <div>
                            <div
                                className="w-[70px] h-[70px] bg-white rounded-full flex justify-center items-center relative dark:bg-white md:w-[60px] md:h-[60px]
                                            sm:mx-auto  sm:mb-3  before:absolute before:left-[-10%]  before:top-[-10%] before:border-white before:border before:border-dashed before:w-[120%] before:h-[120%] before:rounded-[50%] lg:before:border-[#232323]">
                                <img src="assets/images/icon/2.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 xl:px-5 md:pr-0">
                            <h4
                                className="font-normal text-2xl text-gray-50 mb-3 xl:text-xl xl:mb-1 dark:text-white md:text-lg">
                                Support 24/07</h4>
                            <p className="text-gray-50  xl:text-sm">Lorem ipsum simply dummy text the
                                printing type setting.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 col:col-span-12  my-auto py-10 pl-4">
                    <div
                        className="flex items-center justify-center  md:justify-center sm:flex-wrap sm:text-center col:block">
                        <div>
                            <div
                                className="w-[70px] h-[70px] bg-white rounded-full flex justify-center items-center relative dark:bg-white md:w-[60px] md:h-[60px]
                                            sm:mx-auto  sm:mb-3  before:absolute before:left-[-10%]  before:top-[-10%] before:border-white before:border before:border-dashed before:w-[120%] before:h-[120%] before:rounded-[50%] lg:before:border-[#232323]">
                                <img src="assets/images/icon/3.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 xl:px-5 md:pr-0">
                            <h4
                                className="font-normal text-2xl text-gray-50 mb-3 xl:text-xl xl:mb-1 dark:text-white md:text-lg">
                                Secure Payment</h4>
                            <p className="text-gray-50  xl:text-sm">Lorem ipsum simply dummy text the
                                printing type setting.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default HeroBanner