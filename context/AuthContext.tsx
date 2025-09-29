'use client';

import {createContext, useContext, useState} from 'react';
import type {PropsWithChildren, ReactNode} from 'react';
import type {User} from 'better-auth';
import type {AuthenticatedUser} from '@/app/auth/actions';

type AuthContextType = {
    user: AuthenticatedUser | undefined;
    isAuthenticated: boolean;
    isPending: boolean;
};

type AuthProviderProps = PropsWithChildren & Omit<AuthContextType, 'isAuthenticated'> & {};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({user, isPending, children}: AuthProviderProps) {
    const [authState, setAuthState] = useState<{user?: User; isPending: boolean}>({
        user,
        isPending,
    });
    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!user, isPending}}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.name = 'AuthProvider';
export type {AuthenticatedUser as AuthUser, AuthContextType, AuthProviderProps};
