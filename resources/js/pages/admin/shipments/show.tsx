import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
import admin from '@/routes/admin';
import { UpdateStatusModal } from './update-status-modal';

interface Event {
    id: number;
    location: string;
    status: string;
    description: string | null;
    photo: string | null;
    timestamp: string;
}

interface Shipment {
    id: string;
    tracking_number: string;
    sender_name: string;
    sender_phone: string;
    sender_address: string;
    receiver_name: string;
    receiver_phone: string;
    receiver_address: string;
    service_type: string;
    origin: string;
    destination: string;
    weight: number;
    koli: number;
    length: number | null;
    width: number | null;
    height: number | null;
    volumetric_weight: number | null;
    chargeable_weight: number | null;
    total_price: number;
    payment_method: string;
    payment_status: string;
    billing_notes: string | null;
    status: string;
    notes: string | null;
    pod_photo: string | null;
    pod_receiver_name: string | null;
    estimated_delivery: string | null;
    created_at: string;
    events: Event[];
}

interface Props {
    shipment: Shipment;
}

const statusColors: Record<string, string> = {
    pending:          'bg-status-warning/10 text-status-warning border-status-warning/20',
    picked_up:        'bg-primary/10 text-primary border-primary/20',
    in_transit:       'bg-secondary/10 text-secondary border-secondary/20',
    arrived_at_hub:   'bg-primary/10 text-primary border-primary/20',
    out_for_delivery: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    delivered:        'bg-status-success/10 text-status-success border-status-success/20',
    cancelled:        'bg-status-error/10 text-status-error border-status-error/20',
};

const statusIcons: Record<string, string> = {
    pending:          'schedule',
    picked_up:        'local_shipping',
    in_transit:       'flight_takeoff',
    arrived_at_hub:   'warehouse',
    out_for_delivery: 'delivery_dining',
    delivered:        'check_circle',
    cancelled:        'cancel',
};

const paymentStatusColors: Record<string, string> = {
    paid:   'bg-status-success/10 text-status-success border-status-success/20',
    unpaid: 'bg-status-warning/10 text-status-warning border-status-warning/20',
};

function InfoRow({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-surface-border/60 last:border-0">
            <span className="material-symbols-outlined text-base text-on-surface-variant mt-0.5 shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-0.5">{label}</p>
                <div className="font-label-md text-label-md text-on-surface">{value}</div>
            </div>
        </div>
    );
}

