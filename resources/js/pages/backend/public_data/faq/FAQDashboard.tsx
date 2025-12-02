import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ Dashboard',
        href: '/public_data/faq/dashboard',
    },
];

function FAQDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Dashboard" />
            <div>FAQ Dashboard</div>
        </AppLayout>
    );
}

export default FAQDashboard;
