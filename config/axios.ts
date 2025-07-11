import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.APP_URL as string,
});

export {instance as axios};
