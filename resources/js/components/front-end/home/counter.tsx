import React from 'react'
import CountUp from 'react-countup';

function Counter() {
    return (
        <div>
            <section
                className="bg-cover bg-center bg-no-repeat bg-fixed "
                style={{ backgroundImage: "url('img/home_banner5.jpg')" }}
            >
                <div className="text-center py-20 md:pb-12 relative z-10  before:absolute before:left-0 before:top-0
       before:bg-[#0008] before:-z-10 before:w-full before:h-full">
                    <div className="wraper">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="col-span-6 md:col-span-3 col:col-span-12 mb-8 font-extrabold text-blue-400 ">
                                <div>
                                    <h3 className="text-7xl font-heading-font lg:text-6xl sm:text-5xl flex items-center justify-center ">
                                        <CountUp end={2000} duration={2} enableScrollSpy={true} separator="," className="odometer" />+
                                    </h3>
                                    <p className="text-base  md:text-sm">Students</p>
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-3 col:col-span-12 mb-8 font-extrabold text-green-400">
                                <div>
                                    <h3 className="lg:text-7xl   font-heading-font sm:text-6xl text-5xl flex items-center justify-center">
                                        <CountUp end={550} duration={2} enableScrollSpy={true} separator="," className="odometer" />+
                                    </h3>
                                    <p className="text-base  md:text-sm">Graduate</p>
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-3 col:col-span-12 mb-8 font-extrabold text-blue-400">
                                <div>
                                    <h3 className="text-7xl  font-heading-font lg:text-6xl sm:text-5xl flex items-center justify-center">
                                        <CountUp end={90} duration={2} enableScrollSpy={true} separator="," className="odometer" />%
                                    </h3>
                                    <p className="text-base  md:text-sm">Foreign Teachers</p>
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-3 col:col-span-12 mb-8 font-extrabold text-green-400">
                                <div>
                                    <h3 className="text-7xl  font-heading-font lg:text-6xl sm:text-5xl flex items-center justify-center">
                                        <CountUp end={30} duration={2} enableScrollSpy={true} separator="," className="odometer" />+
                                    </h3>
                                    <p className="text-base  md:text-sm">Awards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> {/* end container */}
            </section></div>
    )
}

export default Counter