type TransferEvent = 'payout.success' | 'payout.failed/cancelled';
type TransferEventStatus = 'success' | 'failed/cancelled';

type TransactionEvent =
    | 'charge.success'
    | 'charge.refunded'
    | 'charge.reversed'
    | 'charge.failed/cancelled';
type TransactionEventStatus = 'success' | 'refunded' | 'reversed' | 'failed/cancelled';

export type TransactionWebhookResponse = {
    event: TransactionEvent;
    first_name: string;
    last_name: string;
    email: string | null;
    mobile: string;
    currency: string;
    amount: string;
    charge: string;
    status: TransactionEventStatus;
    mode: 'live' | 'test';
    reference: string;
    created_at: string;
    updated_at: string;
    type: string;
    tx_ref: string;
    payment_method: string;
    customization: {
        title: string | null;
        description: string | null;
        logo: string | null;
    };
    meta: Record<string, any> | null;
};
export type TransferWebhookResponse = {
    event: TransferEvent;
    type: 'Payout';
    account_name: string;
    account_number: string;
    bank_id: number;
    bank_name: string;
    amount: string;
    charge: string;
    currency: string;
    status: TransactionEventStatus;
    reference: string;
    chapa_reference: string;
    bank_reference: string;
    created_at: string;
    updated_at: string;
};
