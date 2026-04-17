import axios from 'axios';
import { Constant } from '@constants';
import { attachRequestInterceptor, attachResponseInterceptor } from './interceptors';

// No default Content-Type: axios 1.x auto-sets `application/json` for plain
// objects and `multipart/form-data; boundary=...` for FormData, which is what
// we want. Forcing a default would break FormData requests.
export const apiClient = axios.create({
  baseURL: Constant.BASE_URL,
  timeout: 10_000,
});

attachRequestInterceptor(apiClient);
attachResponseInterceptor(apiClient);
