import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import admin from '@/routes/admin';

interface PricingConfig {
    service_type: string;
    rate_per_kg: string | number;
    handling_fee_per_koli: string | number;
    min_weight: string | number;
}

interface Props {
    pricingConfigs: PricingConfig[];
}

const VOLUMETRIC_DIVISOR = 4000;

function SectionHeader({ icon, title }: { icon: string; title: string }) {
    return (
        <div className="flex items-center gap-3 pb-4 border-b border-surface-border mb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{title}</h3>
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="font-label-sm text-label-sm text-status-error mt-1">{message}</p>;
}

export default function ShipmentCreate({ pricingConfigs }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        // Sender
        sender_name: '',
        sender_phone: '',
        sender_address: '',
        // Receiver
        receiver_name: '',
        receiver_phone: '',
        receiver_address: '',
        // Shipment
        service_type: '',
        origin: '',
        destination: '',
        weight: '' as unknown as number,
        koli: 1,
        // Dimensions
        length: '' as unknown as number,
        width: '' as unknown as number,
        height: '' as unknown as number,
        // Payment
        payment_method: 'cash',
        // Notes
        notes: '',
    });

    const selectedConfig = useMemo(
        () => pricingConfigs.find((c) => c.service_type === data.service_type),
        [data.service_type, pricingConfigs],
    );

    const priceCalc = useMemo(() => {
        if (!selectedConfig) return null;

        const rate = Number(selectedConfig.rate_per_kg);
        const fee = Number(selectedConfig.handling_fee_per_koli);
        const minWeight = Number(selectedConfig.min_weight);
        const actualWeight = Number(data.weight) || 0;
        const koli = Number(data.koli) || 1;
        const l = Number(data.length) || 0;
        const w = Number(data.width) || 0;
        const h = Number(data.height) || 0;

        const volumetric = l && w && h ? (l * w * h) / VOLUMETRIC_DIVISOR * koli : 0;
        const chargeable = Math.max(actualWeight, volumetric, minWeight);
        const total = chargeable * rate + koli * fee;

        return { actualWeight, volumetric, chargeable, minWeight, total, rate, fee };
    }, [data, selectedConfig]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.shipments.store().url);
    };

    return (
        <>
            <Head title="Create Shipment" />
            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">

                {/* Page Header */}
                <div>
                    <h1 className="font-display-lg text-display-lg text-primary mb-2">Create Shipment</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">Register a new cargo shipment</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-gutter lg:grid-cols-3">

                        {/* Left column — main form */}
                        <div className="lg:col-span-2 space-y-gutter">

                            {/* Sender */}
                            <div className="glass-panel rounded-xl p-gutter diffused-shadow">
                                <SectionHeader icon="person" title="Sender Information" />
                                <div className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="sender_name" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Full Name
                                            </Label>
                                            <Input id="sender_name" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.sender_name} onChange={e => setData('sender_name', e.target.value)}
                                                placeholder="e.g. Budi Santoso" />
                                            <FieldError message={errors.sender_name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="sender_phone" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Phone Number
                                            </Label>
                                            <Input id="sender_phone" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.sender_phone} onChange={e => setData('sender_phone', e.target.value)}
                                                placeholder="e.g. 08123456789" />
                                            <FieldError message={errors.sender_phone} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="sender_address" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                            Address
                                        </Label>
                                        <textarea id="sender_address" rows={2}
                                            className="mt-1.5 w-full rounded-lg border border-surface-border bg-surface px-3 py-2 font-label-md text-label-md text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            value={data.sender_address} onChange={e => setData('sender_address', e.target.value)}
                                            placeholder="Full address including city and province" />
                                        <FieldError message={errors.sender_address} />
                                    </div>
                                </div>
                            </div>

                            {/* Receiver */}
                            <div className="glass-panel rounded-xl p-gutter diffused-shadow">
                                <SectionHeader icon="person_pin" title="Receiver Information" />
                                <div className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="receiver_name" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Full Name
                                            </Label>
                                            <Input id="receiver_name" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.receiver_name} onChange={e => setData('receiver_name', e.target.value)}
                                                placeholder="e.g. Siti Rahayu" />
                                            <FieldError message={errors.receiver_name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="receiver_phone" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Phone Number
                                            </Label>
                                            <Input id="receiver_phone" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.receiver_phone} onChange={e => setData('receiver_phone', e.target.value)}
                                                placeholder="e.g. 08987654321" />
                                            <FieldError message={errors.receiver_phone} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="receiver_address" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                            Address
                                        </Label>
                                        <textarea id="receiver_address" rows={2}
                                            className="mt-1.5 w-full rounded-lg border border-surface-border bg-surface px-3 py-2 font-label-md text-label-md text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            value={data.receiver_address} onChange={e => setData('receiver_address', e.target.value)}
                                            placeholder="Full address including city and province" />
                                        <FieldError message={errors.receiver_address} />
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details */}
                            <div className="glass-panel rounded-xl p-gutter diffused-shadow">
                                <SectionHeader icon="inventory_2" title="Shipment Details" />
                                <div className="space-y-4">
                                    {/* Service + Route */}
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div>
                                            <Label htmlFor="service_type" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Service Type
                                            </Label>
                                            <Select onValueChange={v => setData('service_type', v)} value={data.service_type}>
                                                <SelectTrigger id="service_type" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface">
                                                    <SelectValue placeholder="Select service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {pricingConfigs.map(c => (
                                                        <SelectItem key={c.service_type} value={c.service_type}>
                                                            {c.service_type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldError message={errors.service_type} />
                                        </div>
                                        <div>
                                            <Label htmlFor="origin" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Origin
                                            </Label>
                                            <Input id="origin" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.origin} onChange={e => setData('origin', e.target.value)}
                                                placeholder="City, Province" />
                                            <FieldError message={errors.origin} />
                                        </div>
                                        <div>
                                            <Label htmlFor="destination" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Destination
                                            </Label>
                                            <Input id="destination" className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.destination} onChange={e => setData('destination', e.target.value)}
                                                placeholder="City, Province" />
                                            <FieldError message={errors.destination} />
                                        </div>
                                    </div>

                                    {/* Weight + Koli */}
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="weight" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Actual Weight (kg)
                                            </Label>
                                            <Input id="weight" type="number" step="0.01" min="0.1"
                                                className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.weight} onChange={e => setData('weight', parseFloat(e.target.value))}
                                                placeholder="e.g. 2.5" />
                                            <FieldError message={errors.weight} />
                                        </div>
                                        <div>
                                            <Label htmlFor="koli" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                                Koli (Packages)
                                            </Label>
                                            <Input id="koli" type="number" min="1"
                                                className="mt-1.5 h-10 rounded-lg border-surface-border bg-surface"
                                                value={data.koli} onChange={e => setData('koli', parseInt(e.target.value))}
                                                placeholder="e.g. 1" />
                                            <FieldError message={errors.koli} />
                                        </div>
                                    </div>

                                    {/* Dimensions */}
                                    <div>
                                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                                            Dimensions (cm) — optional, for volumetric weight
                                        </p>
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div>
                                                <Input id="length" type="number" step="0.1" min="0"
                                                    className="h-10 rounded-lg border-surface-border bg-surface"
                                                    value={data.length} onChange={e => setData('length', parseFloat(e.target.value))}
                                                    placeholder="Length (P)" />
                                                <FieldError message={errors.length} />
                                            </div>
                                            <div>
                                                <Input id="width" type="number" step="0.1" min="0"
                                                    className="h-10 rounded-lg border-surface-border bg-surface"
                                                    value={data.width} onChange={e => setData('width', parseFloat(e.target.value))}
                                                    placeholder="Width (L)" />
                                                <FieldError message={errors.width} />
                                            </div>
                                            <div>
                                                <Input id="height" type="number" step="0.1" min="0"
                                                    className="h-10 rounded-lg border-surface-border bg-surface"
                                                    value={data.height} onChange={e => setData('height', parseFloat(e.target.value))}
                                                    placeholder="Height (T)" />
                                                <FieldError message={errors.height} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment & Notes */}
                            <div className="glass-panel rounded-xl p-gutter diffused-shadow">
                                <SectionHeader icon="payments" title="Payment & Notes" />
                                <div className="space-y-4">
                                    <div>
                                        <Label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                            Payment Method
                                        </Label>
                                        <div className="mt-2 flex gap-3">
                                            {[
                                                { value: 'cash', label: 'Cash', icon: 'payments', desc: 'Paid on pickup' },
                                                { value: 'invoice', label: 'Invoice', icon: 'receipt_long', desc: 'Billed later' },
                                            ].map(opt => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => setData('payment_method', opt.value)}
                                                    className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer text-left ${
                                                        data.payment_method === opt.value
                                                            ? 'border-primary bg-primary/5 text-primary'
                                                            : 'border-surface-border text-on-surface-variant hover:border-primary/40'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                                                    <div>
                                                        <p className="font-label-md text-label-md font-bold">{opt.label}</p>
                                                        <p className="font-label-sm text-label-sm opacity-70">{opt.desc}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <FieldError message={errors.payment_method} />
                                    </div>
                                    <div>
                                        <Label htmlFor="notes" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                            Notes (optional)
                                        </Label>
                                        <textarea id="notes" rows={2}
                                            className="mt-1.5 w-full rounded-lg border border-surface-border bg-surface px-3 py-2 font-label-md text-label-md text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            value={data.notes} onChange={e => setData('notes', e.target.value)}
                                            placeholder="Special handling instructions, fragile items, etc." />
                                        <FieldError message={errors.notes} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column — price summary + submit */}
                        <div className="space-y-gutter">
                            {/* Price Calculator */}
                            <div className="glass-panel rounded-xl overflow-hidden diffused-shadow sticky top-20">
                                <div className="px-6 py-4 border-b border-surface-border bg-primary/5">
                                    <h3 className="font-headline-lg text-headline-lg text-primary flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl">calculate</span>
                                        Price Summary
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {priceCalc ? (
                                        <>
                                            {/* Total */}
                                            <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
                                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                                                    Estimated Total
                                                </p>
                                                <p className="font-display-lg text-display-lg text-primary">
                                                    Rp {new Intl.NumberFormat('id-ID').format(priceCalc.total)}
                                                </p>
                                            </div>

                                            {/* Weight breakdown */}
                                            <div className="space-y-0 divide-y divide-surface-border/60">
                                                <div className="flex justify-between py-2.5">
                                                    <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-base">scale</span>
                                                        Actual Weight
                                                    </span>
                                                    <span className="font-label-md text-label-md text-on-surface font-bold">{priceCalc.actualWeight} kg</span>
                                                </div>
                                                {priceCalc.volumetric > 0 && (
                                                    <div className="flex justify-between py-2.5">
                                                        <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
                                                            <span className="material-symbols-outlined text-base">view_in_ar</span>
                                                            Volumetric
                                                        </span>
                                                        <span className="font-label-md text-label-md text-on-surface font-bold">{priceCalc.volumetric.toFixed(2)} kg</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between py-2.5">
                                                    <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-base">weight</span>
                                                        Min Weight
                                                    </span>
                                                    <span className="font-label-md text-label-md text-on-surface font-bold">{priceCalc.minWeight} kg</span>
                                                </div>
                                                <div className="flex justify-between py-2.5">
                                                    <span className="font-label-md text-label-md text-primary flex items-center gap-1.5 font-bold">
                                                        <span className="material-symbols-outlined text-base">check_circle</span>
                                                        Chargeable
                                                    </span>
                                                    <span className="font-label-md text-label-md text-primary font-bold">{priceCalc.chargeable.toFixed(2)} kg</span>
                                                </div>
                                            </div>

                                            {/* Rate breakdown */}
                                            <div className="rounded-lg bg-surface-container p-3 space-y-1.5">
                                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Rate Breakdown</p>
                                                <p className="font-label-md text-label-md text-on-surface">
                                                    {priceCalc.chargeable.toFixed(2)} kg × Rp {new Intl.NumberFormat('id-ID').format(priceCalc.rate)}
                                                </p>
                                                <p className="font-label-md text-label-md text-on-surface">
                                                    + {data.koli} koli × Rp {new Intl.NumberFormat('id-ID').format(priceCalc.fee)}
                                                </p>
                                            </div>

                                            {/* Payment badge */}
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                                                data.payment_method === 'cash'
                                                    ? 'bg-status-success/10 border-status-success/20 text-status-success'
                                                    : 'bg-status-warning/10 border-status-warning/20 text-status-warning'
                                            }`}>
                                                <span className="material-symbols-outlined text-base">
                                                    {data.payment_method === 'cash' ? 'payments' : 'receipt_long'}
                                                </span>
                                                <span className="font-label-md text-label-md font-bold capitalize">
                                                    {data.payment_method === 'cash' ? 'Cash — Lunas' : 'Invoice — Tagihan'}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-center">
                                            <span className="material-symbols-outlined text-4xl text-outline mb-3">calculate</span>
                                            <p className="font-label-md text-label-md text-on-surface-variant">
                                                Select a service type to see price estimate
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="px-6 pb-6">
                                    <Button
                                        type="submit"
                                        className="w-full h-11 rounded-lg font-label-md text-label-md cursor-pointer"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                                Creating…
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">add_circle</span>
                                                Create Shipment
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

ShipmentCreate.layout = {
    breadcrumbs: [
        { title: 'Shipments', href: admin.shipments.index().url },
        { title: 'Create', href: admin.shipments.create().url },
    ],
};
