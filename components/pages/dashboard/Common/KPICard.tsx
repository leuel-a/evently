import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';

export interface KPICardProps {
    title: string;
    value: string | number;
    footer?: string;
}

export function KPICard({title, value, footer}: KPICardProps) {
    return (
        <Card className="rounded shadow-none gap-2 hover:shadow-md">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-medium">{value}</p>
            </CardContent>
            {footer && (
                <CardFooter>
                    <p className="text-gray-500 text-sm">{footer}</p>
                </CardFooter>
            )}
        </Card>
    );
}
