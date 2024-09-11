import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.API_BASE_URL;
const accessToken = process.env.API_ACCESS_TOKEN;

const apiService: AxiosInstance = axios.create({
  baseURL,
  paramsSerializer: params => JSON.stringify(params),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export default apiService;
