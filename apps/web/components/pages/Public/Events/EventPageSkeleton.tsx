import {Skeleton} from '@/components/ui/skeleton';

export function EventPageSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="h-64 bg-muted w-full" />
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
}
