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
        <Button className="h-12 bg-indigo-500 hover:bg-indigo-700 w-40 rounded hover:cursor-pointer">
            <Link className="text-[1rem]" href={createUrl}>
                {buttonLabel}
            </Link>
        </Button>
    );
}
