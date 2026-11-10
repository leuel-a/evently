import axios, { AxiosError } from 'axios';
import { RequestHandler } from 'express';
import { matchedData } from 'express-validator';
import { env } from '../config/env';

type InitializeChapaAcceptPaymentResponseMessage =
    'Hosted Link' | 'Authorization required';
type InitializeChapaAcceptPaymentResponseStatus = 'success' | 'failed';

export interface InitializeChapaAcceptPaymentResponse {
    message: InitializeChapaAcceptPaymentResponseMessage;
    status: InitializeChapaAcceptPaymentResponseStatus;
    data: { checkout_url: string } | undefined;
}

export const initializeChapaAcceptPaymentHandler: RequestHandler = async (
    req,
    res,
    next,
) => {
    const data = matchedData(req, { locations: ['body'] });

    const initalizeAcceptPaymentURL = `${env.CHAPA_BASE_API_URL}/transaction/initialize`;
    const initalizeAcceptPaymentHeaders = {
        Authorization: `Bearer ${env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        const response =
            await axios.request<InitializeChapaAcceptPaymentResponse>({
                url: initalizeAcceptPaymentURL,
                method: 'POST',
                data,
                headers: initalizeAcceptPaymentHeaders,
            });

        res.send(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            next(err as AxiosError);
        } else {
            next(err);
        }
    }
};
