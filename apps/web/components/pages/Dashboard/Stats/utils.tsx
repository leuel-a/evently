export const CATEGORY_COLORS = {
    high: '#e8642c', // 5+  → vivid orange  (hot)
    medium: '#f0a045', // 3–4 → amber         (warm)
    low: '#3aafa9', // 2   → teal           (cool)
    minimal: '#94a3b8', // 1   → slate-400      (quiet)
    empty: '#cbd5e1', // 0   → slate-300      (dormant)
} as const;

export function getCategoryColor(count: number, total: number): string {
    if (total === 0) return CATEGORY_COLORS.empty;

    const ratio = count / total;

    if (ratio >= 0.5) return CATEGORY_COLORS.high;
    if (ratio >= 0.25) return CATEGORY_COLORS.medium;
    if (ratio >= 0.1) return CATEGORY_COLORS.low;
    if (ratio > 0) return CATEGORY_COLORS.minimal;
    return CATEGORY_COLORS.empty;
}

interface CategoryLegendProps {
    totalCategories: number;
}

export function CategoryLegend(props: CategoryLegendProps) {
    const {totalCategories} = props;
    return (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {(
                [
                    {
                        label: `≥ 50% (${Math.ceil(totalCategories * 0.5)}+ events)`,
                        color: CATEGORY_COLORS.high,
                    },
                    {
                        label: `25–49% (${Math.ceil(totalCategories * 0.25)}–${
                            Math.ceil(totalCategories * 0.5) - 1
                        } events)`,
                        color: CATEGORY_COLORS.medium,
                    },
                    {
                        label: `10–24% (${Math.ceil(totalCategories * 0.1)}–${
                            Math.ceil(totalCategories * 0.25) - 1
                        } events)`,
                        color: CATEGORY_COLORS.low,
                    },
                    {
                        label: `1–9% (1–${Math.ceil(totalCategories * 0.1) - 1} events)`,
                        color: CATEGORY_COLORS.minimal,
                    },
                ] as const
            ).map(({label, color}) => (
                <span
                    key={label}
                    className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                >
                    <span
                        className="inline-block h-2 w-2 rounded-full shrink-0"
                        style={{backgroundColor: color}}
                    />
                    {label}
                </span>
            ))}
        </div>
    );
}
