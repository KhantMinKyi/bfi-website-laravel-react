function HeroBanner() {
    return (
        <div className="bg-gray-950 py-10">
            {/* <div className="wraper "> */}
            <div className="grid grid-cols-12 gap-x-4">
                <div className="col:col-span-12 col-span-12 my-auto py-10 pl-4 sm:col-span-6 md:col-span-4">
                    <div className="col:block flex items-center justify-center sm:mb-8 sm:flex-wrap sm:text-center md:mb-4 md:justify-center">
                        <div>
                            <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white before:absolute before:top-[-10%] before:left-[-10%] before:h-[120%] before:w-[120%] before:rounded-[50%] before:border before:border-dashed before:border-white sm:mx-auto sm:mb-3 md:h-[60px] md:w-[60px] lg:before:border-[#232323] dark:bg-gray-950">
                                <img src="assets/images/icon/1.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 md:pr-0 xl:px-5">
                            <h4 className="mb-3 text-2xl font-normal text-gray-50 md:text-lg xl:mb-1 xl:text-xl">Free Deliver</h4>
                            <p className="text-gray-50 xl:text-sm">Lorem ipsum simply dummy text the printing type setting.</p>
                        </div>
                    </div>
                </div>
                <div className="col:col-span-12 col-span-12 my-auto py-10 pl-4 sm:col-span-6 md:col-span-4">
                    <div className="col:block flex items-center justify-center sm:mb-8 sm:flex-wrap sm:text-center md:mb-4 md:justify-center">
                        <div>
                            <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white before:absolute before:top-[-10%] before:left-[-10%] before:h-[120%] before:w-[120%] before:rounded-[50%] before:border before:border-dashed before:border-white sm:mx-auto sm:mb-3 md:h-[60px] md:w-[60px] lg:before:border-[#232323] dark:bg-gray-950">
                                <img src="assets/images/icon/2.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 md:pr-0 xl:px-5">
                            <h4 className="mb-3 text-2xl font-normal text-gray-50 md:text-lg xl:mb-1 xl:text-xl">Support 24/07</h4>
                            <p className="text-gray-50 xl:text-sm">Lorem ipsum simply dummy text the printing type setting.</p>
                        </div>
                    </div>
                </div>
                <div className="col:col-span-12 col-span-12 my-auto py-10 pl-4 sm:col-span-6 md:col-span-4">
                    <div className="col:block flex items-center justify-center sm:flex-wrap sm:text-center md:justify-center">
                        <div>
                            <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white before:absolute before:top-[-10%] before:left-[-10%] before:h-[120%] before:w-[120%] before:rounded-[50%] before:border before:border-dashed before:border-white sm:mx-auto sm:mb-3 md:h-[60px] md:w-[60px] lg:before:border-[#232323] dark:bg-gray-950">
                                <img src="assets/images/icon/3.png" alt="" />
                            </div>
                        </div>
                        <div className="px-10 md:pr-0 xl:px-5">
                            <h4 className="mb-3 text-2xl font-normal text-gray-50 md:text-lg xl:mb-1 xl:text-xl">Secure Payment</h4>
                            <p className="text-gray-50 xl:text-sm">Lorem ipsum simply dummy text the printing type setting.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

export default HeroBanner;
