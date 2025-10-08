import {ArrowLeft} from 'lucide-react';
import {Button, ButtonProps as DefaultButtonProps} from '@/components/ui/button';

export interface GoBackButtonProps {
    asChild: boolean;
    ButtonProps?: Omit<DefaultButtonProps, 'asChild'>;
}

export function GoBackButton({ButtonProps = {}}: GoBackButtonProps) {
    const {onClick} = ButtonProps;

    return (
        <Button
            variant="outline"
            className="rounded-full"
            onClick={onClick}
        >
            <ArrowLeft />
        </Button>
    );
}
