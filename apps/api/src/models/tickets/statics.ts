import mongoose from 'mongoose';
import TicketModel from '.';
import {TicketDocument, TICKET_STATUS} from './schema';
import {modelNames, TIMEZONE} from '../../config';
import {getPaginationValues} from '../helpers/index';

export interface GetTicketsParams {
    userId: string;
    page: string;
    size: string;
    status: string;
}
export type GetTicketsResult = {data: TicketDocument[]; total: number; page: string; limit: number};

export async function getTickets(this: typeof TicketModel, params: GetTicketsParams) {
    const {userId, page, size, status} = params;
    const matchQuery = {
        'event.user': new mongoose.Types.ObjectId(userId),
        ...(status && {status}),
    };

    const {limit, skip} = getPaginationValues(page, size);
    const result = await this.aggregate([
        {
            $lookup: {
                from: mongoose.model(modelNames.events).collection.name,
                localField: 'event',
                foreignField: '_id',
                as: 'event',
            },
        },
        {
            $unwind: '$event',
        },
        {
            $match: matchQuery,
        },
        {
            $facet: {
                data: [
                    {$skip: skip},
                    {$limit: limit},
                    {
                        $sort: {
                            createdAt: 1,
                        },
                    },
                    {
                        $project: {
                            id: '$_id',
                            _id: 0,
                            purchaserName: 1,
                            purchaserEmail: 1,
                            paymentId: 1,
                            amountPaid: 1,
                            currency: 1,
                            status: 1,
                            event: {
                                id: '$event._id',
                                title: '$event.title',
                                status: '$event.status',
                            },
                            eventId: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                ],
                total: [{$count: 'count'}],
            },
        },
    ]);

    const resultData = result?.[0]?.data;
    const resultTotal = result?.[0]?.total;
    return {data: resultData, total: resultTotal?.[0].count, page, limit};
}

export interface GetTicketsRevenueByMonthAndYearParams {}
export interface GetTicketsRevenueByMonthAndYearResult {
    data: {revenues: Array<{revenue: number; year: number; month: 1}>; totalRevenue: number};
}
export async function getTicketsRevenueByMonthAndYear(
    this: typeof TicketModel,
    _params: GetTicketsRevenueByMonthAndYearParams,
) {
    const matchQuery = {status: TICKET_STATUS.PAID};
    const result = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $addFields: {
                year: {$year: {date: '$createdAt', timezone: TIMEZONE}},
                month: {$month: {date: '$createdAt', timezone: TIMEZONE}},
            },
        },
        {
            $group: {
                _id: {year: '$year', month: '$month'},
                revenue: {$sum: '$amountPaid'},
            },
        },
        {
            $facet: {
                revenues: [
                    {$sort: {'_id.year': 1, '_id.month': 1}},
                    {
                        $project: {
                            _id: 0,
                            year: '$_id.year',
                            month: '$_id.month',
                            revenue: 1,
                        },
                    },
                ],
                totalRevenue: [
                    {
                        $group: {
                            _id: null,
                            total: {$sum: '$revenue'},
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            total: 1,
                        },
                    },
                ],
            },
        },
    ]);
    const resultData = {
        ...result?.[0],
        totalRevenue: result?.[0]?.totalRevenue?.[0]?.total,
    };
    return {data: resultData};
}
