import axios from 'axios';

const api = axios.create({
    baseURL: 'https://budda.pe.kr',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;