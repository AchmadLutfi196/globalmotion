import { Head, Link } from '@inertiajs/react';
import admin from '@/routes/admin';

interface Shipment {
    id: string;
    tracking_number: string;
    origin: string;
    destination: string;
    status: string;
    created_at: string;
}

interface Stats {
    total_shipments: number;
    pending: number;
    in_transit: number;
    delivered: number;
}

interface Props {
    recentShipments?: Shipment[];
    stats?: Stats;
}

const statusColors: Record<string, string> = {
    pending: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    picked_up: 'bg-primary/10 text-primary border-primary/20',
    in_transit: 'bg-secondary/10 text-secondary border-secondary/20',
    arrived_at_hub: 'bg-primary-container/30 text-primary border-primary/20',
    out_for_delivery: 'bg-status-warning/10 text-status-warning border-status-warning/20',
    delivered: 'bg-status-success/10 text-status-success border-status-success/20',
    cancelled: 'bg-status-error/10 text-status-error border-status-error/20',
};

const statusIcons: Record<string, string> = {
    pending: 'schedule',
    picked_up: 'local_shipping',
    in_transit: 'flight_takeoff',
    arrived_at_hub: 'warehouse',
    out_for_delivery: 'delivery_truck',
    delivered: 'check_circle',
    cancelled: 'cancel',
};

