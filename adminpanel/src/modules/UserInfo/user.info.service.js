import httpClient from '../../api/httpClient';

export const getAllUsers = () => httpClient(`/admin/users`);
export const getUserById = (user_id) => httpClient(`/admin/users/${user_id}`);
export const getUserByEmail = (email) => httpClient(`/admin/user_by_email/${email}`);
export const updateUser = (user_id, data) => httpClient(`/admin/users/${user_id}`, { method: "PUT", data });
export const getUserAccounts = (user_id) => httpClient(`/admin/users/accounts/${user_id}`);