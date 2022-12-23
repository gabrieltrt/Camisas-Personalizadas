import useSWR, { Fetcher, MutatorCallback } from 'swr';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const baseUrl = 'http://191.184.194.116:8000';
export const storage = baseUrl+'/storage';
const apiUrl = baseUrl+'/api';

axios.defaults.baseURL = apiUrl;

interface DataPayload<T> {
    [key: string]: T
};

interface ApiReturn<T> {
    data: T,
    loading: boolean,
    error: any,
    mutate: any
};

export const useApi = <T>(url: string, payload?: AxiosRequestConfig | undefined): ApiReturn<T> => {
    const fetcher = async (url: string) => (await axios(url, payload)).data;

    const { data, error, mutate } = useSWR(url, fetcher);
    
    return {
        data,
        loading: !data && !error,
        error,
        mutate
    };
};

const api = axios;

export default api;