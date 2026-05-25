import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import admin from '@/routes/admin';
import { UpdateStatusModal } from './update-status-modal';

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

export default function ShipmentIndex({ shipments }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Shipments', href: admin.shipments.index().url }]}>
            <Head title="Shipments" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Shipments</h1>
                    <Button asChild>
                        <Link href={admin.shipments.create().url}>Create Shipment</Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 transition-colors">
                                <th className="h-12 px-4 text-left font-medium">Tracking Number</th>
                                <th className="h-12 px-4 text-left font-medium">Service</th>
                                <th className="h-12 px-4 text-left font-medium">Route</th>
                                <th className="h-12 px-4 text-left font-medium">Weight (kg)</th>
                                <th className="h-12 px-4 text-left font-medium">Koli</th>
                                <th className="h-12 px-4 text-left font-medium">Price</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.length === 0 ? (
                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <td colSpan={8} className="h-24 text-center align-middle text-muted-foreground">
                                        No shipments found.
                                    </td>
                                </tr>
                            ) : (
                                shipments.map((shipment) => (
                                    <tr key={shipment.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 font-medium">{shipment.tracking_number}</td>
                                        <td className="p-4">{shipment.service_type}</td>
                                        <td className="p-4">
                                            {shipment.origin} &rarr; {shipment.destination}
                                        </td>
                                        <td className="p-4">{shipment.weight}</td>
                                        <td className="p-4">{shipment.koli}</td>
                                        <td className="p-4 font-mono">
                                            Rp {new Intl.NumberFormat('id-ID').format(shipment.price)}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="secondary" className="capitalize">
                                                {shipment.status.replace('_', ' ')}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
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
        </AppLayout>
    );
}
