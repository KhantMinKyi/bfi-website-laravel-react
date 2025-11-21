import ThumbnailPdf from '@/components/ThumbnailPdf';
import { PolicyPdfType } from '@/types';
import React from 'react';
type Props = {
    pdfData: PolicyPdfType[];
};
const PolicyCardGroup: React.FC<Props> = ({ pdfData }) => {
    return (
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 dark:bg-gray-950">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                            <h2 className="font-merriweather text-dark mb-3 text-3xl leading-[1.2] font-bold sm:text-4xl md:text-[40px] dark:text-white">
                                Our Schools Policies
                            </h2>
                            <p className="text-body-color font-merriweather text-base text-blue-800 dark:text-green-800">
                                Click the image and check out what our schools policies
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                    {pdfData.map((t, i) => (
                        <div key={i} className="relative flex max-w-xs flex-col items-center justify-center">
                            {/* PDF Thumbnail with Overlay */}
                            <div className="group relative">
                                <ThumbnailPdf file={t.src} />

                                {/* Overlay */}
                                <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/40 p-3 opacity-100">
                                    <p className="text-center text-sm font-semibold text-white">{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PolicyCardGroup;
