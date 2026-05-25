import { Link } from '@inertiajs/react';

export default function MainNavbar() {
  return (
    <nav className="bg-surface w-full top-0 sticky border-b border-surface-border z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            alt="Global Motion Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain group-active:scale-95 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0SxsPJUdK0isHWA_RYRHc-SRemOok_P94zqy7vSoMhVatPsOZHpVVLOmPUMX46OhFe5ISfjF9YRfs4ctiU6PaU0slPvcKsAKT0-m94pJPTGYK4SiZZ2U6cRqSBYsG_rfD82-OvKtdRoeNOzsviyrr6FtJKagvLu2KfLtmS_DEahfyNN5uE6cDwftKM0rlS4Y8rRSNxOnhm0sSQRsk1G1nHdB-2RURdhkiztJ9xEW8_4MhR1xSnmpKJoGGWLtJrRbTR1jPc89f0i8d"
            referrerPolicy="no-referrer"
          />
          <span className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">GLOBAL MOTION</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/tracking" className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors duration-200">Tracking</Link>
          <Link href="/services" className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors duration-200">Services</Link>
          <Link href="/about" className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors duration-200">About Us</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors duration-200">Testimonials</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors duration-200">Support</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container-low border border-surface-border rounded-DEFAULT font-label-md text-label-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-48 group-hover:w-64" placeholder="Track shipment..." type="text" />
          </div>
          <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-DEFAULT hover:bg-primary-container transition-colors active:scale-95 shadow-sm hidden md:block">Ship Now</button>
          <button className="md:hidden text-on-surface p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
