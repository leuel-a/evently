'use client';

import NextLink from 'next/link';
import {LayoutGrid, ArrowRight} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';
import {Button} from '@/components/ui/button';

const SLICES = [
    {start: -90, sweep: 110, opacity: 0.22},
    {start: 20, sweep: 80, opacity: 0.14},
    {start: 100, sweep: 60, opacity: 0.09},
    {start: 160, sweep: 50, opacity: 0.06},
    {start: 210, sweep: 60, opacity: 0.04},
    {start: 270, sweep: 30, opacity: 0.03},
];

const GHOST_LEGEND = [
    {w: 'w-24', opacity: 0.35},
    {w: 'w-20', opacity: 0.25},
    {w: 'w-16', opacity: 0.18},
    {w: 'w-12', opacity: 0.12},
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function slicePath(
    cx: number,
    cy: number,
    r: number,
    inner: number,
    startAngle: number,
    sweepAngle: number,
) {
    const end = startAngle + sweepAngle - 1; // 1° gap between slices
    const s = polarToCartesian(cx, cy, r, startAngle);
    const e = polarToCartesian(cx, cy, r, end);
    const si = polarToCartesian(cx, cy, inner, startAngle);
    const ei = polarToCartesian(cx, cy, inner, end);
    const large = sweepAngle > 180 ? 1 : 0;
    return [
        `M ${s.x} ${s.y}`,
        `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
        `L ${ei.x} ${ei.y}`,
        `A ${inner} ${inner} 0 ${large} 0 ${si.x} ${si.y}`,
        'Z',
    ].join(' ');
}

export function EmptyEventsByCategoryChart() {
    const CX = 90,
        CY = 90,
        R = 72,
        INNER = 44;

    return (
        <div
            className="relative select-none overflow-hidden rounded-lg"
            style={{minHeight: '17rem'}}
        >
            <div className="absolute inset-0 flex items-center px-6 gap-8">
                <div className="relative shrink-0">
                    <svg
                        width={CX * 2}
                        height={CY * 2}
                        viewBox={`0 0 ${CX * 2} ${CY * 2}`}
                        aria-hidden
                    >
                        <defs>
                            <linearGradient id="donutShimmer" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="45%" stopColor="white" stopOpacity="0.6" />
                                <stop offset="55%" stopColor="white" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                                <animateTransform
                                    attributeName="gradientTransform"
                                    type="rotate"
                                    from="0 0.5 0.5"
                                    to="360 0.5 0.5"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </linearGradient>
                            <mask id="donutMask">
                                {SLICES.map((s, i) => (
                                    <path
                                        key={i}
                                        d={slicePath(CX, CY, R, INNER, s.start, s.sweep)}
                                        fill="white"
                                    />
                                ))}
                            </mask>
                        </defs>
                        {SLICES.map((s, i) => (
                            <path
                                key={i}
                                d={slicePath(CX, CY, R, INNER, s.start, s.sweep)}
                                fill="#6366f1"
                                opacity={s.opacity * 3}
                            />
                        ))}
                        <rect
                            x="0"
                            y="0"
                            width={CX * 2}
                            height={CY * 2}
                            fill="url(#donutShimmer)"
                            mask="url(#donutMask)"
                        />
                        <text
                            x={CX}
                            y={CY - 6}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#c7d2fe"
                            fontWeight="600"
                        >
                            0
                        </text>
                        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="9" fill="#c7d2fe">
                            events
                        </text>
                    </svg>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                    {GHOST_LEGEND.map((g, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                            <span
                                className="size-2.5 shrink-0 rounded-sm"
                                style={{background: `rgba(99,102,241,${g.opacity * 2.5})`}}
                            />
                            <div className="flex flex-1 flex-col gap-1">
                                <div
                                    className={`h-2 rounded-full ${g.w} overflow-hidden`}
                                    style={{background: `rgba(99,102,241,${g.opacity})`}}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            background:
                                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                                            animation: `shimmerLegend 2.6s ease-in-out ${
                                                i * 0.18
                                            }s infinite`,
                                        }}
                                    />
                                </div>
                                <div
                                    className="h-1.5 w-10 rounded-full"
                                    style={{background: `rgba(99,102,241,${g.opacity * 0.6})`}}
                                />
                            </div>
                            <span
                                className="text-[10px] font-medium tabular-nums"
                                style={{color: `rgba(99,102,241,${g.opacity * 4})`}}
                            >
                                —%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="absolute inset-0 flex items-center justify-center rounded-lg"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,255,255,0.97) 55%, rgba(255,255,255,0.75) 100%)',
                }}
            >
                <div className="flex max-w-68 flex-col items-center gap-4 text-center">
                    <div className="relative">
                        <div className="absolute -inset-3 rounded bg-indigo-100/60 blur-md" />
                        <div className="relative flex size-14 items-center justify-center rounded-xl border border-indigo-200 bg-white shadow-sm shadow-indigo-100">
                            <LayoutGrid className="size-6 text-indigo-500" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-2xl font-semibold uppercase tracking-tight text-indigo-400">
                            No categories yet
                        </p>
                        <p className="text-lg font-semibold leading-snug tracking-tighter text-indigo-950">
                            Create events to see your category breakdown.
                        </p>
                        <p className="text-sm leading-relaxed text-indigo-950/50">
                            Each event category you publish will appear here as a slice of the
                            total.
                        </p>
                    </div>
                    <Button variant="link" asChild className="bg-indigo-500 border shadow-none rounded w-56 h-10">
                        <NextLink
                            href={APP_ROUTES.dashboard.eventsCategory.create}
                            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white transition"
                        >
                            Create a category
                            <ArrowRight className="size-3.5" />
                        </NextLink>
                    </Button>
                </div>
            </div>

            <style>{`
                @keyframes shimmerLegend {
                    0%   { transform: translateX(-100%); }
                    60%  { transform: translateX(200%);  }
                    100% { transform: translateX(200%);  }
                }
            `}</style>
        </div>
    );
}
