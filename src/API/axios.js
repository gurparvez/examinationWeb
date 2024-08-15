import axios from 'axios';
import { root } from '../constants/index.js';

const axiosInstance = axios.create({
    baseURL: root,
    withCredentials: true,
});

export default axiosInstance;
