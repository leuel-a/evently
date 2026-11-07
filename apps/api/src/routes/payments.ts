import express from 'express';
import { initializeChapaAcceptPaymentHandler } from '../handlers/payments';
import { validateRequest } from '../middlewares/validateRequest';
import { initalizeAcceptPaymentChapaValidator } from '../validators/payments'

const router: express.Router = express.Router()

router.post(
    '/chapa/initialize',
    initalizeAcceptPaymentChapaValidator,
    validateRequest,
    initializeChapaAcceptPaymentHandler
)

export default router;
