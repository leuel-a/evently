'use client';

import {createContext, useContext} from 'react';
import type {ReactNode} from 'react';
import type {User} from '@/app/generated/prisma';
import {useSession} from '@/lib/auth-client';

type AuthContextType = {
    user: SessionUser | undefined;
    isPending: boolean;
    isAuthenticated: boolean;
};
type SessionUser = User & {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children}: Readonly<{children: ReactNode}>) {
    const {data, isPending, error, refetch} = useSession();

    return <AuthContext.Provider value={{user: data?.user, isAuthenticated: !!data?.user, isPending}}>{children}</AuthContext.Provider>;
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
