import httpClient from '../../api/httpClient';

export const logIn = (data) => httpClient('/users/sign_in', { method: "POST", data }, 'https://uat.alpha5.io/api/v1');
