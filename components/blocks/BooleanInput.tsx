import type {ComponentProps} from 'react';
import {Switch} from '@/components/ui/switch';
import {cn} from '@/lib/utils';

export function BooleanInput(props: BooleanInputProps) {
    const {className, ...switchProps} = props;

    return <Switch className={cn(className)} {...switchProps} />;
}

type SwitchProps = ComponentProps<typeof Switch>;
export type BooleanInputProps = SwitchProps;
