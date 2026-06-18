import type {PipelineStage} from 'mongoose';

export function filtersQuery(filters: any): PipelineStage.Match['$match'] {
    try {
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

        if (filters.status && Array.isArray(filters.status)) {
            query.status = {$in: [...filters.status]};
        }

        if (filters.categories && Array.isArray(filters.categories)) {
            query.category = {$in: [...filters.categories]}
        }

        return query;
    } catch {
        return {};
    }
}
