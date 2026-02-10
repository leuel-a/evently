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
    const response = await fetch(callURL, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}
