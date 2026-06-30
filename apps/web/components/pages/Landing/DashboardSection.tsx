import {Sparkles, Send} from 'lucide-react';

export function DashboardSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="max-w-xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
                        Dashboard
                    </p>
                    <h2 className="mt-3 font-serif text-4xl tracking-tight text-indigo-950">
                        Ask it what the chart doesn't show.
                    </h2>
                    <p className="mt-4 text-indigo-950/60">
                        Price trends, sell-through by tier, refund rate by event — it's all on the
                        dashboard. For the rest, just ask.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-950">
                                Price trend — Founders Night
                            </p>
                            <span className="text-xs text-indigo-950/40">Last 30 days</span>
                        </div>
                        <svg viewBox="0 0 400 140" className="mt-6 w-full">
                            <polyline
                                points="0,110 40,108 80,95 120,96 160,80 200,82 240,60 280,55 320,35 360,30 400,18"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <polyline
                                points="0,110 40,108 80,95 120,96 160,80 200,82 240,60 280,55 320,35 360,30 400,18 400,140 0,140"
                                fill="#6366f1"
                                opacity="0.08"
                                stroke="none"
                            />
                        </svg>
                        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-indigo-100 pt-4 text-sm">
                            <div>
                                <p className="text-indigo-950/40">Sold</p>
                                <p className="mt-1 font-medium text-indigo-950">312 / 400</p>
                            </div>
                            <div>
                                <p className="text-indigo-950/40">Avg. price</p>
                                <p className="mt-1 font-medium text-indigo-950">$38.50</p>
                            </div>
                            <div>
                                <p className="text-indigo-950/40">Refund rate</p>
                                <p className="mt-1 font-medium text-indigo-950">1.2%</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col rounded-2xl border border-indigo-100 bg-indigo-950 p-6 text-indigo-50">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-indigo-300">
                            <Sparkles className="size-3.5" />
                            Ask Evently
                        </div>

                        <div className="mt-5 space-y-3 text-sm">
                            <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-indigo-400/15 px-3 py-2 text-indigo-100">
                                Which ticket tier is underperforming this week?
                            </p>
                            <p className="max-w-[90%] rounded-xl rounded-tl-sm bg-white/5 px-3 py-2 text-indigo-200/90">
                                "General Admission" is down 18% week over week. The "VIP" tier is
                                pacing ahead of last event's sell-through by day 10.
                            </p>
                        </div>

                        <div className="mt-auto flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-white/5 px-3 py-2">
                            <input
                                disabled
                                placeholder="Ask about your events…"
                                className="w-full bg-transparent text-sm text-indigo-100 placeholder:text-indigo-300/40 focus:outline-none"
                            />
                            <Send className="size-4 text-indigo-300" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
