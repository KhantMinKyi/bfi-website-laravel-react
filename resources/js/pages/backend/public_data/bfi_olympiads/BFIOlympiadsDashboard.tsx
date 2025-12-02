import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BFI Olympiads Dashboard',
        href: '/public_data/bfi_olympiads/dashboard',
    },
];

function BFIOlympiadsDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BFI Olympiads Dashboard" />
            <div>BFI Olympiads Dashboard</div>
        </AppLayout>
    );
}

export default BFIOlympiadsDashboard;
