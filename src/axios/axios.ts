import axios from 'axios';
import { LOGIN_USER_URL } from '../utils/urls';

const baseURL = 'https://quiz.1kb.uz/api/';

export const nonTokenInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
});

export const withTokenInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

withTokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && localStorage.getItem('tokens')) {
      const authData = JSON.parse(localStorage.getItem('tokens') as string);
      console.log(authData);
      const payload = {
        token: authData?.access_token,
        refreshToken: authData?.refresh_token,
      };
      let apiResponse = await axios.post(baseURL + LOGIN_USER_URL, payload);
      authData.access_token = apiResponse.data.token;
      localStorage.setItem('tokens', JSON.stringify(authData));
      error.config.headers[
        'Authorization'
      ] = `Bearer ${apiResponse.data.token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

withTokenInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('tokens')) {
    const authData = JSON.parse(localStorage.getItem('tokens') as string);
    config.headers['Authorization'] = `Bearer ${authData.access_token}`;
  }
  return config;
});
