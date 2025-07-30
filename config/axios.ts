import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';

const instance = axios.create({
    baseURL: process.env.APP_URL as string,
});

type MakeApiCallConfig = AxiosRequestConfig & {
    isSecure?: boolean;
};

export async function makeApiCall(config: MakeApiCallConfig) {
    const {isSecure = false, ...requestConfig} = config;
    return instance.request({...requestConfig});
}

export {instance as axios};
