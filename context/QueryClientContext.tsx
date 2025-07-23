'use client';

import {QueryClientProvider as ReactQueryClientProvider, QueryClient as ReactQueryClient} from '@tanstack/react-query';
import type {ReactNode} from 'react';

const queryClient = new ReactQueryClient();

function QueryClientProvider({children}: Readonly<{children: ReactNode}>) {
    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}

export {QueryClientProvider, queryClient};
