import { CSADataTable } from '@/components/backend/site_profile/csa/csa-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Community Service Activity Dashboard',
        href: '/site_profile/csa/dashboard',
    },
];

function CSADashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Community Service Activity Dashboard" />
            <div className="p-10">
                <CSADataTable />
            </div>
        </AppLayout>
    );
}

export default CSADashboard;
