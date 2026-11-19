import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { GetDashboardSettingsApiResponse } from '@/types/settings';

export type DashboardSettingsContextType = Partial<GetDashboardSettingsApiResponse>;

export interface DashboardSettingsContextProps
    extends PropsWithChildren,
        DashboardSettingsContextType {}

export const DashboardSettingsContext = createContext<DashboardSettingsContextType | undefined>(
    undefined,
);

export const DashboardSettingsProvider = (props: DashboardSettingsContextProps) => {
    const { children, tickets, categories, resources } = props;
    const value = useMemo(() => ({ tickets, categories, resources }), [tickets, categories, resources]);

    return (
        <DashboardSettingsContext.Provider value={value}>
            {children}
        </DashboardSettingsContext.Provider>
    );
};

export function useDashboardSettings() {
    const context = useContext(DashboardSettingsContext);
    if (!context) {
        throw new Error('useDashboardSettings must be inside DashboardSettingsContext');
    }
    return context;
}
