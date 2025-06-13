import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useSnackbar } from 'notistack';
import { ApiError } from '../types/api';

// Create a custom Axios instance with proper configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  validateStatus: (status) => status >= 200 && status < 300, // Only accept 2xx status codes
});

// Request interceptor with proper typing
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor with proper error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const { enqueueSnackbar } = useSnackbar();

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          enqueueSnackbar('Unauthorized access. Please login.', {
            variant: 'error',
          });
          // Handle auth error (e.g., redirect to login)
          break;
        case 403:
          enqueueSnackbar(
            'You do not have permission to perform this action.',
            { variant: 'error' },
          );
          break;
        case 404:
          enqueueSnackbar('The requested resource was not found.', {
            variant: 'error',
          });
          break;
        case 500:
          enqueueSnackbar(
            'An unexpected error occurred. Please try again later.',
            { variant: 'error' },
          );
          break;
        default:
          enqueueSnackbar(data?.message || 'An error occurred', {
            variant: 'error',
          });
      }
    } else if (error.request) {
      enqueueSnackbar(
        'No response received from server. Please check your connection.',
        { variant: 'error' },
      );
    } else {
      enqueueSnackbar('An error occurred while setting up the request.', {
        variant: 'error',
      });
    }

    return Promise.reject(error);
  },
);

// Generic API function with proper typing
export const api = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    // Error is already handled by the interceptor
    throw error;
  }
};

export default axiosInstance;
