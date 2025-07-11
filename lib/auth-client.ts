import {createAuthClient} from 'better-auth/react';

const authClient = createAuthClient({
    baseURL: process.env.APP_URL as string,
});

export const {signIn, signUp, signOut, useSession} = authClient;
