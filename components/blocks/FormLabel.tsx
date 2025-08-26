import {ComponentProps} from 'react';
import {FormLabel as CnFormLabel, useFormField} from '@/components/ui/form';
import {cn} from '@/lib/utils';

export function FormLabel({children, className, required = true, ...props}: FormLabelProps) {
    const {name} = useFormField();

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
