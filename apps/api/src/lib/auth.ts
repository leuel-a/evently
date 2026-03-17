import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';

/** @type {import('better-auth').Auth | undefined} */
let auth = undefined;

/**
 * Create a Better Auth instance using native handles from Mongoose.
 *
 * @param {import('mongodb').Db} db
 * @param {import('mongodb').MongoClient} client
 * @returns {import('better-auth').Auth}
 */
export function createAuth(db, client) {
    return betterAuth({
        database: mongodbAdapter(db, {client}),
        socialProviders: {
            google: {
                prompt: 'select_account',
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        },
        trustedOrigins: [process.env.WEB_URL],
    });
}

/**
 * Initialize the Auth instance
 *
 * @param {import('./mongo-client.js').default} db
 * @returns {import('better-auth').Auth | undefined}
 */
export async function initAuth(db) {
    auth = createAuth(db.getDb(), db.getNativeClient());
    return auth;
}

/**
 * Get the current auth instance
 *
 * @returns {import('better-auth').Auth}
 */
export function getAuth() {
    if (!auth) {
        throw new Erorr('Auth has not been initialized. Call initAuth() first.');
    }
    return auth;
}
