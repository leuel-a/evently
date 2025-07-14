import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';

const instance = axios.create({
    baseURL: process.env.APP_URL as string,
});

export function makeApiCall(config: AxiosRequestConfig) {
    return instance.request({...config});
}

export {instance as axios};
