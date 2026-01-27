import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';


/**
 * Create a Better Auth instance using native handles from Mongoose.
 *
 * @param {import('mongodb').Db} db
 * @param {import('mongodb').MongoClient} client
 */
export function createAuth(db, client) {
    return betterAuth({
        database: mongodbAdapter(db, { client })
    })
}
