import { BfiOlympiad } from '@/types';
import Loading from '../core/loading';
import PullUpHeader from '../core/pull-up-header';
type Props = {
    data: BfiOlympiad[];
    isLoading: boolean;
};
const DataList: React.FC<Props> = ({ data, isLoading }) => {
    return (
        <div className="relative mx-auto mt-8 w-full px-10 pt-10 pb-8 ring-gray-900/5">
            <div className="mx-auto max-w-2xl px-5">
                <div className="flex flex-col items-center">
                    <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                        {' '}
                        <PullUpHeader text={'BFI Olympiads'} className="z-10 text-blue-900 dark:text-green-700" />
                    </h2>
                    <p className="font-merriweather mt-6 text-justify text-lg text-neutral-700 md:text-lg dark:text-neutral-300">
                        The school places strong emphasis on International Olympiads and Project Competitions. Talented, motivated, and academically
                        outstanding students are selected from Grade 6 onward and offered special classes in Mathematics and Science after school
                        hours, on weekends, and during holidays. These intensive and challenging programs continue for three to four years, during
                        which students study advanced Mathematics, Biology, Chemistry, and Physics under the guidance of expert supervisors. Their
                        learning includes both theoretical foundations and practical applications of science.
                    </p>
                    <p className="font-merriweather mt-6 text-justify text-lg text-neutral-700 md:text-lg dark:text-neutral-300">
                        By the end of Grade 8 or Grade 9, students participate in international and regional Olympiads. Additionally, students in
                        Grades 8 and 9 who demonstrate exceptional interest and skill in Biology, Chemistry, Physics, or Computer Science are given
                        the opportunity to undertake project-based research. They work on these projects for at least one year under close teacher
                        supervision.
                    </p>
                </div>
                {isLoading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <Loading />
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto mt-8 grid max-w-2xl divide-y divide-neutral-200">
                        {data.map((d, i) => (
                            <div className="py-5" key={i}>
                                <details className="group transition-all">
                                    <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-medium">
                                        <span> {d.title}</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg
                                                fill="none"
                                                height="24"
                                                shape-rendering="geometricPrecision"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                viewBox="0 0 24 24"
                                                width="24"
                                            >
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="mt-3 transition-all group-open:animate-out">({d.information})</p>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataList;
