import { Head } from '@inertiajs/react';
import admin from '@/routes/admin';

interface Event {
    id: number;
    location: string;
    status: string;
    description: string;
    timestamp: string;
}

interface Shipment {
    id: string;
    tracking_number: string;
    service_type: string;
    origin: string;
    destination: string;
    weight: number;
    koli: number;
    total_price: number;
    status: string;
    events: Event[];
}

interface Props {
    shipment: Shipment;
}

const statusColors: Record<string, string> = {
    pending: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    picked_up: 'bg-primary/10 text-primary border-primary/20',
    in_transit: 'bg-secondary/10 text-secondary border-secondary/20',
    arrived_at_hub: 'bg-primary-container/30 text-primary border-primary/20',
    out_for_delivery: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    delivered: 'bg-status-success/10 text-status-success border-status-success/20',
    cancelled: 'bg-status-error/10 text-status-error border-status-error/20',
};

export default function ShipmentShow({ shipment }: Props) {
    return (
        <>
            <Head title={`Shipment ${shipment.tracking_number}`} />

            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="font-display-lg text-display-lg text-primary mb-2">Shipment Details</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">Tracking information and history</p>
                    </div>
                    <span
                        className={`inline-block px-4 py-2 font-label-md text-label-md uppercase tracking-wider rounded-full border capitalize ${statusColors[shipment.status] || 'bg-surface-container-low text-primary border-surface-border'}`}
                    >
                        {shipment.status.replace('_', ' ')}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
                    {/* Info Card */}
                    <div className="glass-panel rounded-xl overflow-hidden diffused-shadow md:col-span-1">
                        <div className="px-gutter py-4 border-b border-surface-border bg-gradient-to-r from-primary/5 to-transparent">
                            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-DEFAULT bg-primary text-on-primary shadow-sm">
                                    <span className="material-symbols-outlined text-xl">label</span>
                                </span>
                                Information
                            </h3>
                        </div>
                        <div className="p-gutter space-y-6">
                            <div>
                                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Tracking Number</label>
                                <p className="font-mono font-headline-xl text-headline-xl text-primary">{shipment.tracking_number}</p>
                            </div>
                            <div>
                                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Service Type</label>
                                <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface capitalize">
                                    <span className="material-symbols-outlined text-outline">local_shipping</span>
                                    {shipment.service_type}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Weight</label>
                                    <p className="font-body-md text-body-md text-on-surface font-bold">{shipment.weight} kg</p>
                                </div>
                                <div>
                                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Koli</label>
                                    <p className="font-body-md text-body-md text-on-surface font-bold">{shipment.koli}</p>
                                </div>
                            </div>
                            <div>
                                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Route</label>
                                <div className="flex items-start gap-2 font-body-md text-body-md text-on-surface">
                                    <span className="material-symbols-outlined text-outline mt-0.5">route</span>
                                    <span>
                                        {shipment.origin} <span className="mx-2 text-outline">→</span> {shipment.destination}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
                                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Total Price</label>
                                <p className="font-mono font-display-lg text-display-lg text-primary">
                                    Rp {new Intl.NumberFormat('id-ID').format(shipment.total_price)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="glass-panel rounded-xl overflow-hidden diffused-shadow md:col-span-2">
                        <div className="px-gutter py-4 border-b border-surface-border bg-gradient-to-r from-secondary/5 to-transparent">
                            <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-DEFAULT bg-secondary text-on-secondary shadow-sm">
                                    <span className="material-symbols-outlined text-xl">schedule</span>
                                </span>
                                Tracking History
                            </h3>
                        </div>
                        <div className="p-gutter">
                            {shipment.events.length > 0 ? (
                                <div className="relative space-y-8 pl-10">
                                    <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-surface-border" />
                                    {shipment.events.map((event, index) => (
                                        <div key={event.id} className="relative">
                                            <div className={`absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full ${
                                                index === 0
                                                    ? 'bg-secondary text-on-secondary shadow-lg'
                                                    : 'bg-surface-container-low border-2 border-surface-border'
                                            }`}>
                                                {index === 0 ? (
                                                    <span className="material-symbols-outlined text-sm fill">check_circle</span>
                                                ) : (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-outline" />
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                                    <h4 className={`font-headline-lg text-headline-lg ${index === 0 ? 'text-primary' : 'text-on-surface'}`}>
                                                        {event.status}
                                                    </h4>
                                                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                                                        {new Date(event.timestamp).toLocaleString('id-ID', {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short',
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    {event.location}
                                                </div>
                                                {event.description && (
                                                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">{event.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-container-low mb-4">
                                        <span className="material-symbols-outlined text-4xl text-outline">schedule</span>
                                    </span>
                                    <p className="font-headline-lg text-headline-lg text-primary mb-2">No tracking events</p>
                                    <p className="font-body-md text-body-md text-on-surface-variant">No events recorded for this shipment yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ShipmentShow.layout = {
    breadcrumbs: [
        { title: 'Shipments', href: admin.shipments.index().url },
        { title: 'Detail', href: '#' },
    ],
};
