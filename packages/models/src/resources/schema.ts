import mongoose from 'mongoose';
import type {IResource} from './types';

const schema = new mongoose.Schema<IResource>(
    {
        name: {type: String, required: true},
    },
    {timestamps: true},
);

export default schema;
