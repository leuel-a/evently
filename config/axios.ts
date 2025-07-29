import axios from 'axios';
import {cookies} from 'next/headers';
import type {AxiosRequestConfig} from 'axios';

const instance = axios.create({
    baseURL: process.env.APP_URL as string,
});

type MakeApiCallConfig = AxiosRequestConfig & {
    isSecure: boolean;
};

export async function makeApiCall(config: MakeApiCallConfig) {
    const {isSecure, ...requestConfig} = config;
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    return instance.request({...requestConfig, });
}

export {instance as axios};
