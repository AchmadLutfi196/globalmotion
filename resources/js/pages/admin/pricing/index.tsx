import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { useState } from 'react';

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

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b py-3 px-4">
                <CardTitle className="text-base font-semibold">{config.service_type}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`rate-${config.id}`}>Rate per Kg</Label>
                            <Input
                                id={`rate-${config.id}`}
                                type="number"
                                value={data.rate_per_kg}
                                onChange={(e) => setData('rate_per_kg', e.target.value)}
                            />
                            {errors.rate_per_kg && <p className="text-sm text-destructive">{errors.rate_per_kg}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`fee-${config.id}`}>Handling Fee per Koli</Label>
                            <Input
                                id={`fee-${config.id}`}
                                type="number"
                                value={data.handling_fee_per_koli}
                                onChange={(e) => setData('handling_fee_per_koli', e.target.value)}
                            />
                            {errors.handling_fee_per_koli && <p className="text-sm text-destructive">{errors.handling_fee_per_koli}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`min-${config.id}`}>Min Weight</Label>
                            <Input
                                id={`min-${config.id}`}
                                type="number"
                                step="0.1"
                                value={data.min_weight}
                                onChange={(e) => setData('min_weight', e.target.value)}
                            />
                            {errors.min_weight && <p className="text-sm text-destructive">{errors.min_weight}</p>}
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" size="sm" disabled={processing}>Save Changes</Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rate:</span>
                            <span className="font-mono font-medium">Rp {new Intl.NumberFormat('id-ID').format(Number(config.rate_per_kg))}/kg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Handling Fee:</span>
                            <span className="font-mono font-medium">Rp {new Intl.NumberFormat('id-ID').format(Number(config.handling_fee_per_koli))}/koli</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Min Weight:</span>
                            <span className="font-medium">{config.min_weight} kg</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setIsEditing(true)}>
                            Edit Configuration
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function PricingIndex({ pricingConfigs }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Pricing Settings', href: admin.pricing.index().url }]}>
            <Head title="Pricing Settings" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Pricing Configuration</h1>
                    <p className="text-muted-foreground">Manage service rates and fees for different shipment types.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {pricingConfigs.map((config) => (
                        <PricingItem key={config.id} config={config} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
