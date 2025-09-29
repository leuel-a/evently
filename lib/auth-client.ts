import {inferAdditionalFields} from 'better-auth/client/plugins';
import {createAuthClient} from 'better-auth/react';
import {auth} from './auth';

const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()],
});

export {authClient};
export const {signIn, signUp, signOut, useSession} = authClient;
