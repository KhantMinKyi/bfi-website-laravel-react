import { FaqDataType } from '@/types';
import { DotLoading } from '../../core/dot-loading';
import PullUpHeader from '../../core/pull-up-header';
type Props = {
    faq: FaqDataType[];
    isLoading: boolean;
};
const FAQList: React.FC<Props> = ({ faq, isLoading }) => {
    return (
        <div className="relative mx-auto mt-8 w-full px-10 pt-10 pb-8 ring-gray-900/5">
            <div className="mx-auto max-w-2xl px-5">
                <div className="flex flex-col items-center">
                    <h2 className="font-merriweather text-center text-3xl font-bold sm:text-4xl lg:text-6xl">
                        {' '}
                        <PullUpHeader text={'FAQ'} className="z-10 text-blue-900 dark:text-green-700" />
                    </h2>
                    <p className="font-merriweather mt-6 text-lg text-neutral-700 md:text-lg dark:text-neutral-300">
                        Below you will find a comprehensive list of the most frequently asked questions we receive. Should you have a question we have
                        not listed below, please contact Haileybury Admissions on{' '}
                        <span className="text-blue-900 dark:text-green-700">+959123456789</span> .
                    </p>
                </div>
                {isLoading ? (
                    <div className="container mx-auto flex justify-center gap-10">
                        <div className="flex h-64 items-center justify-center text-lg text-gray-500">
                            <DotLoading />
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto mt-8 grid max-w-2xl divide-y divide-neutral-200">
                        {faq.map((f, i) => (
                            <div className="py-5" key={i}>
                                <details className="group transition-all">
                                    <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-medium">
                                        <span> {f.question}</span>
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
                                    <p className="mt-3 text-neutral-600 transition-all group-open:animate-out">{f.answer}</p>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQList;
