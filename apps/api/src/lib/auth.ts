import mongodb from 'mongodb';
import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import MongoClient from './mongo-client';

let auth: ReturnType<typeof createAuth> | undefined = undefined;

/** Create a Better Auth instance using native handles from Mongoose. */
export function createAuth(db: mongodb.Db, client: mongodb.MongoClient) {
    return betterAuth({
        database: mongodbAdapter(db, {client}),
        socialProviders: {
            google: {
                prompt: 'select_account',
                clientId: process.env.GOOGLE_CLIENT_ID as string, // TODO: this needs to be improved by sanitizing the env
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            },
        },
        trustedOrigins: [process.env.WEB_URL as string],
    });
}

/** Initialize the Auth instance */
export async function initAuth(db: MongoClient) {
    auth = createAuth(db.getDb(), db.getNativeClient());
    return auth;
}

/** Get the current auth instance */
export function getAuth() {
    if (!auth) {
        throw new Error('Auth has not been initialized. Call initAuth() first.');
    }
    return auth;
}
