import MainLayout from '@/layouts/MainLayout';
import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';

export default function ServicesPage() {
  return (
    <>
      <Head title="Our Services" />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
        {/* Hero Section for Services */}
        <section className="mb-margin-desktop text-center max-w-3xl mx-auto">
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Comprehensive Logistics Solutions</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">We engineer precise, high-speed delivery systems for critical cargo. Explore our core freight operations designed for modern supply chains.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Services Descriptions (Main Column) */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            {/* Air Freight */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-gutter relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-primary-fixed p-3 rounded text-primary">
                  <span className="material-symbols-outlined">flight_takeoff</span>
                </div>
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-2">Air Freight Priority</h2>
                  <p className="font-body-md text-body-md text-on-surface mb-4">When speed is non-negotiable, our Air Freight operations deliver. Utilizing a global network of premier carriers, we ensure expedited transit times for high-value and time-critical shipments. Our integrated tracking systems provide real-time visibility from tarmac to destination.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-body-md text-body-md text-on-surface-variant">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Next Flight Out (NFO)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Charter Services</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Cold Chain Compliance</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Door-to-Door Delivery</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Ocean Freight */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-gutter relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-primary-fixed p-3 rounded text-primary">
                  <span className="material-symbols-outlined">directions_boat</span>
                </div>
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-2">Ocean Freight Solutions</h2>
                  <p className="font-body-md text-body-md text-on-surface mb-4">Optimized for volume and cost-efficiency without compromising reliability. Our Ocean Freight services manage complex international routing, customs brokerage, and container optimization, ensuring your heavy cargo arrives predictably.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-body-md text-body-md text-on-surface-variant">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Full Container Load (FCL)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Less than Container Load (LCL)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Roll-on/Roll-off (RoRo)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Port-to-Port Handling</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Road Transport */}
            <div className="bg-surface-container-lowest border border-surface-border rounded-lg p-gutter relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-primary-fixed p-3 rounded text-primary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-2">Overland Road Transport</h2>
                  <p className="font-body-md text-body-md text-on-surface mb-4">The backbone of regional logistics. Our dedicated fleet and partner networks provide secure, trackable overland transport. From line-haul to last-mile delivery, we maintain strict scheduling protocols.</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-body-md text-body-md text-on-surface-variant">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Full Truckload (FTL)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Less than Truckload (LTL)</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Express Courier</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm fill">check_circle</span> Specialized Flatbeds</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Request Quote) */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container border border-surface-border rounded-lg p-gutter sticky top-24">
              <h3 className="font-headline-lg text-headline-lg text-primary mb-1">Request a Quote</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Receive a precise calculation within 2 hours.</p>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface uppercase block mb-1">Origin Port/City</label>
                  <input className="w-full h-12 border border-surface-border rounded px-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Shanghai, CN" type="text" />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface uppercase block mb-1">Destination Port/City</label>
                  <input className="w-full h-12 border border-surface-border rounded px-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Rotterdam, NL" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface uppercase block mb-1">Weight (kg)</label>
                    <input className="w-full h-12 border border-surface-border rounded px-3 font-label-md text-label-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="00.00" type="number" />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface uppercase block mb-1">Service Type</label>
                    <select className="w-full h-12 border border-surface-border rounded px-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Road Transport</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-primary text-on-primary font-body-md text-body-md h-12 rounded mt-2 hover:bg-primary-container active:scale-95 transition-all" type="button">Calculate Estimate</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

ServicesPage.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
