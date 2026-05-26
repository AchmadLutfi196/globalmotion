import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-white">
                <AppLogoIcon className="size-5 fill-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate leading-tight font-black text-sm tracking-tight text-primary">
                    GLOBAL MOTION
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                    Admin Panel
                </span>
            </div>
        </>
    );
}
