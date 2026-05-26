import { Head, Link } from '@inertiajs/react';
import admin from '@/routes/admin';
import { UpdateStatusModal } from './update-status-modal';
import { useState } from 'react';

interface Shipment {
    id: string;
    tracking_number: string;
    service_type: string;
    origin: string;
    destination: string;
    weight: number;
    koli: number;
    price: number;
    status: string;
}

interface Props {
    shipments: Shipment[];
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

export default function ShipmentIndex({ shipments = [] }: Props) {
    const [search, setSearch] = useState('');

    // Ensure shipments is always an array
    const shipmentsArray = Array.isArray(shipments) ? shipments : [];

    const filtered = shipmentsArray.filter((s) =>
        s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
        s.origin.toLowerCase().includes(search.toLowerCase()) ||
        s.destination.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Head title="Shipments" />
            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display-lg text-display-lg text-primary mb-2">Shipments</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">Manage and track all shipments</p>
                    </div>
                    <Link 
                        href={admin.shipments.create().url}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-DEFAULT font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Create Shipment
                    </Link>
                </div>

                {/* Table Card */}
                <div className="flex-1 glass-panel rounded-xl overflow-hidden diffused-shadow">
                    {/* Search Bar */}
                    <div className="flex items-center gap-4 px-gutter py-4 border-b border-surface-border bg-surface-container-lowest/50">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                            <input
                                type="text"
                                placeholder="Search by tracking number, origin, destination..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-DEFAULT border border-surface-border bg-surface font-label-md text-label-md text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <div className="hidden sm:flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                            <span className="font-bold text-primary">{filtered.length}</span> shipments
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-surface-border bg-surface-container-lowest/30">
                                    <th className="h-12 px-gutter text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Tracking
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Service
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Route
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Weight
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Koli
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Price
                                    </th>
                                    <th className="h-12 px-4 text-left font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Status
                                    </th>
                                    <th className="h-12 px-gutter text-right font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-container-low">
                                                    <span className="material-symbols-outlined text-4xl text-outline">inventory_2</span>
                                                </span>
                                                <div>
                                                    <p className="font-headline-lg text-headline-lg text-primary mb-1">No shipments found</p>
                                                    <p className="font-body-md text-body-md text-on-surface-variant">
                                                        {search ? 'Try a different search term' : 'Create your first shipment to get started'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((shipment) => (
                                        <tr
                                            key={shipment.id}
                                            className="border-b border-surface-border/50 transition-colors hover:bg-surface-container-lowest/50"
                                        >
                                            <td className="px-gutter py-4">
                                                <Link
                                                    href={admin.shipments.show({ shipment: shipment.id }).url}
                                                    className="font-mono font-label-md text-label-md text-primary hover:text-secondary transition-colors"
                                                >
                                                    {shipment.tracking_number}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface">
                                                    <span className="material-symbols-outlined text-sm text-outline">local_shipping</span>
                                                    {shipment.service_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface">
                                                    <span className="font-medium">{shipment.origin}</span>
                                                    <span className="material-symbols-outlined text-sm text-outline">arrow_forward</span>
                                                    <span className="font-medium">{shipment.destination}</span>
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 font-label-md text-label-md text-on-surface">
                                                {shipment.weight} kg
                                            </td>
                                            <td className="px-4 py-4 font-label-md text-label-md text-on-surface">
                                                {shipment.koli}
                                            </td>
                                            <td className="px-4 py-4 font-mono font-label-md text-label-md text-primary">
                                                Rp {new Intl.NumberFormat('id-ID').format(shipment.price)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-block px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider rounded-full border capitalize ${statusColors[shipment.status] || 'bg-surface-container-low text-primary border-surface-border'}`}
                                                >
                                                    {shipment.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-gutter py-4 text-right">
                                                <UpdateStatusModal
                                                    shipmentId={shipment.id}
                                                    trackingNumber={shipment.tracking_number}
                                                    currentStatus={shipment.status}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

ShipmentIndex.layout = {
    breadcrumbs: [{ title: 'Shipments', href: admin.shipments.index().url }],
};
