import { PostDataTable } from '@/components/backend/public_data/event_and_post/post/post-data-table';
import { UserDataTable } from '@/components/backend/user_management/user-data-table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

// Dummy data
const analyticsData = {
    totalProducts: 254,
    totalUsers: 1823,
    totalCategories: 32,
    totalInventoryValue: 543920,
};

interface DashboardDataType {
    title: string;
    route: string;
    count: number;
}
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(value);
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [data, setData] = React.useState<DashboardDataType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { auth }: any = usePage().props;
    const isAdmin = auth?.user?.is_admin === 1;
    console.log(isAdmin);

    const fetchData = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/get-dashboard-data');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="min-h-screen p-6">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's an overview of your store.</p>
                </div>

                {/* Analytics Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Products Card */}
                    {data &&
                        data.map((d) => (
                            <Card className="shadow-sm transition-shadow hover:shadow-md" key={d.title}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-gray-500">Total {d.title}</CardTitle>
                                        <div className="rounded-lg p-2 shadow">
                                            <img src="/img/bfi.webp" className="h-10" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{d.count}</div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    {isAdmin && (
                                        <Link href={d.route} className="flex h-auto items-center p-0 text-blue-600">
                                            View details <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    )}
                                    {/* <Link href={route('users')}></Link> */}
                                </CardFooter>
                            </Card>
                        ))}
                </div>
                {/* Post Table */}
                <div>
                    <PostDataTable />
                </div>
                {/* User Table */}
                <div className="mb-8">
                    {isAdmin && (
                        <UserDataTable />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
