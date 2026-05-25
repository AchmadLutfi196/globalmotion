import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

export default function Welcome() {
  return (
    <main className="flex-grow">
      <Head title="Home" />
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-oceanic-dark">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc_g5C_ls6HNTn7jFASSSNCI3ahvfKWj45C10mdCsjk_HRk1AxkhO6N9hH-i1NpS956tV9ymJs76QymW95LRWRq8Qe26u8ht0VjsDIeShtIkN-RAIazPZeGPzgbvmlJ0gNm-BPyfHT2gLDHly-3xJEUPLTD_ooAMoriIEufWT-eLZuKVsTgYR77KY09hWVYDcp7jm6ogNqFuw5RFb71H7fmTKLHl0jkFrSf-S9_9oz2sdv_RYdV2ACtH5sR6mFC7CY578k4Vjd8slE')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col items-center text-center gap-8">
          <div className="max-w-3xl">
            <h1 className="font-display-lg text-display-lg text-on-primary mb-4 drop-shadow-lg">Precision Logistics.<br/>Global Scale.</h1>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto drop-shadow-md">Engineered for high-value freight. Track, manage, and scale your global supply chain with absolute reliability.</p>
          </div>
          {/* Tracking Search Bar Component */}
          <div className="w-full max-w-2xl bg-surface p-2 rounded-xl shadow-lg flex flex-col sm:flex-row gap-2 border border-surface-border">
            <div className="flex-grow flex items-center bg-surface-container-lowest rounded-DEFAULT border border-surface-border px-4 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <span className="material-symbols-outlined text-primary mr-3">box</span>
              <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-label-md text-label-md text-on-surface placeholder-on-surface-variant outline-none" placeholder="Enter Tracking Number (e.g., GM-847291)" type="text" />
            </div>
            <Link href="/tracking" className="bg-secondary text-on-secondary font-label-md text-label-md px-8 py-3 rounded-DEFAULT hover:bg-secondary-container transition-colors flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 shadow-sm">
              <span>Track Shipment</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-primary-container text-on-primary-container border border-on-primary-container/30 font-label-md text-label-md px-6 py-2 rounded-DEFAULT hover:bg-primary transition-colors active:scale-95 backdrop-blur-sm">Get a Quote</button>
            <button className="text-on-primary hover:text-on-primary-container font-label-md text-label-md px-6 py-2 rounded-DEFAULT transition-colors active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined">support_agent</span>
              Contact Sales
            </button>
          </div>
        </div>
        {/* Structural accent */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-surface to-transparent z-10"></div>
      </section>

      {/* Our Services Section (Bento Grid) */}
      <section className="py-margin-desktop bg-surface bg-grid-pattern relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-2 block">Core Capabilities</span>
              <h2 className="font-headline-xl text-headline-xl text-primary">Multi-Modal Freight Solutions</h2>
            </div>
            <Link href="/services" className="text-primary font-label-md text-label-md flex items-center gap-1 hover:text-secondary transition-colors group">
              View All Services
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Service Card: Air */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 mb-6 rounded-DEFAULT bg-primary-container/10 flex items-center justify-center text-primary overflow-hidden border border-primary/10">
                <span className="material-symbols-outlined text-4xl group-hover:-translate-y-1 transition-transform duration-300">flight_takeoff</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-3">Air Freight</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Expedited global delivery for time-critical, high-value cargo. Guaranteed uplift and priority handling.</p>
              <Link href="/services" className="flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all">
                <span>Explore Route Network</span>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_right_alt</span>
              </Link>
            </div>

            {/* Service Card: Sea */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 mb-6 rounded-DEFAULT bg-primary-container/10 flex items-center justify-center text-primary overflow-hidden border border-primary/10">
                <span className="material-symbols-outlined text-4xl group-hover:-translate-y-1 transition-transform duration-300">directions_boat</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-3">Ocean Freight</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Cost-effective, large-scale container transport. FCL and LCL options with end-to-end milestone tracking.</p>
              <Link href="/services" className="flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all">
                <span>View Sailing Schedules</span>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_right_alt</span>
              </Link>
            </div>

            {/* Service Card: Land */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 mb-6 rounded-DEFAULT bg-primary-container/10 flex items-center justify-center text-primary overflow-hidden border border-primary/10">
                <span className="material-symbols-outlined text-4xl group-hover:-translate-y-1 transition-transform duration-300">local_shipping</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-primary mb-3">Land Transport</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Reliable domestic and cross-border trucking. Dedicated fleet with real-time GPS telemetry.</p>
              <Link href="/services" className="flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all">
                <span>Check Fleet Capacity</span>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Stats Section) */}
      <section className="py-margin-desktop bg-ocean-dark text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mb-2 block">Performance Metrics</span>
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-6">Engineered for Reliability</h2>
              <p className="font-body-lg text-body-lg text-on-primary-container mb-8">In global logistics, variance is risk. Our systems are built on precision data, automated routing, and stringent quality control protocols to ensure your supply chain remains uninterrupted.</p>
              <div className="flex gap-4">
                <button className="bg-primary-fixed text-primary-container font-label-md text-label-md px-6 py-2 rounded-DEFAULT hover:bg-white transition-colors active:scale-95 shadow-sm">Download SLA Report</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest/10 border border-surface-tint/30 p-6 rounded-lg backdrop-blur-sm flex flex-col justify-center">
                <div className="font-display-lg text-display-lg text-white mb-1">99.8%</div>
                <div className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">On-Time Delivery</div>
              </div>
              <div className="bg-surface-container-lowest/10 border border-surface-tint/30 p-6 rounded-lg backdrop-blur-sm flex flex-col justify-center">
                <div className="font-display-lg text-display-lg text-white mb-1">200+</div>
                <div className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">Countries Served</div>
              </div>
              <div className="bg-surface-container-lowest/10 border border-surface-tint/30 p-6 rounded-lg backdrop-blur-sm flex flex-col justify-center">
                <div className="font-display-lg text-display-lg text-white mb-1">15k</div>
                <div className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">Active Fleets</div>
              </div>
              <div className="bg-surface-container-lowest/10 border border-surface-tint/30 p-6 rounded-lg backdrop-blur-sm flex flex-col justify-center">
                <div className="font-display-lg text-display-lg text-white mb-1">24/7</div>
                <div className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider">Global Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Glassmorphism Cards) */}
      <section className="py-margin-desktop bg-surface-container-lowest border-t border-surface-border relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-fixed/30 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center mb-12">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-2 block">Client Success</span>
            <h2 className="font-headline-xl text-headline-xl text-primary">Trusted by Global Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Testimonial 1 */}
            <div className="bg-surface/80 backdrop-blur-md border border-surface-border rounded-xl p-8 shadow-sm flex flex-col">
              <div className="flex items-center gap-1 text-status-warning mb-4">
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mb-8 flex-grow">&quot;Global Motion transformed our Asian supply chain. Their tracking API integration gave us visibility we didn&apos;t know was possible, reducing our buffer stock requirements by 15%.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-label-md font-bold">SJ</div>
                <div>
                  <div className="font-label-md text-label-md text-primary">Sarah Jenkins</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Supply Chain Director, TechCorp</div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-surface/80 backdrop-blur-md border border-surface-border rounded-xl p-8 shadow-sm flex flex-col">
              <div className="flex items-center gap-1 text-status-warning mb-4">
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mb-8 flex-grow">&quot;When dealing with medical equipment, delays cost lives. We rely exclusively on Global Motion&apos;s priority air freight for our European distributions. Flawless execution every time.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                <div className="w-10 h-10 bg-secondary-container text-on-secondary rounded-full flex items-center justify-center font-label-md font-bold">MR</div>
                <div>
                  <div className="font-label-md text-label-md text-primary">Marcus Rheim</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Logistics VP, MedEquip Global</div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-surface/80 backdrop-blur-md border border-surface-border rounded-xl p-8 shadow-sm flex flex-col md:hidden lg:flex">
              <div className="flex items-center gap-1 text-status-warning mb-4">
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined fill text-lg">star</span>
                <span className="material-symbols-outlined text-lg">star_half</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface mb-8 flex-grow">&quot;The dashboard analytics provide incredible insight into our lane performance. We&apos;ve optimized our routing significantly just by acting on the data Global Motion provides.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-surface-border">
                <div className="w-10 h-10 bg-surface-tint text-on-primary rounded-full flex items-center justify-center font-label-md font-bold">AL</div>
                <div>
                  <div className="font-label-md text-label-md text-primary">Amanda Lin</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Operations Manager, RetailX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Welcome.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
