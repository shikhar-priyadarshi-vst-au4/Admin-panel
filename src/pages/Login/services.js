import httpClient from '../../api/http';

export const logIn = (data) => httpClient('/users/sign_in', { method: "POST", data }, `${process.env.REACT_APP_API_BASE_URL}/v1`);