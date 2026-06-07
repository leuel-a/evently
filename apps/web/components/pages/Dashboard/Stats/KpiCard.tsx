import {Card, CardContent} from '@/components/ui/card';

interface KpiCardProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
}

export function KpiCard(props: KpiCardProps) {
    const {title, value, icon} = props;
    return (
        <Card className="bg-background border border-border shadow-none rounded transition-colors hover:bg-muted/30">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
                        {title}
                    </p>
                    {icon && <span className="text-muted-foreground/50">{icon}</span>}
                </div>
                <p className="text-2xl font-medium tracking-tight text-foreground">{value}</p>
            </CardContent>
        </Card>
    );
}
