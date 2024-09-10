import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.API_BASE_URL;

const apiService: AxiosInstance = axios.create({
  baseURL,
  paramsSerializer: params => JSON.stringify(params),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;
