import axios from 'axios';
import { CodeErrorMessage } from '../../constants/CodeErrorMessage';

const getResponseErrorMessage = (error, redirectLogin) => {
  if (error && error.message === 'Network Error') {
    return Promise.reject(CodeErrorMessage.NETWORK_ERROR);
  }

  if (error && error.message && error.message.includes('timeout of')) {
    return Promise.reject(CodeErrorMessage.TIMEOUT);
  }

  if (error && !error.response) {
    return Promise.reject(CodeErrorMessage.INTERNAL_SERVER_ERROR);
  }

  if (error.response.status === 500) {
    return Promise.reject(CodeErrorMessage.INTERNAL_SERVER_ERROR);
  }
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.errors.length > 0
  ) {
    const errorMessage = error.response.data.errors[0].message;
    return Promise.reject(errorMessage);
  }
};

const instanceAxiosAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'X-Api-Key': process.env.REACT_APP_X_API_KEY,
  },
  timeout: 10 * 1000,
});

instanceAxiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    return getResponseErrorMessage(error, false);
  }
);

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  timeout: 15 * 1000,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return getResponseErrorMessage(error, true);
  }
);

export { instanceAxios, instanceAxiosAuth };
