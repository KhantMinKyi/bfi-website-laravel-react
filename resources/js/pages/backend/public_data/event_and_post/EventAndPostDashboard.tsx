import { UserDataTable } from '@/components/backend/user_management/user-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';

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
                <div className="ml-auto flex items-center gap-2">
                    <Link
                        href={route('public_data.event_and_post.setting')}
                        className="flex w-26 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-2 py-2 text-white hover:bg-green-800"
                    >
                        <SlidersHorizontal className="w-4" />
                        <span className="text-sm"> Setting</span>
                    </Link>
                </div>
                <UserDataTable />
                {/* <Toaster /> */}
            </div>
        </AppLayout>
    );
}

export default EventAndPostDashboard;
