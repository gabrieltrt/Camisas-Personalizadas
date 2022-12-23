import useSWR from 'swr';
import axios from 'axios';

const baseUrl = "http://localhost:8000";
export const storage = baseUrl+"/storage";
axios.defaults.baseURL = baseUrl+'/api';
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const api = axios;

export const useApi = (url, payload = null, options = null) => {
  const fetcher = async (url) => (await axios(url, payload)).data;
  const { data, error, mutate } = useSWR(url, fetcher, options ? options : undefined);

  return {
    data,
    error,
    loading: !data && !error,
    mutate
  };
};