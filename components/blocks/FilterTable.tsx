import type {PropsWithChildren} from 'react';
import {FilterProvider} from '@/context/FiltersContext';

export interface FilterTableProps extends PropsWithChildren {}

export function FilterTable({children}: FilterTableProps) {
    return <FilterProvider>{children}</FilterProvider>;
}
