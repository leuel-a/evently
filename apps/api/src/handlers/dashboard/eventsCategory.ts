import express from 'express';
import httpStatus from 'http-status';
import { matchedData } from 'express-validator';
import { errors } from '../../errors/utils';
import EventsCategoryModel from '@evently/models/eventsCategory';
import type { IEventCategory } from '@evently/models/eventsCategory/types';

// TODO: this should be in the globale error messages
const EVENT_CATEGORY_NOT_FOUND_MESSAGE = 'Event Category not found';

export const getEventCategoriesHandler: express.RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const user = res.locals.user;
        const { limit, page, ids, q } = matchedData(req, {
            locations: ['query'],
        });
        const results = await EventsCategoryModel.getEventCategories({
            page,
            size: limit,
            userId: user?.id as string,
            q,
        });

        const currentPage = Number(results?.page ?? 1);
        const currentLimit = Number(results?.limit ?? 10);
        const total = Number(results?.total ?? 0);

        const responseRaw = {
            data: results?.data ?? [],
            page: currentPage,
            limit: currentLimit,
            total,
            hasPreviousPage: currentPage > 1,
            hasNextPage: currentPage * currentLimit < total,
        };

        res.status(httpStatus.OK).json(responseRaw);
    } catch (err) {
        next(err);
    }
};

export const getEventCategoryHandler: express.RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const { id } = matchedData(req, { locations: ['params'] });

        const result = await EventsCategoryModel.getEventCategory(
            { id },
            { lean: false },
        );
        if (!result?.data || Object.keys(result?.data).length === 0) {
            throw errors.notFound(EVENT_CATEGORY_NOT_FOUND_MESSAGE);
        }

        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const createEventCategoryHandler: express.RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const user = res.locals.user;
        const body = matchedData(req, {
            locations: ['body'],
        }) as IEventCategory;
        const eventCategory = await EventsCategoryModel.createEventCategory({
            ...body,
            user: user?.id,
        });

        res.status(httpStatus.CREATED).json({ data: eventCategory });
    } catch (error) {
        next(error);
    }
};

export const updateEventHandler: express.RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const params = matchedData(req, { locations: ['params'] });
        const body = matchedData(req, { locations: ['body'] });

        const result = await EventsCategoryModel.updateEventCategory(
            params?.id,
            body,
        );
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteEventHandler: express.RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const params = matchedData(req, { locations: ['params'] });
        const result = await EventsCategoryModel.deleteEventCategory(
            params?.id,
        );

        res.status(httpStatus.OK).json({ data: result });
    } catch (error) {
        next();
    }
};
