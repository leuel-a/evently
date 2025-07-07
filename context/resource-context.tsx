'use client';

import {usePathname} from 'next/navigation';
import {createContext, useContext} from 'react';

type ResourceContextType = string;

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

function ResourceProvider({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname();

    if (pathname === '/dashboard') {
        // If the pathname is exactly '/dashboard', we don't have a specific resource
        return <ResourceContext.Provider value={'dashboard'}>{children}</ResourceContext.Provider>;
    }

    const match = pathname.match(/^\/dashboard\/([^\/]+)/);
    const resource = match ? match[1] : undefined;

    return <ResourceContext.Provider value={resource}>{children}</ResourceContext.Provider>;
}

function useResourceContext() {
    const resource = useContext(ResourceContext);

    if (!resource) {
        throw new Error('useResourceContext must be used within a ResourceProvider');
    }

    return resource;
}

export {useResourceContext, ResourceProvider};
