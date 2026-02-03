'use client';

import type {PropsWithChildren} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export interface ComposeProvidersProps extends PropsWithChildren {}

export function ComposeProviders({children}: ComposeProvidersProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
