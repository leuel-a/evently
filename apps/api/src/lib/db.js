import mongoose from 'mongoose';

class MongoClient {
    static connection;
    static db_url = process.env.DATABASE_URL;

    static async connect() {
        if (this.connection && this.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return;
        }

        try {
            await mongoose.connect(MongoClient.db_url);
            this.connection = mongoose.connection;
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    static async disconnect() {
        if (this.connection && this.connection.readyState === 1) {
            await mongoose.disconnect();
            this.connection = null;
            console.log('MongoDB disconnected');
        } else {
            console.log('No active MongoDB connection to disconnect');
        }
    }

    static getClient() {
        if (!this.connection) {
            throw new Error('No active MongoDB connection. Call connect() first.');
        }
        return this.connection;
    }
}

const db = MongoClient();

export {MongoClient};
export default db;
