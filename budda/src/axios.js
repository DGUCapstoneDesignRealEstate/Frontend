import axios from 'axios';

const api = axios.create({
    baseURL: 'http://52.79.44.246:8080',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;