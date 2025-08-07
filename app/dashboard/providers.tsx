'use client';

import {resources} from '@/config/resource-definitions';
import {ResourceProvider} from '@/context/ResourceContext';
import {ResourcesProvider} from '@/context/ResourcesContext';

export default function Providers({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ResourcesProvider resources={resources}>
            <ResourceProvider>{children}</ResourceProvider>
        </ResourcesProvider>
    );
}
