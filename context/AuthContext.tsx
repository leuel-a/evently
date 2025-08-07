'use client';

import {createContext, useContext} from 'react';
import type {ReactNode} from 'react';
import {useSession} from '@/lib/auth-client';

type AuthContextType = {
    user: SessionUser | undefined;
    isPending: boolean;
    isAuthenticated: boolean;
};
type SessionUser = {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children}: Readonly<{children: ReactNode}>) {
    const {data, isPending} = useSession();
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
