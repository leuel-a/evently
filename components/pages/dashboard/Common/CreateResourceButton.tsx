'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {DASHBOARD_PREFIX} from '@/config/constants';
import {useResourceContext} from '@/context/ResourceContext';
import {getLabelForResource} from '@/utils';

export function CreateResourceButton() {
    const resource = useResourceContext();

    if (!resource) return null;

    const buttonLabel = `Create an ${getLabelForResource(resource)}`;
    const createUrl = `/${DASHBOARD_PREFIX}/${resource}/create`;

    return (
        <Button className="h-12">
            <Link className="text-md" href={createUrl}>
                {buttonLabel}
            </Link>
        </Button>
    );
}
