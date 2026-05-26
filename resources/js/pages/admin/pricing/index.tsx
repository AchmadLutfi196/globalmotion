import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import { useState } from 'react';
import { Settings, Pencil, X } from 'lucide-react';

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

const serviceColors: Record<string, { gradient: string; icon: string }> = {
    'Air Freight': { gradient: 'from-blue-50 to-white', icon: 'bg-blue-600 shadow-blue-200' },
    'Ocean Freight': { gradient: 'from-cyan-50 to-white', icon: 'bg-cyan-600 shadow-cyan-200' },
    'Land Transport': { gradient: 'from-amber-50 to-white', icon: 'bg-amber-500 shadow-amber-200' },
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

    const colors = serviceColors[config.service_type] || { gradient: 'from-slate-50 to-white', icon: 'bg-slate-500 shadow-slate-200' };

    return (
        <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className={`px-6 py-4 border-b border-border/40 bg-gradient-to-r ${colors.gradient}`}>
                <div className="flex items-center justify-between">
                    <h3 className="font-black text-foreground flex items-center gap-2">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-lg ${colors.icon}`}>
                            <Settings className="h-4 w-4" />
                        </span>
                        {config.service_type}
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                        >
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>
            <div className="p-6">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`rate-${config.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Rate per Kg
                            </Label>
                            <Input
                                id={`rate-${config.id}`}
                                type="number"
                                className="rounded-xl h-10"
                                value={data.rate_per_kg}
                                onChange={(e) => setData('rate_per_kg', e.target.value)}
                            />
                            {errors.rate_per_kg && <p className="text-[10px] font-medium text-destructive">{errors.rate_per_kg}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`fee-${config.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Handling Fee per Koli
                            </Label>
                            <Input
                                id={`fee-${config.id}`}
                                type="number"
                                className="rounded-xl h-10"
                                value={data.handling_fee_per_koli}
                                onChange={(e) => setData('handling_fee_per_koli', e.target.value)}
                            />
                            {errors.handling_fee_per_koli && <p className="text-[10px] font-medium text-destructive">{errors.handling_fee_per_koli}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`min-${config.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Min Weight (kg)
                            </Label>
                            <Input
                                id={`min-${config.id}`}
                                type="number"
                                step="0.1"
                                className="rounded-xl h-10"
                                value={data.min_weight}
                                onChange={(e) => setData('min_weight', e.target.value)}
                            />
                            {errors.min_weight && <p className="text-[10px] font-medium text-destructive">{errors.min_weight}</p>}
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button
                                type="submit"
                                size="sm"
                                className="flex-1 rounded-xl h-10 font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
                                disabled={processing}
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="flex-1 rounded-xl h-10 font-bold"
                                onClick={() => setIsEditing(false)}
                            >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                            <span className="text-xs text-muted-foreground">Rate per Kg</span>
                            <span className="font-mono font-bold text-sm">Rp {new Intl.NumberFormat('id-ID').format(Number(config.rate_per_kg))}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                            <span className="text-xs text-muted-foreground">Handling Fee / Koli</span>
                            <span className="font-mono font-bold text-sm">Rp {new Intl.NumberFormat('id-ID').format(Number(config.handling_fee_per_koli))}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-muted-foreground">Min Weight</span>
                            <span className="font-bold text-sm">{config.min_weight} kg</span>
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
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Pricing Configuration</h1>
                    <p className="text-sm text-muted-foreground">Manage service rates and fees for different shipment types</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pricingConfigs.map((config) => (
                        <PricingItem key={config.id} config={config} />
                    ))}
                </div>
            </div>
        </>
    );
}

PricingIndex.layout = {
    breadcrumbs: [{ title: 'Pricing Settings', href: admin.pricing.index().url }],
};
