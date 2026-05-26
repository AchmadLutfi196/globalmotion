import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { logout } from '@/routes';
import profileIndex from '@/routes/profile';
import securityIndex from '@/routes/security';
import appearanceIndex from '@/routes/appearance';

export function NavUser() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    if (!auth.user) {
        return null;
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all group"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-bold backdrop-blur-sm group-hover:bg-white/30 transition-all">
                    {getInitials(auth.user.name)}
                </div>
                <div className="flex-1 text-left">
                    <p className="font-label-md text-label-md text-white font-semibold truncate">
                        {auth.user.name}
                    </p>
                    <p className="font-label-sm text-label-sm text-white/70 truncate">
                        {auth.user.email}
                    </p>
                </div>
                <span className="material-symbols-outlined text-white/70 text-xl">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 right-0 mb-2 z-50 rounded-xl bg-white shadow-xl border border-surface-border overflow-hidden">
                        <div className="p-3 border-b border-surface-border bg-surface-container-lowest">
                            <p className="font-label-md text-label-md text-primary font-semibold">
                                {auth.user.name}
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                {auth.user.email}
                            </p>
                        </div>
                        <div className="p-2">
                            <Link
                                href={profileIndex()}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                                    person
                                </span>
                                <span className="font-label-md text-label-md text-on-surface">
                                    Profile
                                </span>
                            </Link>
                            <Link
                                href={securityIndex()}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                                    shield
                                </span>
                                <span className="font-label-md text-label-md text-on-surface">
                                    Security
                                </span>
                            </Link>
                            <Link
                                href={appearanceIndex()}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                                    palette
                                </span>
                                <span className="font-label-md text-label-md text-on-surface">
                                    Appearance
                                </span>
                            </Link>
                            <div className="my-2 border-t border-surface-border" />
                            <Link
                                href={logout()}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-status-error/10 transition-colors group"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="material-symbols-outlined text-status-error">
                                    logout
                                </span>
                                <span className="font-label-md text-label-md text-status-error">
                                    Log out
                                </span>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
