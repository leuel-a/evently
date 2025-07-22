import {ComponentProps} from 'react';
import {cn} from '@/lib/utils';
import {FormLabel as CnFormLabel} from '@/components/ui/form';

export function FormLabel({children, className, required = true, ...props}: FormLabelProps) {
    if (!required) {
        return <CnFormLabel {...props}>{children}</CnFormLabel>;
    }

    return (
        <CnFormLabel {...props}>
            {children}
            <span className={cn('text-red-500', '', className)}>*</span>
        </CnFormLabel>
    );
}

export interface FormLabelProps extends ComponentProps<typeof CnFormLabel> {
    required?: boolean;
}
