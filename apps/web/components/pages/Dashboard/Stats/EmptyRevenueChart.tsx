'use client';

import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {TrendingUp, ArrowRight} from 'lucide-react';
import Link from 'next/link';

const BARS = [28, 42, 35, 58, 50, 78, 65, 82, 70, 55, 44, 38];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Ghost area-chart path for the SVG preview layer
const W = 600;
const H = 120;
const PAD = 16;

function toPoints(bars: number[]) {
    return bars.map((h, i) => {
        const x = PAD + (i / (bars.length - 1)) * (W - PAD * 2);
        const y = H - PAD - (h / 100) * (H - PAD * 2);
        return `${x},${y}`;
    });
}

const linePoints = toPoints(BARS).join(' ');
const areaPoints = [`${PAD},${H - PAD}`, ...toPoints(BARS), `${W - PAD},${H - PAD}`].join(' ');

export function EmptyRevenueChart() {
    return (
        <div
            className="relative select-none overflow-hidden rounded-lg h-full"
            style={{minHeight: '19rem'}}
        >
            <div className="absolute inset-0 flex flex-col justify-between p-4">
                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                    className="absolute inset-x-4 top-4 h-28 w-[calc(100%-2rem)]"
                    aria-hidden
                >
                    <defs>
                        <linearGradient id="ghostArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="white" stopOpacity="0" />
                            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
                            <stop offset="60%" stopColor="white" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                            <animateTransform
                                attributeName="gradientTransform"
                                type="translate"
                                from="-1 0"
                                to="2 0"
                                dur="2.4s"
                                repeatCount="indefinite"
                            />
                        </linearGradient>
                        <clipPath id="areaClip">
                            <polygon points={areaPoints} />
                        </clipPath>
                    </defs>
                    <polygon points={areaPoints} fill="url(#ghostArea)" />
                    <polyline
                        points={linePoints}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                    />
                    <rect
                        x="0"
                        y="0"
                        width={W}
                        height={H}
                        fill="url(#shimmerGrad)"
                        clipPath="url(#areaClip)"
                    />
                </svg>

                <div
                    className="absolute inset-x-4 bottom-8 flex items-end gap-0.75"
                    style={{height: '7rem'}}
                >
                    {BARS.map((h, i) => (
                        <div
                            key={i}
                            className="relative flex-1 overflow-hidden rounded-t-sm"
                            style={{
                                height: `${h}%`,
                                background:
                                    'linear-gradient(to top, rgba(99,102,241,0.20), rgba(165,180,252,0.08))',
                            }}
                        >
                            <span
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                                    animation: `shimmerBar 2.4s ease-in-out ${i * 0.08}s infinite`,
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-x-4 bottom-1 flex">
                    {MONTHS.map((m) => (
                        <span
                            key={m}
                            className="flex-1 text-center text-[9px] font-medium text-indigo-900"
                        >
                            {m}
                        </span>
                    ))}
                </div>

                {[0, 25, 50, 75, 100].map((p) => (
                    <div
                        key={p}
                        className="absolute inset-x-4 border-t border-dashed border-indigo-100"
                        style={{bottom: `calc(2rem + ${p * 0.65}%)`}}
                    />
                ))}
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
                            <TrendingUp className="size-6 text-indigo-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-2xl font-semibold uppercase tracking-tight text-indigo-400">
                            No revenue yet
                        </p>
                        <p className="text-lg font-semibold leading-snug tracking-tighter text-indigo-950">
                            Sell your first ticket
                            <br />
                            to see it here.
                        </p>
                        <p className="text-sm leading-relaxed text-indigo-950/50">
                            Monthly revenue, by ticket tier, will fill this chart as soon as your
                            first order comes in.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="link"
                        className="border shadow-none bg-indigo-500 rounded w-56 h-10"
                    >
                        <Link
                            href={APP_ROUTES.dashboard.events.create}
                            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-white"
                        >
                            Create an event
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
            <style>{`
                @keyframes shimmerBar {
                    0%   { transform: translateX(-100%); }
                    60%  { transform: translateX(200%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}
