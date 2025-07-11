import {createContext, useState, useContext} from 'react';
import type {ReactNode} from 'react';
import type {User} from '@/app/generated/prisma';

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children}: Readonly<{children: ReactNode}>) {
    const [user] = useState<AuthContextType>({user: null, isAuthenticated: false, loading: false});

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

export {useAuthContext, AuthProvider, AuthContext};
export type {AuthContextType};
