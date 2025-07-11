import {CreateResourceButton} from './CreateResourceButton';
import {DashboardBreadcrumb} from './DashboardBreadcrumb';

export function DashboardHeader(props: DashboardHeaderProps) {
    const {shouldShowCreateButton = true} = props;

    return (
        <div className="flex h-20 w-full items-center justify-between px-2">
            <DashboardBreadcrumb />
            {shouldShowCreateButton && <CreateResourceButton />}
        </div>
    );
}

export interface DashboardHeaderProps {
    shouldShowCreateButton?: boolean;
}
