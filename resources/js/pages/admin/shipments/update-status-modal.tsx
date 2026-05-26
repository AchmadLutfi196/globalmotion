import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import admin from '@/routes/admin';

interface Props {
    shipmentId: string;
    trackingNumber: string;
    currentStatus: string;
}

const STATUSES = [
    { value: 'pending',          label: 'Pending',           icon: 'schedule' },
    { value: 'picked_up',        label: 'Picked Up',         icon: 'local_shipping' },
    { value: 'in_transit',       label: 'In Transit',        icon: 'flight_takeoff' },
    { value: 'arrived_at_hub',   label: 'Arrived at Hub',    icon: 'warehouse' },
    { value: 'out_for_delivery', label: 'Out for Delivery',  icon: 'delivery_dining' },
    { value: 'delivered',        label: 'Delivered',         icon: 'check_circle' },
    { value: 'cancelled',        label: 'Cancelled',         icon: 'cancel' },
];

export function UpdateStatusModal({ shipmentId, trackingNumber, currentStatus }: Props) {
    const [open, setOpen] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        status: string;
        location: string;
        description: string;
        timestamp: string;
        photo: File | null;
    }>({
        status: currentStatus,
        location: '',
        description: '',
        timestamp: new Date().toISOString().slice(0, 16),
        photo: null,
    });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.shipments.updateStatus({ shipment: shipmentId }).url, {
            forceFormData: true,
            onSuccess: () => {
                setOpen(false);
                reset();
                setPhotoPreview(null);
                toast.success('Status updated successfully');
            },
        });
    };

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) {
            reset();
            setPhotoPreview(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm" className="cursor-pointer">
                    <span className="material-symbols-outlined text-base mr-1.5">edit_location</span>
                    Update Status
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="font-headline-lg text-headline-lg text-on-surface">
                            Update Shipment Status
                        </DialogTitle>
                        <DialogDescription className="font-label-md text-label-md text-on-surface-variant">
                            Tracking: <span className="font-bold text-primary font-mono">{trackingNumber}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Status */}
                        <div className="space-y-1.5">
                            <Label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                New Status
                            </Label>
                            <Select value={data.status} onValueChange={v => setData('status', v)}>
                                <SelectTrigger className="h-10 rounded-lg border-surface-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUSES.map(s => (
                                        <SelectItem key={s.value} value={s.value}>
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">{s.icon}</span>
                                                {s.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="font-label-sm text-label-sm text-status-error">{errors.status}</p>}
                        </div>

                        {/* Location */}
                        <div className="space-y-1.5">
                            <Label htmlFor="location" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                Location
                            </Label>
                            <Input id="location" className="h-10 rounded-lg border-surface-border"
                                value={data.location} onChange={e => setData('location', e.target.value)}
                                placeholder="e.g. Jakarta Hub, Gudang Surabaya" />
                            {errors.location && <p className="font-label-sm text-label-sm text-status-error">{errors.location}</p>}
                        </div>

                        {/* Timestamp */}
                        <div className="space-y-1.5">
                            <Label htmlFor="timestamp" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                Date & Time
                            </Label>
                            <Input id="timestamp" type="datetime-local" className="h-10 rounded-lg border-surface-border"
                                value={data.timestamp} onChange={e => setData('timestamp', e.target.value)} />
                            {errors.timestamp && <p className="font-label-sm text-label-sm text-status-error">{errors.timestamp}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                Description (optional)
                            </Label>
                            <textarea id="description" rows={2}
                                className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 font-label-md text-label-md text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                value={data.description} onChange={e => setData('description', e.target.value)}
                                placeholder="Additional notes about this update..." />
                            {errors.description && <p className="font-label-sm text-label-sm text-status-error">{errors.description}</p>}
                        </div>

                        {/* Photo upload */}
                        <div className="space-y-1.5">
                            <Label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                                Proof Photo (optional, max 2MB)
                            </Label>
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-surface-border bg-surface-container/30 p-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                            >
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Preview" className="h-24 w-auto rounded-lg object-cover" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-3xl text-outline">add_photo_alternate</span>
                                        <p className="font-label-md text-label-md text-on-surface-variant">Click to upload photo</p>
                                    </>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            {errors.photo && <p className="font-label-sm text-label-sm text-status-error">{errors.photo}</p>}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                    Updating…
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                    Update Status
                                </span>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
