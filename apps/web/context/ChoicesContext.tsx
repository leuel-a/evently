import {createContext, useContext, useMemo} from 'react';
import type {PropsWithChildren} from 'react';

export type ChoicesContextType<T = any> = {choices: Array<T> | undefined};
export interface ChoicesProviderProps<T = any> extends PropsWithChildren {
    choices: Array<T> | undefined;
}

export const ChoicesContext = createContext<ChoicesContextType | undefined>(undefined);
export const ChoicesProvider = <T,>({choices, children}: ChoicesProviderProps<T>) => {
    const value = useMemo(() => ({choices}), [choices]);
    return <ChoicesContext.Provider value={value}>{children}</ChoicesContext.Provider>;
};

export function useChoicesContext<T = any>() {
    const context = useContext(ChoicesContext) as ChoicesContextType<T> | undefined;

    if (context === undefined) {
        throw new Error('useChoicesContext must be used within a ChoicesProvider');
    }
    return context;
}
