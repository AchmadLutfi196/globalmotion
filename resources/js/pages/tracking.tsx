import MainLayout from '@/layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface ShipmentEvent {
  id: number;
  shipment_id: number;
  status: string;
  location: string;
  timestamp: string;
  created_at: string;
  updated_at: string;
}

interface Shipment {
  id: number;
  tracking_number: string;
  status: string;
  estimated_delivery: string | null;
  events: ShipmentEvent[];
}

export default function TrackingPage({ shipment, error }: { shipment?: Shipment; error?: string }) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      router.visit(`/tracking/${trackingNumber.trim()}`);
    }
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <Head title="Track Shipment" />
      {/* Left Column: Tracking & Timeline */}
      <div className="lg:col-span-8 flex flex-col gap-[64px]">
        {/* Tracking Hero */}
        <section className="glass-panel rounded-xl p-gutter diffused-shadow">
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Track Your Shipment</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Enter your tracking, waybill, or reference number to get real-time updates.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-2xl">local_shipping</span>
              <input
                className="w-full h-14 pl-12 pr-4 font-label-md text-label-md border border-surface-border rounded-DEFAULT bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase"
                placeholder="e.g. GM-1234567890"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              className="h-14 px-8 bg-primary text-on-primary rounded-DEFAULT font-body-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
            >
              <span>Track</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          {error && <p className="mt-4 text-status-error font-label-md">{error}</p>}
        </section>

        {shipment ? (
          /* Shipment Timeline */
          <section className="bg-surface-container-lowest rounded-xl border border-surface-border p-gutter diffused-shadow">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-border">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">Shipment: {shipment.tracking_number}</h2>
                <span className="inline-block mt-2 px-3 py-1 bg-surface-container-low text-primary-container font-label-sm text-label-sm rounded-full uppercase tracking-wider">
                  {shipment.status}
                </span>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-outline-variant uppercase">Expected Delivery</p>
                <p className="font-headline-xl text-headline-xl text-status-warning">
                  {shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Pending'}
                </p>
              </div>
            </div>
            <div className="relative mt-8">
              {/* Progress Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-border"></div>

              <div className="flex flex-col gap-8">
                {shipment.events && shipment.events.length > 0 ? (
                  shipment.events.map((event, index) => (
                    <div key={event.id} className="flex gap-6 relative">
                      <div className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-secondary' : 'bg-surface border border-surface-border'} border-4 border-surface-container-lowest flex items-center justify-center z-10 shrink-0`}>
                        {index === 0 ? (
                          <span className="material-symbols-outlined text-[16px] text-white fill">check</span>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-surface-border"></div>
                        )}
                      </div>
                      <div className="pt-1">
                        <h3 className={`font-label-md text-label-md ${index === 0 ? 'text-primary' : 'text-on-surface-variant'}`}>{event.status}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">{event.location}</p>
                        <p className="font-label-sm text-label-sm text-outline mt-1">
                          {new Date(event.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant font-body-md py-4">No events recorded for this shipment yet.</p>
                )}
              </div>
            </div>
          </section>
        ) : !error && (
          <div className="bg-surface-container-low border border-surface-border rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-outline text-5xl mb-4">search</span>
            <p className="font-body-lg text-on-surface-variant">Enter a tracking number above to see shipment details.</p>
          </div>
        )}

        {/* Shipping Tools Bento Grid */}
        <section>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Shipping Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="#" className="group block bg-surface-container-lowest border border-surface-border rounded-xl p-6 hover:border-primary transition-colors diffused-shadow">
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">calculate</span>
              </div>
              <h3 className="font-headline-xl text-headline-xl text-primary mb-2 text-2xl">Calculate Cost</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Get a quick estimate for your next shipment based on dimensions and destination.</p>
            </Link>
            <Link href="#" className="group block bg-surface-container-lowest border border-surface-border rounded-xl p-6 hover:border-primary transition-colors diffused-shadow">
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="font-headline-xl text-headline-xl text-primary mb-2 text-2xl">Find Location</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Locate the nearest Global Motion drop-off point or service center.</p>
            </Link>
          </div>
        </section>
      </div>

      {/* Right Column: Support Sidebar */}
      <div className="lg:col-span-4">
        <aside className="sticky top-[100px] flex flex-col gap-6">
          {/* Need Help Card */}
          <div className="bg-primary text-on-primary rounded-xl p-gutter diffused-shadow overflow-hidden relative">
            <div className="absolute -right-10 -top-10 opacity-10">
              <span className="material-symbols-outlined text-[150px]">support_agent</span>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-xl text-headline-xl mb-2">Need Help?</h2>
              <p className="font-body-md text-body-md text-on-primary-container mb-8">Our logistics experts are available 24/7 to assist with your shipment inquiries.</p>
              <div className="flex flex-col gap-3">
                <button className="w-full bg-white text-primary h-12 rounded-DEFAULT font-body-md font-semibold flex items-center justify-center gap-2 hover:bg-surface transition-colors">
                  <span className="material-symbols-outlined">chat</span>
                  Live Chat
                </button>
                <button className="w-full border border-primary-fixed-dim text-white h-12 rounded-DEFAULT font-body-md font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined">call</span>
                  +1 (800) 555-0199
                </button>
              </div>
            </div>
          </div>
          {/* FAQ Quick Links */}
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-gutter">
            <h3 className="font-label-md text-label-md text-outline-variant uppercase mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="font-body-md text-body-md text-primary hover:text-secondary flex items-center gap-2"><span className="material-symbols-outlined text-sm">article</span> How to read my tracking status?</Link></li>
              <li><Link href="#" className="font-body-md text-body-md text-primary hover:text-secondary flex items-center gap-2"><span className="material-symbols-outlined text-sm">article</span> Change delivery address</Link></li>
              <li><Link href="#" className="font-body-md text-body-md text-primary hover:text-secondary flex items-center gap-2"><span className="material-symbols-outlined text-sm">article</span> Customs delays explained</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

TrackingPage.layout = (page: ReactNode) => <MainLayout children={page} />;
