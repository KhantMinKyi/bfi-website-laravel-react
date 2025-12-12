import { FaqDataTable } from '@/components/backend/faq/faq-data-table';
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
            <div className="p-10">
                <FaqDataTable />
            </div>
        </AppLayout>
    );
}

export default FAQDashboard;
