import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <div key={item.title}>
                        {item.haveSubItems ? (
                            // <Collapsible defaultOpen={page.url.startsWith(item.href)} className="group/collapsible">
                            //     <SidebarGroup>
                            //         <SidebarGroupLabel asChild>
                            //             <CollapsibleTrigger>
                            //                 {item.icon && <item.icon className="mr-2 text-zinc-900 dark:text-white" />}
                            //                 <div className="text-sm text-zinc-900 dark:text-gray-100">{item.title}</div>
                            //                 <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            //             </CollapsibleTrigger>
                            //         </SidebarGroupLabel>
                            //         <CollapsibleContent>
                            //             {item.subItems?.map((subItem, key) => (
                            //                 <SidebarMenuButton
                            //                     asChild
                            //                     key={key}
                            //                     isActive={page.url.startsWith(subItem.href)}
                            //                     tooltip={{ children: subItem.title }}
                            //                     className="py-6"
                            //                 >
                            //                     <Link href={subItem.href} prefetch>
                            //                         {subItem.icon && <subItem.icon />}
                            //                         <span>{subItem.title}</span>
                            //                     </Link>
                            //                 </SidebarMenuButton>
                            //             ))}
                            //         </CollapsibleContent>
                            //     </SidebarGroup>
                            // </Collapsible>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip={{ children: item.title }} isActive={page.url.startsWith(item.href)} className="py-6">
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/menuitem:rotate-180" />
                                </SidebarMenuButton>

                                <SidebarMenuSub>
                                    {item.subItems?.map((subItem, key) => (
                                        <SidebarMenuSubItem key={key}>
                                            <SidebarMenuSubButton asChild isActive={page.url.startsWith(subItem.href)}>
                                                <Link href={subItem.href} prefetch>
                                                    {subItem.icon && <subItem.icon />}
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </SidebarMenuItem>
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
