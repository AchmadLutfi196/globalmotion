import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Global Motion | Logistics & Shipping',
  description: 'Engineered for Global Motion. Precision logistics, global scale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0,24&display=swap" rel="stylesheet" />
        <style>{`.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1; }`}</style>
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
        <nav className="bg-surface w-full top-0 sticky border-b border-surface-border z-50">
          <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
            <Link href="/" className="flex items-center gap-2 group">
              <Image alt="Global Motion Logo" width={48} height={48} className="h-12 w-12 object-contain group-active:scale-95 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0SxsPJUdK0isHWA_RYRHc-SRemOok_P94zqy7vSoMhVatPsOZHpVVLOmPUMX46OhFe5ISfjF9YRfs4ctiU6PaU0slPvcKsAKT0-m94pJPTGYK4SiZZ2U6cRqSBYsG_rfD82-OvKtdRoeNOzsviyrr6FtJKagvLu2KfLtmS_DEahfyNN5uE6cDwftKM0rlS4Y8rRSNxOnhm0sSQRsk1G1nHdB-2RURdhkiztJ9xEW8_4MhR1xSnmpKJoGGWLtJrRbTR1jPc89f0i8d" referrerPolicy="no-referrer" />
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

        {children}

        <footer className="bg-primary w-full mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto border-b border-white/10">
            <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image alt="Global Motion Logo" width={48} height={48} className="h-12 w-12 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0SxsPJUdK0isHWA_RYRHc-SRemOok_P94zqy7vSoMhVatPsOZHpVVLOmPUMX46OhFe5ISfjF9YRfs4ctiU6PaU0slPvcKsAKT0-m94pJPTGYK4SiZZ2U6cRqSBYsG_rfD82-OvKtdRoeNOzsviyrr6FtJKagvLu2KfLtmS_DEahfyNN5uE6cDwftKM0rlS4Y8rRSNxOnhm0sSQRsk1G1nHdB-2RURdhkiztJ9xEW8_4MhR1xSnmpKJoGGWLtJrRbTR1jPc89f0i8d" referrerPolicy="no-referrer" />
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
      </body>
    </html>
  );
}
