'use client';

import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';
import {useResourceContext} from './ResourceContext';

interface FilterContextType {
    resource: string | undefined;
    filters?: FiltersType;
    setFilters?: (filters: FiltersType) => void;
}

interface FiltersType {
    search?: string;
}

interface FilterProviderProps {
    children: ReactNode;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function FilterProvider({children}: Readonly<FilterProviderProps>) {
    const resource = useResourceContext();
    const [filters, setFilters] = useState<FiltersType>({});

    // TODO: add slots for normal filters and advanced filters that can be injected when using the provider
    return (
        <FilterContext.Provider value={{resource, filters, setFilters}}>
            {children}
        </FilterContext.Provider>
    );
}

function useFilterContext() {
    const context = useContext(FilterContext);

    if (!context) {
        throw new Error('useFilterContext must be used within a FilterProvider');
    }
    return context;
}

export {useFilterContext, FilterProvider, FilterContext};
export type {FilterContextType, FiltersType, FilterProviderProps};
