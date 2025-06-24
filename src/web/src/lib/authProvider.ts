import {API_ROUTES} from '@constants/routes';
import type {AuthProvider} from 'react-admin';
import {makeCall} from '@src/utils/api';
import type {LoginSchema} from '@pages/Login/validations';

type LoginParams = LoginSchema;

export const authProvider: AuthProvider = {
  login: async (params: LoginParams) => {
    const {email, password} = params;
    const response = await makeCall({
      requireAuth: false,
      url: API_ROUTES.AUTH.LOGIN,
      data: {email, password},
    });

    if (response.status === 200) {
      localStorage.setItem('access-token', response.data.token);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  checkError: async (error) => {
    if (error.status === 401) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: async (_params) => {
    const accessToken = localStorage.getItem('access-token');
    console.log(accessToken);
  },
  logout: async (_params) => {},
};

