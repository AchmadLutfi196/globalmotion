import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode & { type?: { layout?: { breadcrumbs?: BreadcrumbItem[] } } };
}) {
    const breadcrumbs = children?.type?.layout?.breadcrumbs || [];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
