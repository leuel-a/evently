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

            if (!Number.isNaN(parseInt(min))) priceQuery.$gte = parseInt(min);
            if (!Number.isNaN(parseInt(max))) priceQuery.$lte = parseInt(max);

            if (Object.keys(priceQuery).length > 0) {
                query.ticketPrice = priceQuery;
            }
        }

        return query;
    } catch {
        return {};
    }
}
