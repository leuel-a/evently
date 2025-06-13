import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: API_URL });

interface MakeCallParameters extends AxiosRequestConfig {
  /** Determines if the API call requires authentication headers */
  requireAuth: boolean;
}

export async function makeCall(parameters: MakeCallParameters) {
  const { method, data, headers, url } = parameters;
  const response = await api.request({ method, data, headers, url });

  return response.data;
}
