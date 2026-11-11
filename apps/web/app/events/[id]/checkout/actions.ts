'use server';

import { redirect } from 'next/navigation'

export async function redirectToCheckout(checkoutUrl: string) {
    redirect(checkoutUrl);
}
