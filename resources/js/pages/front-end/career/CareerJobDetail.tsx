'use client';
import { DotLoading } from '@/components/front-end/core/dot-loading';
import FrontEndLayout from '@/layouts/front-end-layout';
import { JobPost } from '@/types';
import { sanitizeHtml } from '@/utils/sanitize';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronLeft, Clock, DollarSign, GraduationCap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CareerJobDetail() {
    const [liked, setLiked] = useState(false);
    const [job, setJob] = useState<JobPost>();
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = usePage().props;

    useEffect(() => {
        fetch('/api/career/get-job-post-detail/' + id)
            .then((res) => res.json())
            .then((res) => {
                setJob(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!job && !loading) {
        return (
            <FrontEndLayout>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-bold text-foreground">Job Not Found</h1>
                        <Link href={route('career')} className="text-primary hover:underline">
                            ← Back to Careers
                        </Link>
                    </div>
                </div>
            </FrontEndLayout>
        );
    }

    return (
        <FrontEndLayout>
            {loading && !job && (
                <div className="flex h-[50dvh] justify-center gap-10">
                    <DotLoading />
                </div>
            )}
            {!loading && job && (
                <div className="bg-background">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="border-b border-border bg-gradient-to-b from-muted/50 to-background px-4 py-12 dark:from-muted/20"
                    >
                        <div className="mx-auto max-w-4xl">
                            <Link
                                href={route('career')}
                                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back to Careers
                            </Link>

                            <div className="mb-6">
                                <div className="mb-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                    {job.function}
                                </div>
                                <h1 className="mb-3 text-2xl font-bold text-foreground md:text-5xl">{job.title}</h1>
                                {job.campus && (

                                    <p className="text-lg font-semibold">({job.campus})</p>
                                )}
                                <p className="text-lg text-muted-foreground">{job.sub_function}</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-lg border border-border bg-card p-4 dark:bg-card">
                                    <div className="text-sm text-muted-foreground md:text-base">Experience Level</div>
                                    <div className="mt-1 text-sm font-semibold text-foreground md:text-base">{job.experience_level}</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-4 dark:bg-card">
                                    <div className="text-sm text-muted-foreground md:text-base">Job Type</div>
                                    <div className="mt-1 text-sm font-semibold text-foreground md:text-base">{job.type}</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-4 dark:bg-card">
                                    <div className="text-sm text-muted-foreground md:text-base">Positions</div>
                                    <div className="mt-1 text-sm font-semibold text-foreground md:text-base">{job.number_of_post}</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-4 dark:bg-card">
                                    <div className="text-sm text-muted-foreground md:text-base">Salary Range</div>
                                    <div className="mt-1 text-sm font-semibold text-foreground md:text-base">
                                        {job.is_hide_salary ? '$ Negotiable' : `Up to $${Math.round(job.maximun_salary / 1000)}k`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="px-4 py-12">
                        <div className="mx-auto max-w-4xl">
                            <div className="grid gap-8 lg:grid-cols-3">
                                {/* Main Content */}
                                <div className="space-y-8 lg:col-span-2">
                                    {/* About the Role */}
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h2 className="mb-4 text-lg font-bold text-foreground md:text-2xl">About the Role</h2>
                                        <p
                                            className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeHtml(job.description),
                                            }}
                                        ></p>
                                    </motion.section>

                                    {/* Requirements */}
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <h2 className="mb-4 text-lg font-bold text-foreground md:text-2xl">Requirements</h2>
                                        <div className="space-y-3">
                                            <p
                                                className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(job.requirement),
                                                }}
                                            ></p>
                                        </div>
                                    </motion.section>

                                    {/* Benefits */}
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <h2 className="mb-4 text-lg font-bold text-foreground md:text-2xl">Benefits</h2>
                                        <div className="space-y-3">
                                            <p
                                                className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(job.benefits),
                                                }}
                                            ></p>
                                        </div>
                                    </motion.section>

                                    {/* Highlights */}
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <h2 className="mb-4 text-lg font-bold text-foreground md:text-2xl">Job Overview</h2>
                                        <div className="space-y-3">
                                            <p
                                                className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeHtml(job.highlights),
                                                }}
                                            ></p>
                                        </div>
                                    </motion.section>

                                    {/* Career Growth */}
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <h2 className="md:text-2xlfont-bold mb-4 text-lg text-foreground">Working Schedule</h2>
                                        <p
                                            className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeHtml(job.career_growth),
                                            }}
                                        ></p>
                                    </motion.section>
                                </div>

                                {/* Sidebar */}
                                <motion.aside
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6"
                                >
                                    {/* Apply Button */}
                                    <div className="space-y-3">
                                        <a
                                            href={`mailto:${job.email}`}
                                            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                                        >
                                            Apply Now
                                        </a>
                                    </div>

                                    {/* Details Card */}
                                    <div className="rounded-xl border border-border bg-card p-6 dark:bg-card">
                                        <h3 className="mb-6 text-lg font-bold text-foreground">Job Details</h3>
                                        <div className="space-y-5">
                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <Briefcase className="h-4 w-4" />
                                                    Experience Level
                                                </div>
                                                <p className="mt-1 text-foreground">{job.experience_level}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <GraduationCap className="h-4 w-4" />
                                                    Education
                                                </div>
                                                <p className="mt-1 text-foreground">{job.education_level}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    Employment Type
                                                </div>
                                                <p className="mt-1 text-foreground">{job.employee_type}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <Users className="h-4 w-4" />
                                                    Openings
                                                </div>
                                                <p className="mt-1 text-foreground">{job.number_of_post} position(s)</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                    Salary
                                                </div>
                                                <p className="mt-1 text-foreground">
                                                    {job.is_hide_salary ? 'Negotiable' : `Up to $${(job.maximun_salary / 1000).toFixed(0)}k`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Card */}
                                    <div className="rounded-xl border border-border bg-muted/50 p-6 dark:bg-muted/20">
                                        <h3 className="mb-3 text-lg font-bold text-foreground">Need Help?</h3>
                                        <p className="mb-4 text-sm text-muted-foreground">
                                            Have questions about this position? Contact our HR team at{' '}
                                            <a href={`mailto:${job.email}`} className="text-primary hover:underline">
                                                {job.email}
                                            </a>
                                        </p>
                                    </div>
                                </motion.aside>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </FrontEndLayout>
    );
}
