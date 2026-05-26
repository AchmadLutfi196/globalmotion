import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import admin from '@/routes/admin';
import { Package, MapPin, Scale, Calculator } from 'lucide-react';

interface PricingConfig {
    service_type: string;
    rate_per_kg: string | number;
    handling_fee_per_koli: string | number;
    min_weight: string | number;
}

interface Props {
    pricingConfigs: PricingConfig[];
}

export default function ShipmentCreate({ pricingConfigs }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        service_type: '',
        origin: '',
        destination: '',
        weight: 1,
        koli: 1,
    });

    const pricePreview = useMemo(() => {
        const config = pricingConfigs.find((c) => c.service_type === data.service_type);
        if (!config) return 0;

        const rate = Number(config.rate_per_kg);
        const fee = Number(config.handling_fee_per_koli);
        const minWeight = Number(config.min_weight);

        const effectiveWeight = Math.max(Number(data.weight) || 0, minWeight);
        const koliCount = Number(data.koli) || 0;

        return (effectiveWeight * rate) + (koliCount * fee);
    }, [data, pricingConfigs]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.shipments.store().url);
    };

    return (
        <>
            <Head title="Create Shipment" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 lg:mx-auto lg:w-full lg:max-w-4xl">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Create New Shipment</h1>
                    <p className="text-sm text-muted-foreground">Register a new cargo shipment in the system</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Form Card */}
                    <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden md:col-span-2">
                        <div className="px-6 py-4 border-b border-border/40 bg-gradient-to-r from-blue-50 to-white">
                            <h3 className="font-black text-foreground flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                                    <Package className="h-4 w-4" />
                                </span>
                                Shipment Details
                            </h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="service_type" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        Service Type
                                    </Label>
                                    <Select
                                        onValueChange={(value) => setData('service_type', value)}
                                        defaultValue={data.service_type}
                                    >
                                        <SelectTrigger id="service_type" className="rounded-xl h-11">
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pricingConfigs.map((config) => (
                                                <SelectItem key={config.service_type} value={config.service_type}>
                                                    {config.service_type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.service_type && <p className="text-xs font-medium text-destructive">{errors.service_type}</p>}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="origin" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <MapPin className="inline h-3 w-3 mr-1" />
                                            Origin
                                        </Label>
                                        <Input
                                            id="origin"
                                            value={data.origin}
                                            onChange={(e) => setData('origin', e.target.value)}
                                            placeholder="City, Province"
                                            className="rounded-xl h-11"
                                        />
                                        {errors.origin && <p className="text-xs font-medium text-destructive">{errors.origin}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destination" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <MapPin className="inline h-3 w-3 mr-1" />
                                            Destination
                                        </Label>
                                        <Input
                                            id="destination"
                                            value={data.destination}
                                            onChange={(e) => setData('destination', e.target.value)}
                                            placeholder="City, Province"
                                            className="rounded-xl h-11"
                                        />
                                        {errors.destination && <p className="text-xs font-medium text-destructive">{errors.destination}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="weight" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <Scale className="inline h-3 w-3 mr-1" />
                                            Weight (kg)
                                        </Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.01"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', parseFloat(e.target.value))}
                                            className="rounded-xl h-11"
                                        />
                                        {errors.weight && <p className="text-xs font-medium text-destructive">{errors.weight}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="koli" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <Package className="inline h-3 w-3 mr-1" />
                                            Koli (Quantity)
                                        </Label>
                                        <Input
                                            id="koli"
                                            type="number"
                                            value={data.koli}
                                            onChange={(e) => setData('koli', parseInt(e.target.value))}
                                            className="rounded-xl h-11"
                                        />
                                        {errors.koli && <p className="text-xs font-medium text-destructive">{errors.koli}</p>}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
                                        disabled={processing}
                                    >
                                        Create Shipment
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Price Preview Card */}
                    <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden h-fit">
                        <div className="px-6 py-4 border-b border-border/40 bg-gradient-to-r from-emerald-50 to-white">
                            <h3 className="font-black text-foreground flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm">
                                    <Calculator className="h-4 w-4" />
                                </span>
                                Price Preview
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-5 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Estimated Cost</p>
                                <p className="text-3xl font-black text-primary font-mono">
                                    Rp {new Intl.NumberFormat('id-ID').format(pricePreview)}
                                </p>
                            </div>
                            <div className="space-y-2.5">
                                {data.service_type ? (
                                    <>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Service</span>
                                            <span className="font-bold">{data.service_type}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Weight</span>
                                            <span className="font-bold">{data.weight} kg</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Koli</span>
                                            <span className="font-bold">{data.koli}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-xs text-muted-foreground text-center py-2">
                                        Select a service to see price estimate
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
