import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosClient;

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const msg = error?.response?.data?.error || error?.response?.data?.message || error?.message || '';
        const isTokenError =
            status === 401 ||
            /token\s*invalido/i.test(msg) ||
            /token\s*expirado/i.test(msg) ||
            /unauthorized/i.test(msg);

        if (isTokenError) {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } catch { }
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
