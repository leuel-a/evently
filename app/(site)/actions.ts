'use server';

import lodashGet from 'lodash/get';
import {revalidatePath} from 'next/cache';
import {APP_ROUTES} from '@/config/routes';
import {convertFormDataToObject} from '@/utils/functions';

export async function setSearchQueryAction(formData: FormData) {
    const formDataObject = convertFormDataToObject(formData);
    const searchParams = new URLSearchParams();

    searchParams.append('q', lodashGet(formDataObject, 'query'));
    revalidatePath(`${APP_ROUTES.index.home}?${searchParams.toString()}`, 'page');
}
