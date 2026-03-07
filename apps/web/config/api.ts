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
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}
