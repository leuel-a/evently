import type {PipelineStage} from 'mongoose';

export function filtersQuery(value: any): PipelineStage.Match['$match'] {
    try {
        const filters = JSON.parse(value);

        if (!filters || typeof filters !== 'object') return {};

        const query: PipelineStage.Match['$match'] = {};

        // INFO: this should be documented
        if (filters.price) {
            const [min, max] = filters.price;
            const priceQuery: {$gte?: number; $lte?: number} = {};

            if (typeof parseInt(min) === 'number') priceQuery.$gte = parseInt(min);
            if (typeof parseInt(max) === 'number') priceQuery.$lte = parseInt(max);

            if (Object.keys(priceQuery).length > 0) {
                query.ticketPrice = priceQuery;
            }
        }

        return query;
    } catch {
        return {};
    }
}
