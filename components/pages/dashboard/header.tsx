import {usePathname} from 'next/navigation';
import {useResourceContext} from '@/context/resource-context';
import {getLabelForResource} from '@/utils/index';
import {CreateResourceButton} from './create-resource-button';

export function DashboardHeader(props: DashboardHeaderProps) {
    const {shouldShowCreateButton = true} = props;
    const resource = useResourceContext();

    return (
        <div className="flex h-20 w-full items-center justify-between px-2">
            <h1 className="text-xl font-medium capitalize">{getLabelForResource(resource || '')}</h1>
            {shouldShowCreateButton && <CreateResourceButton />}
        </div>
    );
}

export interface DashboardHeaderProps {
    shouldShowCreateButton?: boolean;
}
