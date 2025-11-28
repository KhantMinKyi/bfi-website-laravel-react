import { UserDataTable } from '@/components/backend/user-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/dashboard',
    },
];

function UserManagement() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="p-10">
                <UserDataTable />
            </div>
        </AppLayout>
    );
}

export default UserManagement;
