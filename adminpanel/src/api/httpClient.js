import axios from 'axios';
import SecureLS from 'secure-ls';

const defaultOptions = {
    headers: {},
    queryParams: null
};

export const restClient = axios.create();

restClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const err = error.response;
    const ls = new SecureLS();
    if (err.status === 401) {
        ls.remove('token');
        window.history.go('/login');
    }
    return Promise.reject(error);
});

const httpClient = async (url = '', options = defaultOptions, baseUrl = 'https://uat.alpha5.io/api') => {
    const ls = new SecureLS();
    // const baseUrl = ;
    let fullPath = `${baseUrl}${url}`;


    if (options.queryParams) {
        const queryString = JSON.stringify(options.queryParams);
        fullPath = `${fullPath}?${queryString}`;
    }

    const token = ls.get('token');

    if (token) {
        restClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return await restClient({
        url: fullPath,
        method: options.method || 'GET',
        data: options.data
    })
        .then(response => (
            {
                data: response.data,
                errors: response.data.errors || "[No error Found...]",
                error: response.data.error || "No error found",
                message: response.message || (response.status === 200
                    || response.status === 201) ? "Login Successfully" : "",
                status: response.status,
                success: (response.status === 200
                    || response.status === 201)
            }
        ))
        .catch(err => ({
            data: null,
            success: false,
            message: err?.response?.data?.message || err?.message
        })
        );
};

export default httpClient;