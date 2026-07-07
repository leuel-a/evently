import {Calendar, Clock, MapPin, Globe, Ticket, Tag} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {GetEventPageResult} from '@/app/events/actions';
import {formatDate} from '@/utils/date';

interface EventSummaryPanelProps {
    event: GetEventPageResult['data'];
    quantity: number;
    discountAmount: number;
}

export function EventSummaryPanel({event, quantity, discountAmount}: EventSummaryPanelProps) {
    const unitPrice = Number(event.ticketPrice ?? 0);
    const subtotal = unitPrice * quantity;
    const total = Math.max(0, subtotal - discountAmount);
    const isFree = unitPrice === 0;

    return (
        <aside className="flex flex-col justify-between gap-10 bg-indigo-950 px-8 py-10 text-indigo-50 lg:px-10 lg:py-12">
            <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                        <Ticket className="size-3" />
                        Evently
                    </span>
                    {event.category?.name && (
                        <Badge
                            variant="outline"
                            className="border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
                        >
                            {event.category.name}
                        </Badge>
                    )}
                </div>

                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-400">
                        You're buying a ticket to
                    </p>
                    <h1 className="mt-3 font-serif text-3xl leading-snug tracking-tight text-white lg:text-4xl">
                        {String(event.title)}
                    </h1>
                    {event.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-indigo-200/60">
                            {String(event.description)}
                        </p>
                    )}
                </div>

                <div className="space-y-3.5">
                    <MetaRow icon={Calendar}>
                        {event.date ? formatDate(new Date(event.date as unknown as string)) : '—'}
                    </MetaRow>

                    <MetaRow icon={Clock}>
                        {String(event.startTime)} – {String(event.endTime)}
                    </MetaRow>

                    {(event.type === 'physical' || event.type === 'hybrid') && event.address && (
                        <MetaRow icon={MapPin}>
                            <span>
                                {String(event.address)}
                                {event.location && (
                                    <span className="ml-1 text-indigo-300/60">
                                        · {String(event.location)}
                                    </span>
                                )}
                            </span>
                        </MetaRow>
                    )}

                    {(event.type === 'virtual' || event.type === 'hybrid') && (
                        <MetaRow icon={Globe}>
                            {EVENT_TYPE_LABELS[String(event.type)]} event
                            {event.type === 'hybrid' && event.address && (
                                <span className="ml-1 text-indigo-300/60">
                                    · also at {String(event.address)}
                                </span>
                            )}
                        </MetaRow>
                    )}

                    <MetaRow icon={Tag}>
                        {EVENT_TYPE_LABELS[String(event.type)] ?? String(event.type)}
                    </MetaRow>
                </div>
            </div>

            <div>
                <Separator className="mb-6 bg-indigo-400/20" />
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                    Order summary
                </p>
                <div className="space-y-2.5 text-sm">
                    <SummaryRow
                        label={`${
                            isFree
                                ? 'Free ticket'
                                : `${unitPrice.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                  })} × ${quantity}`
                        }`}
                        value={
                            isFree
                                ? 'Free'
                                : subtotal.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                  })
                        }
                    />
                    {discountAmount > 0 && (
                        <SummaryRow
                            label="Promo discount"
                            value={`−${discountAmount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                            valueClassName="text-emerald-400"
                        />
                    )}
                </div>
                <Separator className="my-4 bg-indigo-400/20" />
                <div className="flex items-baseline justify-between">
                    <span className="font-medium text-indigo-100">Total</span>
                    <span className="font-serif text-2xl text-white">
                        {isFree
                            ? 'Free'
                            : total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                    </span>
                </div>
            </div>
        </aside>
    );
}

const EVENT_TYPE_LABELS: Record<string, string> = {
    physical: 'In Person',
    virtual: 'Virtual',
    hybrid: 'Hybrid',
};

function MetaRow({icon: Icon, children}: {icon: React.ElementType; children: React.ReactNode}) {
    return (
        <div className="flex items-start gap-3 text-sm text-indigo-200/80">
            <Icon className="mt-px size-4 shrink-0 text-indigo-400" strokeWidth={1.5} />
            <span className="leading-snug">{children}</span>
        </div>
    );
}

function SummaryRow({
    label,
    value,
    valueClassName,
}: {
    label: string;
    value: string;
    valueClassName?: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-indigo-200/60">{label}</span>
            <span className={valueClassName ?? 'text-indigo-100'}>{value}</span>
        </div>
    );
}
