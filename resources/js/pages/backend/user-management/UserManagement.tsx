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
            <div>User Management</div>
        </AppLayout>
    );
}

export default UserManagement;
