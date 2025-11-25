import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Form Submissions Dashboard',
        href: '/communications/form-submissions/dashboard',
    },
];

function FormSubmissions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form Submissions Dashboard" />
            <div>Form Submissions Dashboard</div>
        </AppLayout>
    );
}

export default FormSubmissions;
