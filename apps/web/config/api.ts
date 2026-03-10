import {ApiError} from '@/lib/error';

const API_BASE_URL = process.env.API_URL;

export type MakeApiCallConfig = RequestInit & {
    url: string;
    isSecure?: boolean;
};

export async function makeApiCall<T>({
    url,
    isSecure = false,
    headers,
    ...init
}: MakeApiCallConfig): Promise<T> {
    const callURL = `${API_BASE_URL}${url}`;
    const outgoingHeaders = new Headers();

    if (headers instanceof Headers) {
        const cookie = headers.get('cookie');
        if (cookie) outgoingHeaders.set('cookie', cookie);
    } else if (headers) {
        const cookie = new Headers(headers).get('cookie');
        if (cookie) outgoingHeaders.set('cookie', cookie);
    }

    outgoingHeaders.set('content-type', 'application/json');

    const response = await fetch(callURL, {
        ...init,
        headers: outgoingHeaders,
    });

    if (!response.ok) {
        let errorData: unknown;
        let errorMessage = `HTTP ${response.status} ${response.statusText}`;

        try {
            const contentType = response.headers.get('content-type') ?? '';

            if (contentType.includes('application/json')) {
                errorData = await response.json();

                if (
                    errorData &&
                    typeof errorData === 'object' &&
                    'message' in errorData &&
                    typeof errorData.message === 'string'
                ) {
                    errorMessage = errorData.message;
                }
            } else {
                const text = await response.text();
                errorData = text;

                if (text) {
                    errorMessage = text;
                }
            }
        } catch {
            // ignore parse errors and keep the default message
        }

        throw new ApiError({
            message: errorMessage,
            status: response.status,
            statusText: response.statusText,
            url: callURL,
            data: errorData,
        });
    }

    return response.json() as Promise<T>;
}
