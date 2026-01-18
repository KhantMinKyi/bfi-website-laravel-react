import { AlumniDataTable } from '@/components/backend/public_data/alumni/alumni-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Alumni Dashboard',
        href: '/public_data/alumni/dashboard',
    },
];

function AlumniDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Alumni Dashboard" />
            <div className="p-10">
                <AlumniDataTable />
            </div>
        </AppLayout>
    );
}

export default AlumniDashboard;
