import { SisterSchoolDataTable } from '@/components/backend/sister_schools/sister-school-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sister Schools Dashboard',
        href: '/sister_schools/dashboard',
    },
];

function SisterSchoolsDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sister Schools Dashboard" />
            <div className="p-10">
                <SisterSchoolDataTable />
            </div>
        </AppLayout>
    );
}

export default SisterSchoolsDashboard;
