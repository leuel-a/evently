import type {ComponentProps} from 'react';
import {Switch} from '@/components/ui/switch';
import {cn} from '@/lib/utils';

type BooleanInputProps = ComponentProps<typeof Switch>;

export function BooleanInput(props: BooleanInputProps) {
    const {className, ...switchProps} = props;
    return <Switch className={cn(className)} {...switchProps} />;
}
