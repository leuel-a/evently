'use server'

import { headers as nextHeaders } from 'next/headers';
import { makeApiCall } from "@/config/api";
import { API_ROUTES } from "@/config/routes";
import { ApiError } from '@/lib/error';
import type { GetLinkedAccountResponse } from '@/types/auth'

export async function getLinkedAccounts() {
    try {
        const headers = await nextHeaders();
        const linkedAccounts = await makeApiCall<GetLinkedAccountResponse>({
            url: API_ROUTES.users.linkedAccounts,
            headers
        })

        return { success: true, data: { linkedAccounts } }
    } catch (err) {
        const error = err as ApiError
        return { success: false, error }
    }
}
