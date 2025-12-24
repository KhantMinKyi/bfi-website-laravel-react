import { JobPostDataTable } from '@/components/backend/communications/job_posts/job-post-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jobs Dashboard',
        href: '/communications/jobs/dashboard',
    },
];

function Jobs() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jobs Dashboard" />
            <div className="p-10">
                <JobPostDataTable />
            </div>
        </AppLayout>
    );
}

export default Jobs;
