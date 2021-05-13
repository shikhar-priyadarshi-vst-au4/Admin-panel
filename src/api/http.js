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
    if (err.status > 499 && err.status < 600) {
        ls.remove('token');
        window.location.href = "/";
    }
    return Promise.reject(error);
});

const httpClient = async (url = '', options = defaultOptions, baseUrl = process.env.REACT_APP_API_BASE_URL) => {
    const ls = new SecureLS();
    let fullPath = `${baseUrl}${url}`;


    if (options.queryParams) {
        const queryString = JSON.stringify(options.queryParams);
        fullPath = `${fullPath}?${queryString}`;
    }

    const token = ls.get('token');

    
    restClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    

    return await restClient({
        url: fullPath,
        method: options.method || 'GET',
        data: options.data,
        headers: options?.headers
    })
        .then(response => (
            {
                data: response.data,
                errors: response.data.errors || "[No error Found...]",
                error: response.data.error || "No error found",
                message: response.message || (response.status === 200
                    || response.status === 201) ? "success" : "",
                status: response.status,
                success: (response.status === 200
                    || response.status === 201),
                headers: response.headers,
                // config: response.config
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