import { CounterType } from '@/types';
import CountUp from 'react-countup';
interface CounterPrps {
    data?: CounterType;
}
const Counter = ({ data }: CounterPrps) => {
    return (
        <div>
            <section className="bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/home_banner5.jpg')" }}>
                <div className="relative z-10 py-20 text-center before:absolute before:top-0 before:left-0 before:-z-10 before:h-full before:w-full before:bg-[#0001] md:pb-12 dark:before:bg-gray-900/90">
                    <div className="wraper">
                        <div className="grid grid-cols-12 gap-x-4">
                            <div className="col:col-span-12 col-span-6 mb-8 font-extrabold text-blue-400 md:col-span-3">
                                <div>
                                    <h3 className="font-heading-font flex items-center justify-center text-5xl sm:text-6xl lg:text-7xl">
                                        <CountUp
                                            end={data?.firstNumber ?? 2000}
                                            duration={2}
                                            enableScrollSpy={true}
                                            separator=","
                                            className="odometer"
                                        />
                                        +
                                    </h3>
                                    <p className="text-base md:text-sm">{data?.firstTitle ?? 'Students'}</p>
                                </div>
                            </div>
                            <div className="col:col-span-12 col-span-6 mb-8 font-extrabold text-green-400 md:col-span-3">
                                <div>
                                    <h3 className="font-heading-font flex items-center justify-center text-5xl sm:text-6xl lg:text-7xl">
                                        <CountUp
                                            end={data?.secondNumber ?? 550}
                                            duration={2}
                                            enableScrollSpy={true}
                                            separator=","
                                            className="odometer"
                                        />
                                        +
                                    </h3>
                                    <p className="text-base md:text-sm">{data?.secondTitle ?? 'Graduate'}</p>
                                </div>
                            </div>
                            <div className="col:col-span-12 col-span-6 mb-8 font-extrabold text-blue-400 md:col-span-3">
                                <div>
                                    <h3 className="font-heading-font flex items-center justify-center text-5xl sm:text-6xl lg:text-7xl">
                                        <CountUp
                                            end={data?.thirdNumber ?? 90}
                                            duration={2}
                                            enableScrollSpy={true}
                                            separator=","
                                            className="odometer"
                                        />
                                        %
                                    </h3>
                                    <p className="text-base md:text-sm">{data?.thirdTitle ?? 'Foreign Teacherss'}</p>
                                </div>
                            </div>
                            <div className="col:col-span-12 col-span-6 mb-8 font-extrabold text-green-400 md:col-span-3">
                                <div>
                                    <h3 className="font-heading-font flex items-center justify-center text-5xl sm:text-6xl lg:text-7xl">
                                        <CountUp
                                            end={data?.fourthNumber ?? 30}
                                            duration={2}
                                            enableScrollSpy={true}
                                            separator=","
                                            className="odometer"
                                        />
                                        +
                                    </h3>
                                    <p className="text-base md:text-sm">{data?.fourthTitle ?? 'Awards'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{' '}
                {/* end container */}
            </section>
        </div>
    );
};

export default Counter;
