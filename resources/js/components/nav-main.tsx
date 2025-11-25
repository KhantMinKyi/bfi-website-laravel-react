import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    console.log(page.url.startsWith('/user-management/dashboard'));
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, i) => (
                    <div key={item.title}>
                        {item.haveSubItems ? (
                            <Collapsible defaultOpen={page.url.startsWith(item.href)} className="group/collapsible">
                                <SidebarGroup>
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger>
                                            {item.icon && <item.icon className="mr-2 text-zinc-900" />}
                                            <div className="text-sm text-zinc-900 dark:text-gray-100">{item.title}</div>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        {item.subItems?.map((subItem, key) => (
                                            <SidebarMenuButton
                                                asChild
                                                key={key}
                                                isActive={page.url.startsWith(subItem.href)}
                                                tooltip={{ children: subItem.title }}
                                                className="py-6"
                                            >
                                                <Link href={subItem.href} prefetch>
                                                    {subItem.icon && <subItem.icon />}
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        ))}
                                    </CollapsibleContent>
                                </SidebarGroup>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url.startsWith(item.href)}
                                    tooltip={{ children: item.title }}
                                    className="py-6"
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
