import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

type ChildWithLayout = React.ReactNode & {
    type?: { layout?: { breadcrumbs?: BreadcrumbItem[] } };
    props?: { children?: ChildWithLayout };
};

function extractBreadcrumbs(children: ChildWithLayout): BreadcrumbItem[] {
    if (!children || typeof children !== 'object') return [];
    const direct = (children as ChildWithLayout)?.type?.layout?.breadcrumbs;
    if (direct) return direct;
    // nested layout: dig into props.children
    const nested = (children as ChildWithLayout)?.props?.children;
    if (nested) return extractBreadcrumbs(nested);
    return [];
}

export default function AppLayout({
    children,
}: {
    children: ChildWithLayout;
}) {
    const breadcrumbs = extractBreadcrumbs(children);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
