'use client';

import { JobPost } from '@/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, DollarSign, MapPin, Settings } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const JOBS_PER_PAGE = 9;

function JobCardSkeleton() {
    return (
        <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4">
                <div className="mb-2 h-6 w-20 animate-pulse rounded-lg bg-muted" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            </div>
            <div className="mb-6 flex-grow space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
            <div className="border-t border-border pt-4">
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
        </div>
    );
}

export default function CareerJobList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [jobPostsData, setJobPostsData] = useState<JobPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('/api/career/get-job-post-data');

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const result = await response.json();
                setJobPostsData(result.data || []);
            } catch (err) {
                console.error('[v0] Error fetching jobs:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        if (!selectedFilter) return jobPostsData;
        return jobPostsData.filter(
            (job) => job.function === selectedFilter || job.experience_level === selectedFilter || job.type === selectedFilter,
        );
    }, [selectedFilter, jobPostsData]);

    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

    const functions = [...new Set(jobPostsData.map((j) => j.function))];
    const experienceLevels = [...new Set(jobPostsData.map((j) => j.experience_level))];
    const jobTypes = [...new Set(jobPostsData.map((j) => j.type))];

    return (
        <section className="bg-gradient-to-b from-background to-muted/30 px-4 py-16 md:px-6 lg:px-8 dark:from-background dark:to-muted/20">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Open Positions</h2>
                    <p className="text-lg text-muted-foreground">
                        Join our team and help shape the future. We&apos;re always looking for talented individuals.
                    </p>
                </motion.div>

                {/* Filters */}
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12 flex flex-wrap gap-3"
                    >
                        <button
                            onClick={() => setSelectedFilter(null)}
                            className={`rounded-full px-5 py-2 font-medium transition-all ${selectedFilter === null
                                ? 'bg-primary text-primary-foreground'
                                : 'border border-border bg-background text-foreground hover:border-primary hover:bg-primary/5'
                                }`}
                        >
                            All Jobs
                        </button>

                        {functions.map((fn) => (
                            <button
                                key={fn}
                                onClick={() => setSelectedFilter(fn)}
                                className={`rounded-full px-5 py-2 font-medium transition-all ${selectedFilter === fn
                                    ? 'bg-primary text-primary-foreground'
                                    : 'border border-border bg-background text-foreground hover:border-primary hover:bg-primary/5'
                                    }`}
                            >
                                {fn}
                            </button>
                        ))}

                        {experienceLevels.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedFilter(level)}
                                className={`rounded-full px-5 py-2 font-medium transition-all ${selectedFilter === level
                                    ? 'bg-primary text-primary-foreground'
                                    : 'border border-border bg-background text-foreground hover:border-primary hover:bg-primary/5'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: JOBS_PER_PAGE }).map((_, index) => (
                            <JobCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950"
                    >
                        <p className="text-red-700 dark:text-red-300">{error}. Please try refreshing the page.</p>
                    </motion.div>
                )}

                {/* Job Grid */}
                {!isLoading && !error && (
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <Link href={`/career/job-detail/${job.id}`}>
                                    <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg dark:bg-card dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/10">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <div className="mb-2 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                                {job.function}
                                            </div>
                                            <h3 className="line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                                {job.title}
                                            </h3>
                                            {job.campus && (
                                                <h5 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                                                    ({job.title})
                                                </h5>
                                            )}
                                            <p className="mt-2 text-sm text-muted-foreground">{job.sub_function}</p>
                                        </div>

                                        {/* Details */}
                                        <div className="mb-6 flex-grow space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Briefcase className="h-4 w-4" />
                                                <span>{job.experience_level}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>{job.type}</span>
                                            </div>

                                            {!job.is_hide_salary && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Up to ${(job.maximun_salary / 1000).toFixed(0)}k</span>
                                                </div>
                                            )}
                                            {job.is_hide_salary && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Negotiable</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Settings className="h-4 w-4" />
                                                <span>{job.industry}</span>
                                            </div>
                                            {job.campus && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{job.campus} </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="border-t border-border pt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    Posted {new Date(job.created_at).toLocaleDateString()}
                                                </span>
                                                <ChevronRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && paginatedJobs.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-lg text-muted-foreground">No jobs found matching your filters. Try adjusting your search.</p>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && !error && totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-lg px-4 py-2 font-medium transition-all ${currentPage === page
                                    ? 'bg-primary text-primary-foreground'
                                    : 'border border-border text-foreground hover:border-primary hover:bg-primary/5'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
                        >
                            Next
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