export default function ShipmentShow({ shipment }: Props) {
    const awbRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const content = awbRef.current?.innerHTML;
        if (!content) return;
        const win = window.open('', '_blank', 'width=800,height=600');
        if (!win) return;
        win.document.write(`
            <html><head><title>AWB - ${shipment.tracking_number}</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: Arial, sans-serif; font-size: 12px; padding: 16px; }
                .awb { border: 2px solid #000; padding: 16px; max-width: 400px; }
                .awb-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
                .awb-header h1 { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
                .awb-header p { font-size: 10px; color: #666; }
                .tracking { text-align: center; font-size: 22px; font-weight: 900; font-family: monospace; letter-spacing: 3px; padding: 12px 0; border-bottom: 1px dashed #000; margin-bottom: 12px; }
                .section { margin-bottom: 10px; }
                .section-title { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 4px; }
                .section-value { font-size: 13px; font-weight: 700; }
                .section-sub { font-size: 11px; color: #333; }
                .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
                .divider { border-top: 1px solid #ccc; margin: 8px 0; }
                .total { text-align: right; font-size: 16px; font-weight: 900; }
                @media print { body { padding: 0; } }
            </style></head><body>${content}</body></html>
        `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };

    const sortedEvents = [...(shipment.events ?? [])].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <>
            <Head title={`Shipment ${shipment.tracking_number}`} />

            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display-lg text-display-lg text-primary mb-1">Shipment Detail</h1>
                        <p className="font-label-md text-label-md text-on-surface-variant">{shipment.tracking_number}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-label-md text-label-md capitalize ${statusColors[shipment.status] ?? ''}`}>
                            <span className="material-symbols-outlined text-base">{statusIcons[shipment.status] ?? 'help'}</span>
                            {shipment.status.replace(/_/g, ' ')}
                        </span>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all font-label-md text-label-md cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">print</span>
                            Print AWB
                        </button>
                        <UpdateStatusModal
                            shipmentId={shipment.id}
                            trackingNumber={shipment.tracking_number}
                            currentStatus={shipment.status}
                        />
                    </div>
                </div>

                <div className="grid gap-gutter lg:grid-cols-3">

                    {/* Left: Sender + Receiver + Shipment Info */}
                    <div className="lg:col-span-1 space-y-gutter">

                        {/* Sender */}
                        <div className="glass-panel rounded-xl p-6 diffused-shadow">
                            <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                </span>
                                Sender
                            </h3>
                            <InfoRow icon="badge" label="Name" value={shipment.sender_name} />
                            <InfoRow icon="call" label="Phone" value={shipment.sender_phone} />
                            <InfoRow icon="location_on" label="Address" value={<span className="whitespace-pre-wrap">{shipment.sender_address}</span>} />
                        </div>

                        {/* Receiver */}
                        <div className="glass-panel rounded-xl p-6 diffused-shadow">
                            <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                                    <span className="material-symbols-outlined text-lg">person_pin</span>
                                </span>
                                Receiver
                            </h3>
                            <InfoRow icon="badge" label="Name" value={shipment.receiver_name} />
                            <InfoRow icon="call" label="Phone" value={shipment.receiver_phone} />
                            <InfoRow icon="location_on" label="Address" value={<span className="whitespace-pre-wrap">{shipment.receiver_address}</span>} />
                            {shipment.pod_receiver_name && (
                                <InfoRow icon="how_to_reg" label="Received by" value={
                                    <span className="text-status-success font-bold">{shipment.pod_receiver_name}</span>
                                } />
                            )}
                        </div>

                        {/* Shipment Info */}
                        <div className="glass-panel rounded-xl p-6 diffused-shadow">
                            <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-status-warning/10 text-status-warning">
                                    <span className="material-symbols-outlined text-lg">inventory_2</span>
                                </span>
                                Shipment Info
                            </h3>
                            <InfoRow icon="local_shipping" label="Service" value={shipment.service_type} />
                            <InfoRow icon="route" label="Route" value={`${shipment.origin} → ${shipment.destination}`} />
                            <InfoRow icon="scale" label="Actual Weight" value={`${shipment.weight} kg`} />
                            {shipment.volumetric_weight && Number(shipment.volumetric_weight) > 0 && (
                                <InfoRow icon="view_in_ar" label="Volumetric Weight" value={`${Number(shipment.volumetric_weight).toFixed(2)} kg`} />
                            )}
                            {shipment.chargeable_weight && (
                                <InfoRow icon="check_circle" label="Chargeable Weight" value={
                                    <span className="text-primary font-bold">{Number(shipment.chargeable_weight).toFixed(2)} kg</span>
                                } />
                            )}
                            <InfoRow icon="inventory" label="Koli" value={`${shipment.koli} pcs`} />
                            {shipment.length && shipment.width && shipment.height && (
                                <InfoRow icon="straighten" label="Dimensions" value={`${shipment.length} × ${shipment.width} × ${shipment.height} cm`} />
                            )}
                            {shipment.notes && (
                                <InfoRow icon="notes" label="Notes" value={shipment.notes} />
                            )}
                        </div>

                        {/* Payment */}
                        <div className="glass-panel rounded-xl p-6 diffused-shadow">
                            <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2 mb-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-status-success/10 text-status-success">
                                    <span className="material-symbols-outlined text-lg">payments</span>
                                </span>
                                Payment
                            </h3>
                            <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center mb-4">
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Ongkir</p>
                                <p className="font-display-lg text-display-lg text-primary">
                                    Rp {new Intl.NumberFormat('id-ID').format(shipment.total_price)}
                                </p>
                            </div>
                            <InfoRow icon="credit_card" label="Method" value={
                                <span className="capitalize">{shipment.payment_method}</span>
                            } />
                            <InfoRow icon="receipt" label="Status" value={
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-label-sm text-label-sm capitalize ${paymentStatusColors[shipment.payment_status] ?? ''}`}>
                                    {shipment.payment_status}
                                </span>
                            } />
                            {shipment.billing_notes && (
                                <InfoRow icon="notes" label="Billing Notes" value={shipment.billing_notes} />
                            )}
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className="lg:col-span-2">
                        <div className="glass-panel rounded-xl overflow-hidden diffused-shadow">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
                                <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xl">timeline</span>
                                    Tracking History
                                </h3>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                    {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="p-6">
                                {sortedEvents.length > 0 ? (
                                    <div className="relative space-y-6 pl-10">
                                        <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-surface-border" />
                                        {sortedEvents.map((event, index) => (
                                            <div key={event.id} className="relative">
                                                {/* Timeline dot */}
                                                <div className={`absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                                    index === 0
                                                        ? 'bg-primary border-primary text-white shadow-lg'
                                                        : 'bg-surface-container-lowest border-surface-border'
                                                }`}>
                                                    {index === 0 ? (
                                                        <span className="material-symbols-outlined text-sm fill">
                                                            {statusIcons[event.status] ?? 'radio_button_checked'}
                                                        </span>
                                                    ) : (
                                                        <div className="h-2.5 w-2.5 rounded-full bg-outline" />
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-label-sm text-label-sm capitalize w-fit ${statusColors[event.status] ?? 'bg-surface-container text-on-surface border-surface-border'}`}>
                                                            <span className="material-symbols-outlined text-xs">{statusIcons[event.status] ?? 'circle'}</span>
                                                            {event.status.replace(/_/g, ' ')}
                                                        </span>
                                                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                                                            {new Date(event.timestamp).toLocaleString('id-ID', {
                                                                dateStyle: 'medium',
                                                                timeStyle: 'short',
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                                                        <span className="material-symbols-outlined text-base">location_on</span>
                                                        {event.location}
                                                    </div>
                                                    {event.description && (
                                                        <p className="font-body-md text-body-md text-on-surface">{event.description}</p>
                                                    )}
                                                    {/* Event photo */}
                                                    {event.photo && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={`/storage/${event.photo}`}
                                                                alt="Tracking photo"
                                                                className="h-32 w-auto rounded-lg border border-surface-border object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                                                onClick={() => window.open(`/storage/${event.photo}`, '_blank')}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <span className="material-symbols-outlined text-5xl text-outline mb-4">timeline</span>
                                        <p className="font-headline-lg text-headline-lg text-primary mb-2">No events yet</p>
                                        <p className="font-body-md text-body-md text-on-surface-variant">Tracking events will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden AWB template for printing */}
            <div className="hidden">
                <div ref={awbRef}>
                    <div className="awb">
                        <div className="awb-header">
                            <h1>GLOBAL MOTION</h1>
                            <p>Air · Sea · Land Freight</p>
                        </div>
                        <div className="tracking">{shipment.tracking_number}</div>
                        <div className="grid2">
                            <div className="section">
                                <div className="section-title">Pengirim</div>
                                <div className="section-value">{shipment.sender_name}</div>
                                <div className="section-sub">{shipment.sender_phone}</div>
                                <div className="section-sub">{shipment.sender_address}</div>
                            </div>
                            <div className="section">
                                <div className="section-title">Penerima</div>
                                <div className="section-value">{shipment.receiver_name}</div>
                                <div className="section-sub">{shipment.receiver_phone}</div>
                                <div className="section-sub">{shipment.receiver_address}</div>
                            </div>
                        </div>
                        <div className="divider" />
                        <div className="grid2">
                            <div className="section">
                                <div className="section-title">Asal</div>
                                <div className="section-value">{shipment.origin}</div>
                            </div>
                            <div className="section">
                                <div className="section-title">Tujuan</div>
                                <div className="section-value">{shipment.destination}</div>
                            </div>
                        </div>
                        <div className="divider" />
                        <div className="grid2">
                            <div className="section">
                                <div className="section-title">Layanan</div>
                                <div className="section-value">{shipment.service_type}</div>
                            </div>
                            <div className="section">
                                <div className="section-title">Pembayaran</div>
                                <div className="section-value" style={{ textTransform: 'capitalize' }}>{shipment.payment_method}</div>
                            </div>
                        </div>
                        <div className="grid2">
                            <div className="section">
                                <div className="section-title">Berat</div>
                                <div className="section-value">{shipment.chargeable_weight ?? shipment.weight} kg</div>
                            </div>
                            <div className="section">
                                <div className="section-title">Koli</div>
                                <div className="section-value">{shipment.koli} pcs</div>
                            </div>
                        </div>
                        <div className="divider" />
                        <div className="section">
                            <div className="section-title">Total Ongkir</div>
                            <div className="total">Rp {new Intl.NumberFormat('id-ID').format(shipment.total_price)}</div>
                        </div>
                        <div className="divider" />
                        <div className="section" style={{ fontSize: '9px', color: '#999', textAlign: 'center' }}>
                            Dicetak: {new Date().toLocaleString('id-ID')}
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
