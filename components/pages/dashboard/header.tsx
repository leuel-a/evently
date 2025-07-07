import {useResourceContext} from '@/context/resource-context';
import {getLabelForResource} from '@/utils/index';

export function DashboardHeader() {
    const resource = useResourceContext();

    return (
        <div className="flex h-20 w-full items-center justify-between px-2">
            <h1 className="text-xl font-medium capitalize">{getLabelForResource(resource || '')}</h1>
        </div>
    );
}
