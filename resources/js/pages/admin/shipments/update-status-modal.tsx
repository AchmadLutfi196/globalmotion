import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import admin from '@/routes/admin';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UpdateStatusModalProps {
    shipmentId: string;
    trackingNumber: string;
    currentStatus: string;
}

export function UpdateStatusModal({ shipmentId, trackingNumber, currentStatus }: UpdateStatusModalProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        status: currentStatus,
        location: '',
        description: '',
        timestamp: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDThh:mm
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.shipments.updateStatus({ shipment: shipmentId }).url, {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast.success('Shipment status updated successfully');
            },
        });
    };

    const statuses = [
        { value: 'pending', label: 'Pending' },
        { value: 'picked_up', label: 'Picked Up' },
        { value: 'in_transit', label: 'In Transit' },
        { value: 'arrived_at_hub', label: 'Arrived at Hub' },
        { value: 'out_for_delivery', label: 'Out for Delivery' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Update Status
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogDescription>
                            Update the status for shipment <strong>{trackingNumber}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                placeholder="Current location (e.g. Jakarta Hub)"
                            />
                            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="timestamp">Time</Label>
                            <Input
                                id="timestamp"
                                type="datetime-local"
                                value={data.timestamp}
                                onChange={(e) => setData('timestamp', e.target.value)}
                            />
                            {errors.timestamp && <p className="text-sm text-destructive">{errors.timestamp}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Status details..."
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Status'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
