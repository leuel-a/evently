import mongoose from 'mongoose'

/**
 * Appends stages that rename _id → id and (optionally) remove _id
 */
export function normalizeID(removeOriginalId: boolean = true) {
    const stages: mongoose.PipelineStage[] = [
        {
            $project: {
                __v: 0,
            },
        },
        {
            $addFields: {id: '$_id'},
        },
    ];

    if (removeOriginalId) {
        stages.push({$unset: '_id'});
    }

    return stages;
}
