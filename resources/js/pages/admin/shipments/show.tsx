import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function ShipmentShow({ shipment }: Props) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Shipments', href: admin.shipments.index().url },
            { title: shipment.tracking_number, href: '#' }
        ]}>
            <Head title={`Shipment ${shipment.tracking_number}`} />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Shipment Details</h1>
                    <Badge className="capitalize text-lg py-1 px-4">
                        {shipment.status.replace('_', ' ')}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Tracking Number</label>
                                <p className="text-lg font-mono font-bold">{shipment.tracking_number}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Service Type</label>
                                <p className="text-base capitalize">{shipment.service_type}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Weight</label>
                                    <p className="text-base">{shipment.weight} kg</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Koli</label>
                                    <p className="text-base">{shipment.koli}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Route</label>
                                <p className="text-base">{shipment.origin} &rarr; {shipment.destination}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Price</label>
                                <p className="text-xl font-bold text-primary">
                                    Rp {new Intl.NumberFormat('id-ID').format(shipment.total_price)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Tracking History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative border-l border-muted pl-6 space-y-8">
                                {shipment.events.map((event, index) => (
                                    <div key={event.id} className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-primary">{event.status}</h3>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(event.timestamp).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium">{event.location}</p>
                                            {event.description && (
                                                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
