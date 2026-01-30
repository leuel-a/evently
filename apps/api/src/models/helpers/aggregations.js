/**
 * Appends stages that rename _id → id and (optionally) remove _id
 * @param {boolean} [removeOriginalId=true] - whether to drop the original _id
 * @returns {object[]} pipeline stages to spread
 */
export function normalizeID(removeOriginalId = true) {
    const stages = [
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
