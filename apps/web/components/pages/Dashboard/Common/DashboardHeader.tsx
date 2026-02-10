
'use client';

import {usePathname} from 'next/navigation';
import {useResourceContext} from '@/context/ResourceContext';
import {useResourcesContext} from '@/context/ResourcesContext';
import {removeEmptyStringsFromArray} from '@/utils/functions';
import {CreateResourceButton} from './CreateResourceButton';
import {DashboardBreadcrumb} from './DashboardBreadCrumb';

export interface DashboardHeaderProps {}

export function DashboardHeader(_: DashboardHeaderProps) {
    const pathname = usePathname();
    const resource = useResourceContext();
    const resources = useResourcesContext();

    const isCreatePath = pathname.split('/').includes('create');
    const currentPathIsList = removeEmptyStringsFromArray(pathname.split('/')).length === 2;
    const shouldShowCreateButton =
        (resources.find((res) => res.name === resource)?.hasCreate &&
            !isCreatePath &&
            currentPathIsList) ??
        false;

    return (
        <div className="flex h-8 w-full items-center justify-between px-2">
            <DashboardBreadcrumb />
            {shouldShowCreateButton && <CreateResourceButton />}
        </div>
    );
}
