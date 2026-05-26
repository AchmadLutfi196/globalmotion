import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:p-10">
            {/* Subtle background pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
            
            <div className="relative w-full max-w-md">
                <div className="flex flex-col gap-8">
                    {/* Logo and branding section */}
                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href={home()}
                            className="group flex flex-col items-center gap-3 transition-transform duration-200 hover:scale-105"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg ring-1 ring-slate-900/10 transition-shadow duration-200 group-hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:ring-white/10">
                                <AppLogoIcon className="size-8 fill-current text-white dark:text-slate-900" />
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                                Global Motion
                            </span>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                {title}
                            </h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Card container for form */}
                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-shadow duration-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
