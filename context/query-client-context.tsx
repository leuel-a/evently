'use client';

import type {ReactNode} from 'react';
import {QueryClientProvider as ReactQueryClientProvider, QueryClient as ReactQueryClient} from '@tanstack/react-query';

const queryClient = new ReactQueryClient();

function QueryClientProvider({children}: Readonly<{children: ReactNode}>) {
    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}

export {QueryClientProvider, queryClient};
