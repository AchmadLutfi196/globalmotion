import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { NavUser } from '@/components/nav-user';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';

interface NavItem {
    title: string;
    href: string;
    icon: string;
    badge?: string;
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: 'dashboard',
    },
    {
        title: 'Shipments',
        href: '/admin/shipments',
        icon: 'inventory_2',
        badge: 'New',
    },
    {
        title: 'Pricing',
        href: '/admin/pricing',
        icon: 'payments',
    },
];

export function AppSidebar() {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (href: string) => {
        return url.startsWith(href);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-primary via-primary-container to-primary transition-all duration-300 ${
                collapsed ? 'w-20' : 'w-64'
            } flex flex-col shadow-xl z-50`}
        >
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link href={dashboard()} className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all group-hover:scale-110">
                        <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="font-headline-lg text-headline-lg text-white font-bold">
                                Global Motion
                            </span>
                            <span className="font-label-sm text-label-sm text-white/70">
                                Admin Panel
                            </span>
                        </div>
                    )}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                    <span className="material-symbols-outlined text-xl">
                        {collapsed ? 'chevron_right' : 'chevron_left'}
                    </span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {mainNavItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                active
                                    ? 'bg-white text-primary shadow-lg'
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-2xl ${
                                    active ? 'fill' : ''
                                }`}
                            >
                                {item.icon}
                            </span>
                            {!collapsed && (
                                <>
                                    <span className="flex-1 font-label-md text-label-md font-semibold">
                                        {item.title}
                                    </span>
                                    {item.badge && (
                                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-secondary text-white">
                                            {item.badge}
                                        </span>
                                    )}
                                    {active && (
                                        <span className="material-symbols-outlined text-sm">
                                            chevron_right
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>
                    );
                })}

                {/* Divider */}
                {!collapsed && (
                    <div className="my-4 border-t border-white/10" />
                )}

                {/* Quick Actions */}
                {!collapsed && (
                    <div className="space-y-2">
                        <p className="px-4 font-label-sm text-label-sm text-white/70 uppercase tracking-wider">
                            Quick Actions
                        </p>
                        <Link
                            href={admin.shipments.create().url}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg group"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                add_circle
                            </span>
                            <span className="flex-1 font-label-md text-label-md font-semibold">
                                New Shipment
                            </span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Footer with User */}
            <div className="p-4 border-t border-white/10">
                {!collapsed ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <NavUser />
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
