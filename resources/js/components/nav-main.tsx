import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

const iconColors: Record<string, string> = {
    Dashboard: 'bg-blue-600 text-white shadow-blue-200',
    Shipments: 'bg-amber-500 text-white shadow-amber-200',
    Pricing: 'bg-emerald-500 text-white shadow-emerald-200',
};

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 px-3">
                Platform
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => {
                    const active = isCurrentUrl(item.href);
                    const colorClass = iconColors[item.title] || 'bg-slate-500 text-white shadow-slate-200';

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                className={`rounded-xl py-3 transition-all ${
                                    active
                                        ? 'bg-primary/5 font-bold border-l-[3px] border-primary'
                                        : 'hover:bg-muted/60'
                                }`}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && (
                                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm ${colorClass}`}>
                                            <item.icon className="h-4 w-4" />
                                        </span>
                                    )}
                                    <span className={active ? 'text-primary' : ''}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
