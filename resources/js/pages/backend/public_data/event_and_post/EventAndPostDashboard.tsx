import { UserDataTable } from '@/components/backend/user_management/user-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event & Post Dashboard',
        href: '/public_data/event_and_post/dashboard',
    },
];

function EventAndPostDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event & Post Dashboard" />
            <div className="p-10">
                <UserDataTable />
                <Toaster />
            </div>
        </AppLayout>
    );
}

export default EventAndPostDashboard;
