import {createContext, useContext} from 'react';
import type {PropsWithChildren} from 'react';

type ChoicesContextType<T = any> = {
    choices: Array<T> | undefined;
};

const ChoicesContext = createContext<ChoicesContextType | undefined>(undefined);

const ChoicesProvider = <T,>({choices, children}: ChoicesProviderProps<T>) => {
    return <ChoicesContext.Provider value={{choices}}>{children}</ChoicesContext.Provider>;
};

interface ChoicesProviderProps<T = any> extends PropsWithChildren {
    choices: Array<T> | undefined;
}

function useChoicesContext<T = any>() {
    const context = useContext(ChoicesContext) as ChoicesContextType<T> | undefined;
    if (context === undefined) {
        throw new Error('useChoicesContext must be used within a ChoicesProvider');
    }
    return context;
}

export {ChoicesProvider, ChoicesContext, useChoicesContext};
export type {ChoicesProviderProps};
