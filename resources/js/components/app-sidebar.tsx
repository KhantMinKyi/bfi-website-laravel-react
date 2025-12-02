import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Award,
    BadgeCheck,
    BookKeyIcon,
    BookOpenText,
    BriefcaseBusiness,
    CalendarDays,
    ClipboardType,
    Globe,
    LayoutGrid,
    LucideMessageCircleQuestion,
    Network,
    Percent,
    School,
    TextSearch,
    UserCog2Icon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        haveSubItems: false,
    },
    {
        title: 'User Management',
        href: '/user-management/dashboard',
        icon: UserCog2Icon,
        haveSubItems: false,
    },
    {
        title: 'Communications',
        href: '/communications/',
        icon: TextSearch,
        haveSubItems: true,
        isActive: false,
        subItems: [
            {
                title: 'Jobs',
                href: '/communications/jobs/dashboard',
                icon: BriefcaseBusiness,
            },
            {
                title: 'Form Submissions',
                href: '/communications/form-submissions/dashboard',
                icon: ClipboardType,
            },
        ],
    },
    {
        title: 'Sister Schools',
        href: '/sister_schools/dashboard',
        icon: School,
        haveSubItems: false,
    },
    {
        title: 'Public Data',
        href: '/public_data/',
        icon: Globe,
        haveSubItems: true,
        isActive: false,
        subItems: [
            {
                title: 'Events & Posts',
                href: '/public_data/event_and_post/dashboard',
                icon: CalendarDays,
            },
            {
                title: 'FAQ',
                href: '/public_data/faq/dashboard',
                icon: LucideMessageCircleQuestion,
            },
            {
                title: 'Competitions',
                href: '/public_data/competitions/dashboard',
                icon: Percent,
            },
            {
                title: 'BFI Olympiads',
                href: '/public_data/bfi_olympiads/dashboard',
                icon: Award,
            },
        ],
    },
    {
        title: 'Education',
        href: '/education/dashboard',
        icon: BookOpenText,
        haveSubItems: false,
    },
    {
        title: 'Site Profile',
        href: '/site_profile/',
        icon: BadgeCheck,
        haveSubItems: true,
        isActive: false,
        subItems: [
            {
                title: 'About BFI',
                href: '/site_profile/about_bfi/dashboard',
                icon: BookKeyIcon,
            },
            {
                title: 'CSA',
                href: '/site_profile/cas/dashboard',
                icon: Network,
            },
        ],
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//         haveSubItems: false,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//         haveSubItems: false,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
