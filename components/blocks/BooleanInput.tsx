import type {ComponentProps} from 'react';
import {cn} from '@/lib/utils';
import {Switch} from '@/components/ui/switch';

export function BooleanInput(props: BooleanInputProps) {
    const {className, ...switchProps} = props;

    return (
        <Switch
            className={cn(className)}
            {...switchProps}
        />
    );
}

type SwitchProps = ComponentProps<typeof Switch>;
export type BooleanInputProps = SwitchProps;
