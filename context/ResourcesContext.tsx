'use client';

import {createContext, useContext} from 'react';
import type {FC, ReactNode} from 'react';
import type {ResourceItems} from '@/types/resources';

type ResourceContextType = ResourceItems;

const ResourcesContext = createContext<ResourceContextType | undefined>(undefined);

const ResourcesProvider: FC<Readonly<{resources: ResourceItems; children: ReactNode}>> = (props) => {
    const {resources, children} = props;
    return <ResourcesContext.Provider value={resources}>{children}</ResourcesContext.Provider>;
};

const useResourcesContext = () => {
    const resources = useContext(ResourcesContext);

    if (!resources) {
        throw new Error('useResourceContext must be used within a ResourceProvider');
    }

    return resources;
};

export {useResourcesContext, ResourcesProvider};
