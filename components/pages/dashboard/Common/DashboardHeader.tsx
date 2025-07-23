import {usePathname} from 'next/navigation';
import {useResourceContext} from '@/context/ResourceContext';
import {useResourcesContext} from '@/context/ResourcesContext';
import {CreateResourceButton} from './CreateResourceButton';
import {DashboardBreadcrumb} from './DashboardBreadcrumb';

export function DashboardHeader(_: DashboardHeaderProps) {
    const pathname = usePathname();
    const resources = useResourcesContext();
    const resource = useResourceContext();
    const isCreatePath = pathname.split('/').includes('create');
    const shouldShowCreateButton = (resources.find((res) => res.name === resource)?.hasCreate && !isCreatePath) ?? false;

    return (
        <div className="flex h-20 w-full items-center justify-between px-2">
            <DashboardBreadcrumb />
            {shouldShowCreateButton && <CreateResourceButton />}
        </div>
    );
}

export interface DashboardHeaderProps {}
