import axios from 'axios';

import { CONSTANTS } from '../constants';

const getBaseUrl = (): string => {
  const dataStr = localStorage.getItem(CONSTANTS.BACKEND_API.LS_KEY);
  const data = dataStr ? JSON.parse(dataStr) as Settings.BackendApiUrl : CONSTANTS.BACKEND_API.INITIAL;
  return data.apis.find(api => api.name === data.current)?.url ?? import.meta.env.VITE_API_URL ?? 'https://sub.store';
};

export const service = axios.create({
  baseURL: getBaseUrl(),
  timeout: 1000,
});
