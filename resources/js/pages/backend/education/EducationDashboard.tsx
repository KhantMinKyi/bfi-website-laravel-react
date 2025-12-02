import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Education Dashboard',
        href: '/education/dashboard',
    },
];

function EducationDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Education Dashboard" />
            <div>Education Dashboard</div>
        </AppLayout>
    );
}

export default EducationDashboard;
