import mongoose from 'mongoose';
import {logger} from '../utils/logger.js';

class MongoClient {
    /** @type {import('mongoose').Connection | undefined} */
    connection = undefined;

    /** @type {import('mongodb').MongoClient | undefined} */
    nativeClient = undefined;

    /** @type {import('mongodb').Db} */
    db = undefined;

    dbUrl = '';

    constructor() {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error('DATABASE_URL not set in environment');
        this.dbUrl = url;
    }

    async connect() {
        if (this.connection?.readyState === 1) {
            logger.info('MongoDB already connected');
            return;
        }

        await mongoose.connect(this.dbUrl);
        this.connection = mongoose.connection;
        this.nativeClient = this.connection.getClient();
        this.db = this.connection.db;
        logger.info('MongoDB connected successfully');
    }

    async disconnect() {
        if (this.connection?.readyState === 1) {
            await mongoose.disconnect();
            this.connection = undefined;
            this.nativeClient = undefined;
            this.db = undefined;
            logger.info('MongoDB disconnected');
        } else {
            logger.info('No active MongoDB connection to disconnect');
        }
    }

    getMongooseConnection() {
        if (!this.connection) throw new Error('Call connect() first.');
        return this.connection;
    }

    getNativeClient() {
        if (!this.nativeClient) throw new Error('Call connect() first.');
        return this.nativeClient;
    }

    getDb() {
        if (!this.db) throw new Error('Call connect() first.');
        return this.db;
    }
}

export default MongoClient;
