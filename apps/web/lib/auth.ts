import {inferAdditionalFields} from 'better-auth/client/plugins';
import {createAuthClient} from 'better-auth/react';

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    plugins: [
        inferAdditionalFields({
            user: {
                isOrganizer: {
                    type: 'boolean',
                    required: false,
                    default: false,
                    input: false,
                },
            },
        }),
    ],
});

export const {useSession} = authClient;
