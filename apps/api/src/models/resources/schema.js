import mongoose from 'mongoose';

/**
 * @typdef {import('../../utils/types.js').Resource Resource}
 * @type {import('mongoose').Schema<Resource>}
 */
const schema = mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {
        timestamps: true,
    },
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
