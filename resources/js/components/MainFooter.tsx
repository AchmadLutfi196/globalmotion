import { Link } from '@inertiajs/react';

export default function MainFooter() {
  return (
    <footer className="bg-primary w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto border-b border-white/10">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              alt="Global Motion Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0SxsPJUdK0isHWA_RYRHc-SRemOok_P94zqy7vSoMhVatPsOZHpVVLOmPUMX46OhFe5ISfjF9YRfs4ctiU6PaU0slPvcKsAKT0-m94pJPTGYK4SiZZ2U6cRqSBYsG_rfD82-OvKtdRoeNOzsviyrr6FtJKagvLu2KfLtmS_DEahfyNN5uE6cDwftKM0rlS4Y8rRSNxOnhm0sSQRsk1G1nHdB-2RURdhkiztJ9xEW8_4MhR1xSnmpKJoGGWLtJrRbTR1jPc89f0i8d"
              referrerPolicy="no-referrer"
            />
            <span className="font-headline-lg text-headline-lg font-bold text-on-primary tracking-tight">GLOBAL MOTION</span>
          </Link>
          <p className="font-body-md text-body-md text-on-primary-container mt-2 max-w-xs">Precision logistics for the modern enterprise. We move freight globally with absolute certainty.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary uppercase tracking-wider mb-2">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">About Us</Link></li>
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Global Network</Link></li>
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Careers</Link></li>
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Sustainability</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary uppercase tracking-wider mb-2">Legal</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Privacy Policy</Link></li>
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Terms of Service</Link></li>
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Sitemap</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary uppercase tracking-wider mb-2">Support</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="#" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Contact Us</Link></li>
            <li><Link href="/tracking" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">Tracking Help</Link></li>
            <li><Link href="/services" className="font-body-md text-body-md text-on-primary-container hover:text-tertiary-fixed transition-colors cursor-pointer">API Documentation</Link></li>
          </ul>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto flex justify-between items-center">
        <p className="font-body-md text-body-md text-on-primary-container text-sm">© 2024 Global Motion Logistics. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-on-primary-container hover:text-white transition-colors"><span className="material-symbols-outlined text-xl">language</span></Link>
          <Link href="#" className="text-on-primary-container hover:text-white transition-colors"><span className="material-symbols-outlined text-xl">mail</span></Link>
        </div>
      </div>
    </footer>
  );
}
