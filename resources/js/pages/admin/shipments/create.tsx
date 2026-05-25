import { Head, useForm } from '@inertiajs/react';
import { useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <AppLayout
            breadcrumbs={[
                { title: 'Shipments', href: admin.shipments.index().url },
                { title: 'Create', href: admin.shipments.create().url },
            ]}
        >
            <Head title="Create Shipment" />
            <div className="flex flex-1 flex-col gap-4 p-4 lg:max-w-4xl lg:mx-auto">
                <h1 className="text-2xl font-bold tracking-tight">Create New Shipment</h1>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Shipment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="service_type">Service Type</Label>
                                    <Select
                                        onValueChange={(value) => setData('service_type', value)}
                                        defaultValue={data.service_type}
                                    >
                                        <SelectTrigger id="service_type">
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
                                    {errors.service_type && <p className="text-sm text-destructive">{errors.service_type}</p>}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="origin">Origin</Label>
                                        <Input
                                            id="origin"
                                            value={data.origin}
                                            onChange={(e) => setData('origin', e.target.value)}
                                            placeholder="City, Province"
                                        />
                                        {errors.origin && <p className="text-sm text-destructive">{errors.origin}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destination">Destination</Label>
                                        <Input
                                            id="destination"
                                            value={data.destination}
                                            onChange={(e) => setData('destination', e.target.value)}
                                            placeholder="City, Province"
                                        />
                                        {errors.destination && <p className="text-sm text-destructive">{errors.destination}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.01"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', parseFloat(e.target.value))}
                                        />
                                        {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="koli">Koli (Quantity)</Label>
                                        <Input
                                            id="koli"
                                            type="number"
                                            value={data.koli}
                                            onChange={(e) => setData('koli', parseInt(e.target.value))}
                                        />
                                        {errors.koli && <p className="text-sm text-destructive">{errors.koli}</p>}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        Create Shipment
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Price Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-3xl font-bold font-mono">
                                Rp {new Intl.NumberFormat('id-ID').format(pricePreview)}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                {data.service_type ? (
                                    <>
                                        <p>Service: {data.service_type}</p>
                                        <p>Weight: {data.weight} kg</p>
                                        <p>Koli: {data.koli}</p>
                                    </>
                                ) : (
                                    <p>Select a service to see price estimate.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
