import mongoose from 'mongoose';

/**
 * @typedef {import('../../utils/types.js').EventCategory} EventCategory
 * @type {import('mongoose').Schema<EventCategory>}
 */
const schema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        isDeleted: {type: Boolean, required: false, default: false},
    },
    {timestamps: true},
);

export default schema;
