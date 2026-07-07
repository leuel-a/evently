import {Radio} from 'lucide-react';

export function formatPrice(price: number) {
    if (price === 0) return 'Free';
    return `ETB ${price.toLocaleString()}`;
}

export function statusColor(status: string) {
    return (
        {
            active: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
            draft: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
            closed: 'bg-red-500/10 text-red-600 border-red-200',
        }[status] ?? 'bg-muted text-muted-foreground'
    );
}

export function typeLabel(type: string) {
    return {physical: 'In Person', virtual: 'Virtual', hybrid: 'Hybrid'}[type] ?? type;
}

export function StatusPip({status}: {status: string}) {
    if (status === 'active') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-emerald-300">
                <Radio className="size-2.5 fill-emerald-400 text-emerald-400" />
                Live
            </span>
        );
    }
    if (status === 'closed') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-red-300">
                Closed
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-indigo-300">
            Draft
        </span>
    );
}
