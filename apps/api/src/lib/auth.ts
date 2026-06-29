import mongodb from 'mongodb';
import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import MongoClient from './mongo-client';
import {getOAuthState} from 'better-auth/api';

let auth: ReturnType<typeof createAuth> | undefined = undefined;

export function createAuth(db: mongodb.Db, client: mongodb.MongoClient) {
    return betterAuth({
        emailAndPassword: {enabled: true},
        database: mongodbAdapter(db, {client}),
        databaseHooks: {
            user: {
                create: {
                    before: async (user, context) => {
                        if (context?.path === '/callback/:id') {
                            const additionalData = await getOAuthState();
                            return {
                                data: {
                                    ...user,
                                    isOrganizer: additionalData?.isOrganizer ?? false,
                                },
                            };
                        }
                    },
                },
            },
        },
        user: {
            additionalFields: {
                isOrganizer: {
                    type: 'boolean',
                    required: false,
                    default: false,
                    input: false,
                },
            },
        },
        socialProviders: {
            google: {
                prompt: 'select_account',
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            },
        },
        trustedOrigins: [process.env.WEB_URL as string],
    });
}

export async function initAuth(db: MongoClient) {
    auth = createAuth(db.getDb(), db.getNativeClient());
    return auth;
}

export function getAuth() {
    if (!auth) {
        throw new Error('Auth has not been initialized. Call initAuth() first.');
    }
    return auth;
}
