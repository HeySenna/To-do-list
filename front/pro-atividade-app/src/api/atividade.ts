import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5097/',
});

export default api;