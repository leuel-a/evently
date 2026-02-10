import {ComponentProps} from 'react';
import {FieldLabel as CnFieldLabel} from '@/components/ui/field';
import {cn} from '@/lib/utils';

export function FieldLabel({children, className, required = true, ...props}: FieldLabelProps) {
    if (!required) {
        return <CnFieldLabel {...props}>{children}</CnFieldLabel>;
    }

    return (
        <CnFieldLabel {...props}>
            {children}
            <span className={cn('text-red-500', '', className)}>*</span>
        </CnFieldLabel>
    );
}

export interface FieldLabelProps extends ComponentProps<typeof CnFieldLabel> {
    required?: boolean;
}
