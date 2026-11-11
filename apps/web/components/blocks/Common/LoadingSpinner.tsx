import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
    className?: string;
    spinClassName?: string;
}

export function LoadingSpinner(props: LoadingSpinnerProps) {
    const {
        className: customClassName,
        spinClassName: customSpinClassName
    } = props;
    return (
        <div className={cn("flex justify-center items-center h-screen", customClassName)}>
            <div className={cn("animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500", customSpinClassName)}></div>
        </div>
    );
}
