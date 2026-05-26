import { Link } from '@inertiajs/react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-surface-border bg-surface-container-lowest/80 backdrop-blur-sm px-6 shadow-sm">
            <div className="flex items-center gap-3">
                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-2 font-body-md text-body-md">
                        <Link
                            href="/admin/dashboard"
                            className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">home</span>
                        </Link>
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-outline">
                                    chevron_right
                                </span>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-on-surface-variant hover:text-primary transition-colors font-medium"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <span className="text-primary font-semibold">
                                        {item.title}
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-xl">search</span>
                </button>

                {/* Notifications */}
                <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-xl">notifications</span>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary animate-pulse" />
                </button>

                {/* Settings */}
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-xl">settings</span>
                </button>
            </div>
        </header>
    );
}
