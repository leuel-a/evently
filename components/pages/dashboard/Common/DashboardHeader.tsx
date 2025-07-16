import {useResourcesContext} from '@/context/ResourcesContext';
import {useResourceContext} from '@/context/ResourceContext';
import {CreateResourceButton} from './CreateResourceButton';
import {DashboardBreadcrumb} from './DashboardBreadcrumb';

export function DashboardHeader(_: DashboardHeaderProps) {
    const resources = useResourcesContext();
    const resource = useResourceContext();
    const shouldShowCreateButton = resources.find((res) => res.name === resource)?.hasCreate ?? false;

    return (
        <div className="flex h-20 w-full items-center justify-between px-2">
            <DashboardBreadcrumb />
            {shouldShowCreateButton && <CreateResourceButton />}
        </div>
    );
}

export interface DashboardHeaderProps {}
