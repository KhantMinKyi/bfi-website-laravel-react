import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Competitions Dashboard',
        href: '/public_data/competitions/dashboard',
    },
];

function CompetitionsDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Competitions Dashboard" />
            <div>Competitions Dashboard</div>
        </AppLayout>
    );
}

export default CompetitionsDashboard;