export default function AdminDashboard({ recentShipments = [], stats }: Props) {
    const totalShipments = stats?.total_shipments ?? 0;
    const pending = stats?.pending ?? 0;
    const inTransit = stats?.in_transit ?? 0;
    const delivered = stats?.delivered ?? 0;

    // Calculate percentages for progress bars
    const deliveryRate = totalShipments > 0 ? Math.round((delivered / totalShipments) * 100) : 0;
    const pendingRate = totalShipments > 0 ? Math.round((pending / totalShipments) * 100) : 0;
    const transitRate = totalShipments > 0 ? Math.round((inTransit / totalShipments) * 100) : 0;

    // Get current time for greeting
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-gutter px-margin-mobile md:px-margin-desktop py-margin-desktop">
                
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary p-gutter shadow-lg">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="font-label-md text-label-md text-white/80 mb-2">{greeting}! 👋</p>
                            <h1 className="font-display-lg text-display-lg text-white mb-2">Welcome to Dashboard</h1>
                            <p className="font-body-md text-body-md text-white/90">Here's what's happening with your shipments today</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                                href={admin.shipments.create().url}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-DEFAULT font-label-md text-label-md hover:bg-white/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                            >
                                <span className="material-symbols-outlined">add_circle</span>
                                New Shipment
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards with Progress */}
                <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Shipments */}
                    <div className="glass-panel rounded-xl p-gutter diffused-shadow group hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-md group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">inventory_2</span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
                                <span className="material-symbols-outlined text-xs">trending_up</span>
                                100%
                            </span>
                        </div>
                        <p className="font-display-lg text-display-lg text-primary mb-1">{totalShipments}</p>
                        <p className="font-label-md text-label-md text-on-surface-variant mb-3">Total Shipments</p>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="glass-panel rounded-xl p-gutter diffused-shadow group hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-status-warning to-tertiary text-white shadow-md group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">schedule</span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-status-warning/10 text-status-warning font-label-sm text-label-sm">
                                {pendingRate}%
                            </span>
                        </div>
                        <p className="font-display-lg text-display-lg text-primary mb-1">{pending}</p>
                        <p className="font-label-md text-label-md text-on-surface-variant mb-3">Awaiting Pickup</p>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-status-warning to-tertiary rounded-full transition-all duration-500" style={{ width: `${pendingRate}%` }} />
                        </div>
                    </div>

                    {/* In Transit */}
                    <div className="glass-panel rounded-xl p-gutter diffused-shadow group hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-status-error text-white shadow-md group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">local_shipping</span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm">
                                {transitRate}%
                            </span>
                        </div>
                        <p className="font-display-lg text-display-lg text-primary mb-1">{inTransit}</p>
                        <p className="font-label-md text-label-md text-on-surface-variant mb-3">In Transit</p>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary to-status-error rounded-full transition-all duration-500" style={{ width: `${transitRate}%` }} />
                        </div>
                    </div>

                    {/* Delivered */}
                    <div className="glass-panel rounded-xl p-gutter diffused-shadow group hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-status-success to-emerald-600 text-white shadow-md group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl fill">check_circle</span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-status-success/10 text-status-success font-label-sm text-label-sm">
                                {deliveryRate}%
                            </span>
                        </div>
                        <p className="font-display-lg text-display-lg text-primary mb-1">{delivered}</p>
                        <p className="font-label-md text-label-md text-on-surface-variant mb-3">Delivered</p>
                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-status-success to-emerald-600 rounded-full transition-all duration-500" style={{ width: `${deliveryRate}%` }} />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-gutter lg:grid-cols-3">
                    
                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-headline-lg text-headline-lg text-primary">Quick Actions</h2>
                            <span className="material-symbols-outlined text-outline">bolt</span>
                        </div>

                        <Link href={admin.shipments.index().url} className="group block glass-panel rounded-xl p-5 diffused-shadow hover:shadow-lg transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">inventory_2</span>
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-headline-lg text-headline-lg text-primary mb-0.5">Manage Shipments</h3>
                                    <p className="font-label-md text-label-md text-on-surface-variant truncate">Track and update deliveries</p>
                                </div>
                                <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                        </Link>

                        <Link href={admin.pricing.index().url} className="group block glass-panel rounded-xl p-5 diffused-shadow hover:shadow-lg transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">payments</span>
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-headline-lg text-headline-lg text-primary mb-0.5">Pricing Config</h3>
                                    <p className="font-label-md text-label-md text-on-surface-variant truncate">Configure rates and fees</p>
                                </div>
                                <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                        </Link>

                        <Link href={admin.shipments.create().url} className="group block relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-primary via-primary-container to-secondary shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                            <div className="relative flex items-center gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-2xl text-white">add_circle</span>
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-headline-lg text-headline-lg text-white mb-0.5">Create Shipment</h3>
                                    <p className="font-label-md text-label-md text-white/80 truncate">Register new cargo</p>
                                </div>
                                <span className="material-symbols-outlined text-white/80 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                        </Link>

                        {/* Performance Summary */}
                        <div className="glass-panel rounded-xl p-5 diffused-shadow">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                <h3 className="font-headline-lg text-headline-lg text-primary">Performance</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-label-md text-label-md text-on-surface">Delivery Rate</span>
                                        <span className="font-label-md text-label-md text-status-success font-bold">{deliveryRate}%</span>
                                    </div>
                                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-status-success rounded-full" style={{ width: `${deliveryRate}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-label-md text-label-md text-on-surface">On-Time</span>
                                        <span className="font-label-md text-label-md text-primary font-bold">98.5%</span>
                                    </div>
                                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '98.5%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Shipments */}
                    <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden diffused-shadow">
                        <div className="flex items-center justify-between px-gutter py-5 border-b border-surface-border bg-surface-container-lowest/30">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">history</span>
                                <h2 className="font-headline-lg text-headline-lg text-primary">Recent Activity</h2>
                            </div>
                            <Link href={admin.shipments.index().url} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all group">
                                View All
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
                            </Link>
                        </div>
                        <div className="divide-y divide-surface-border max-h-[500px] overflow-y-auto">
                            {recentShipments.length > 0 ? (
                                recentShipments.slice(0, 6).map((shipment, index) => (
                                    <Link
                                        key={shipment.id}
                                        href={admin.shipments.show({ shipment: shipment.id }).url}
                                        className="flex items-center gap-4 px-gutter py-4 hover:bg-surface-container-lowest/50 transition-all group"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <span className="material-symbols-outlined text-xl">{statusIcons[shipment.status] || 'local_shipping'}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-label-md text-label-md font-mono text-primary group-hover:text-secondary transition-colors truncate font-bold">{shipment.tracking_number}</p>
                                            <p className="font-body-md text-body-md text-on-surface-variant truncate flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                {shipment.origin} → {shipment.destination}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1.5 font-label-sm text-label-sm uppercase tracking-wider rounded-full border ${statusColors[shipment.status] || 'bg-surface-container-low text-primary border-surface-border'}`}>
                                                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                                                {shipment.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                                        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                                            <span className="material-symbols-outlined text-5xl text-primary">inventory_2</span>
                                        </span>
                                    </div>
                                    <p className="font-headline-xl text-headline-xl text-primary mb-2">No shipments yet</p>
                                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-sm">Start by creating your first shipment to track deliveries and manage logistics</p>
                                    <Link 
                                        href={admin.shipments.create().url}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-DEFAULT font-label-md text-label-md hover:shadow-lg transition-all active:scale-95"
                                    >
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Create First Shipment
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/admin/dashboard' }],
};
