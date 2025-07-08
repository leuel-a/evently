'use client';

import Link from 'next/link';
import {useResourceContext} from '@/context/resource-context';
import {getLabelForResource} from '@/utils';
import {Button} from '@/components/ui/button';

export function CreateResourceButton() {
    const resource = useResourceContext();

    if (!resource) return null;

    const buttonLabel = `Create ${getLabelForResource(resource)}`;
    const createUrl = `/dashboard/${resource}/create`;

    return (
        <Button size="lg">
            <Link href={createUrl}>{buttonLabel}</Link>{' '}
        </Button>
    );
}
