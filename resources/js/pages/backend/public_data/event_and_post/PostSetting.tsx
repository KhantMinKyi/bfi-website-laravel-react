import { PostTypeSettingDataTable } from '@/components/backend/public_data/event_and_post/post_setting/post-type-setting-data-table';
import { CategoryTagSettingDataTable } from '@/components/backend/public_data/event_and_post/tag_category_setting/category-tag-setting-data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event & Post Dashboard',
        href: '/public_data/event_and_post/dashboard',
    },
    {
        title: 'Setting',
        href: '/public_data/event_and_post/setting',
    },
];

function PostSetting() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="PostSetting" />
            <div className="p-10">
                {/* <Toaster /> */}
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                        <div className="p-2">Post Setting</div>
                        <PostTypeSettingDataTable />
                    </div>
                    <div className="col-span-8">
                        <div className="p-2">Tag & Category Setting</div>
                        <CategoryTagSettingDataTable />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default PostSetting;
