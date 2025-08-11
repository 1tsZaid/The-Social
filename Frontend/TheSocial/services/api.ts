import axios from 'axios';
import { API_CONFIG } from '../constants/Api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export default api;
