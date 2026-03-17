import mongoose, {type Connection} from 'mongoose';
import type {MongoClient as NativeMongoClient, Db} from 'mongodb';
import {logger} from '../utils/logger.js';

class MongoClient {
    connection: Connection | undefined = undefined;
    nativeClient: NativeMongoClient | undefined = undefined;
    db: Db | undefined = undefined;
    dbUrl: string = '';

    constructor() {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error('DATABASE_URL not set in environment');
        this.dbUrl = url;
    }

    async connect(): Promise<void> {
        if (this.connection?.readyState === 1) {
            logger.info('MongoDB already connected');
            return;
        }

        await mongoose.connect(this.dbUrl);
        this.connection = mongoose.connection;
        this.nativeClient = this.connection.getClient();
        this.db = this.connection.db!;
        logger.info('MongoDB connected successfully');
    }

    async disconnect(): Promise<void> {
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

    getMongooseConnection(): Connection {
        if (!this.connection) throw new Error('Call connect() first.');
        return this.connection;
    }

    getNativeClient(): NativeMongoClient {
        if (!this.nativeClient) throw new Error('Call connect() first.');
        return this.nativeClient;
    }

    getDb(): Db {
        if (!this.db) throw new Error('Call connect() first.');
        return this.db;
    }
}

export default MongoClient;
