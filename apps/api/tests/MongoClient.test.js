import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import MongoClient from '../src/lib/db';

const { expect } = chai;

// mock the entire mongoose module
jest.mock('mongoose');

describe('MongoClient', () => {
    let mockConnect;
    let mockDisconnect;
    let mockConnection;
    let consoleLogSpy;
    let consoleErrorSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        MongoClient.connection = null;

        mockConnect = jest.fn().mockResolvedValue(undefined);
        mockDisconnect = jest.fn().mockResolvedValue(undefined);
        mockConnection = {
            readyState: 1,
        };

        mongoose.connect = mockConnect;
        mongoose.disconnect = mockDisconnect;
        mongoose.connection = mockConnection;

        consoleLogSpy = sinon.spy(console, 'log');
        consoleErrorSpy = sinon.spy(console, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('connect()', () => {
        it('should connect to MongoDB successfully on first call', async () => {
            process.env.DATABASE_URL = 'mongodb://test';

            await MongoClient.connect();

            expect(mockConnect).to.have.been.calledOnceWith('mongodb://test');
            expect(MongoClient.connection).to.equal(mockConnection);
            expect(consoleLogSpy).to.have.been.calledWith('MongoDB connected successfully');
            expect(consoleErrorSpy).to.not.have.been.called;
        });

        it('should not reconnect if already connected', async () => {
            MongoClient.connection = mockConnection;

            await MongoClient.connect();

            expect(mockConnect).to.not.have.been.called;
            expect(consoleLogSpy).to.have.been.calledWith('MongoDB already connected');
        });

        it('should throw error on connection failure', async () => {
            const error = new Error('Connection failed');
            mockConnect.mockRejectedValueOnce(error);
            process.env.DATABASE_URL = 'mongodb://test';

            try {
                await MongoClient.connect();
                expect.fail('Expected error to be thrown');
            } catch (err) {
                expect(err).to.equal(error);
                expect(consoleErrorSpy).to.have.been.calledWith('MongoDB connection error:', error);
            }
        });
    });

    describe('disconnect()', () => {
        it('should disconnect if connected', async () => {
            // Simulate connected
            MongoClient.connection = mockConnection;

            await MongoClient.disconnect();

            expect(mockDisconnect).to.have.been.calledOnce;
            expect(MongoClient.connection).to.be.null;
            expect(consoleLogSpy).to.have.been.calledWith('MongoDB disconnected');
        });

        it('should log message if no connection', async () => {
            // No connection
            MongoClient.connection = null;

            await MongoClient.disconnect();

            expect(mockDisconnect).to.not.have.been.called;
            expect(consoleLogSpy).to.have.been.calledWith('No active MongoDB connection to disconnect');
        });
    });

    describe('getClient()', () => {
        it('should return the connection if active', () => {
            MongoClient.connection = mockConnection;

            const client = MongoClient.getClient();
            expect(client).to.equal(mockConnection);
        });

        it('should throw error if no connection', () => {
            MongoClient.connection = null;
            expect(() => MongoClient.getClient()).to.throw('No active MongoDB connection. Call connect() first.');
        });
    });
});
