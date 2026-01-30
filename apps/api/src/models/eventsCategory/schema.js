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

/** HELPER FUNCTIONS TO CONVERT ID */
schema.set('toJSON', {
    transform: (_document, returned) => {
        returned.id = returned._id;
        delete returned.__v;
        delete returned._id;
    },
});

schema.set('toObject', {
    transform: (_document, returned) => {
        returned.id = returned._id;
        delete returned.__v;
        delete returned._id;
    },
});


export default schema;
