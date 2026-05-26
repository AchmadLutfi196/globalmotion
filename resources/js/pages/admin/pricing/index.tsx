import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';

interface PricingConfig {
    id: number;
    service_type: string;
    rate_per_kg: string | number;
    handling_fee_per_koli: string | number;
    min_weight: string | number;
}

interface Props {
    pricingConfigs: PricingConfig[];
}

const serviceConfig: Record<string, { icon: string; accentClass: string; badgeClass: string }> = {
    'Air Freight': {
        icon: 'flight_takeoff',
        accentClass: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
        badgeClass: 'bg-primary/10 text-primary border-primary/20',
    },
    'Ocean Freight': {
        icon: 'directions_boat',
        accentClass: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white',
        badgeClass: 'bg-secondary/10 text-secondary border-secondary/20',
    },
    'Land Transport': {
        icon: 'local_shipping',
        accentClass: 'bg-status-warning/10 text-status-warning group-hover:bg-status-warning group-hover:text-white',
        badgeClass: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    },
};

function PricingItem({ config }: { config: PricingConfig }) {
    const { data, setData, put, processing, errors } = useForm({
        rate_per_kg: config.rate_per_kg,
        handling_fee_per_koli: config.handling_fee_per_koli,
        min_weight: config.min_weight,
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.pricing.update(config.id).url, {
            onSuccess: () => setIsEditing(false),
        });
    };

    const cfg = serviceConfig[config.service_type] ?? {
        icon: 'settings',
        accentClass: 'bg-outline/10 text-outline group-hover:bg-outline group-hover:text-white',
        badgeClass: 'bg-surface-container text-on-surface-variant border-surface-border',
    };

    return (
        <div className="group glass-panel rounded-xl overflow-hidden diffused-shadow hover:shadow-lg transition-all flex flex-col">
            {/* Card Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
                <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${cfg.accentClass}`}>
                        <span className="material-symbols-outlined text-2xl">{cfg.icon}</span>
                    </span>
                    <div>
                        <h3 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                            {config.service_type}
                        </h3>
                        <span className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full border font-label-sm text-label-sm ${cfg.badgeClass}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            Active
                        </span>
                    </div>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all cursor-pointer"
                        title="Edit pricing"
                    >
                        <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                )}
            </div>

            {/* Card Body */}
            <div className="flex-1 p-6">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor={`rate-${config.id}`}
                                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest"
                            >
                                Rate per Kg (Rp)
                            </Label>
                            <Input
                                id={`rate-${config.id}`}
                                type="number"
                                min="0"
                                className="h-10 rounded-lg border-surface-border bg-surface focus:border-primary focus:ring-primary"
                                value={data.rate_per_kg}
                                onChange={(e) => setData('rate_per_kg', e.target.value)}
                            />
                            {errors.rate_per_kg && (
                                <p className="font-label-sm text-label-sm text-status-error">{errors.rate_per_kg}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor={`fee-${config.id}`}
                                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest"
                            >
                                Handling Fee / Koli (Rp)
                            </Label>
                            <Input
                                id={`fee-${config.id}`}
                                type="number"
                                min="0"
                                className="h-10 rounded-lg border-surface-border bg-surface focus:border-primary focus:ring-primary"
                                value={data.handling_fee_per_koli}
                                onChange={(e) => setData('handling_fee_per_koli', e.target.value)}
                            />
                            {errors.handling_fee_per_koli && (
                                <p className="font-label-sm text-label-sm text-status-error">{errors.handling_fee_per_koli}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor={`min-${config.id}`}
                                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest"
                            >
                                Min Weight (kg)
                            </Label>
                            <Input
                                id={`min-${config.id}`}
                                type="number"
                                step="0.1"
                                min="0"
                                className="h-10 rounded-lg border-surface-border bg-surface focus:border-primary focus:ring-primary"
                                value={data.min_weight}
                                onChange={(e) => setData('min_weight', e.target.value)}
                            />
                            {errors.min_weight && (
                                <p className="font-label-sm text-label-sm text-status-error">{errors.min_weight}</p>
                            )}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                type="submit"
                                size="sm"
                                className="flex-1 h-10 rounded-lg font-label-md text-label-md cursor-pointer"
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                        Saving…
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        Save Changes
                                    </span>
                                )}
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="flex-1 h-10 rounded-lg font-label-md text-label-md cursor-pointer"
                                onClick={() => setIsEditing(false)}
                            >
                                <span className="material-symbols-outlined text-sm mr-1">close</span>
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-0 divide-y divide-surface-border/60">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-2 text-on-surface-variant">
                                <span className="material-symbols-outlined text-base">scale</span>
                                <span className="font-label-md text-label-md">Rate per Kg</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface font-bold">
                                Rp {new Intl.NumberFormat('id-ID').format(Number(config.rate_per_kg))}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-2 text-on-surface-variant">
                                <span className="material-symbols-outlined text-base">inventory</span>
                                <span className="font-label-md text-label-md">Handling / Koli</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface font-bold">
                                Rp {new Intl.NumberFormat('id-ID').format(Number(config.handling_fee_per_koli))}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-2 text-on-surface-variant">
                                <span className="material-symbols-outlined text-base">weight</span>
                                <span className="font-label-md text-label-md">Min Weight</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface font-bold">
                                {config.min_weight} kg
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PricingIndex({ pricingConfigs }: Props) {
    return (
        <>
            <Head title="Pricing Settings" />
            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">

                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-display-lg text-display-lg text-primary mb-2">Pricing Config</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Manage service rates and fees for each shipment type
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container border border-surface-border">
                        <span className="material-symbols-outlined text-primary text-xl">info</span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                            {pricingConfigs.length} service{pricingConfigs.length !== 1 ? 's' : ''} configured
                        </span>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
                    {pricingConfigs.map((config) => (
                        <PricingItem key={config.id} config={config} />
                    ))}
                </div>

                {/* Info Footer */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">tips_and_updates</span>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                        Prices are calculated as: <span className="text-on-surface font-bold">(Weight × Rate/kg) + (Koli × Handling Fee)</span>.
                        Minimum weight applies when actual weight is below the threshold.
                    </p>
                </div>
            </div>
        </>
    );
}

PricingIndex.layout = {
    breadcrumbs: [{ title: 'Pricing Config', href: admin.pricing.index().url }],
};
