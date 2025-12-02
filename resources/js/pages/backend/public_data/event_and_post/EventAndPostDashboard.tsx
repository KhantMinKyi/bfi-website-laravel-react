import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
            <div>Event & Post Dashboard</div>
        </AppLayout>
    );
}

export default EventAndPostDashboard;
