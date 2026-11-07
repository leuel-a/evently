type InitializeChapaAcceptPaymentResponseMessage = 'Hosted Link' | 'Authorization required'
type InitializeChapaAcceptPaymentResponseStatus = 'success' | 'failed'

export interface InitializeChapaAcceptPaymentApiResponse {
    message: InitializeChapaAcceptPaymentResponseMessage,
    status: InitializeChapaAcceptPaymentResponseStatus
    data: { checkout_url: string } | undefined
}

