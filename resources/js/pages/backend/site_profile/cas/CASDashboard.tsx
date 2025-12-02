import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Community Service Activity Dashboard',
        href: '/site_profile/cas/dashboard',
    },
];

function CASDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Community Service Activity Dashboard" />
            <div>Community Service Activity Dashboard</div>
        </AppLayout>
    );
}

export default CASDashboard;
