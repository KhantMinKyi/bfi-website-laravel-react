import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About BFI Dashboard',
        href: '/site_profile/about_bfi/dashboard',
    },
];

function AboutBFIDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About BFI Dashboard" />
            <div>About BFI Dashboard</div>
        </AppLayout>
    );
}

export default AboutBFIDashboard;
