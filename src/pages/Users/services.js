import httpClient from '../../api/http';

// export const getAllUsers = (next = 0) => httpClient(`/admin/users?from=&&to=${next > 0 ? next : ""}&&limit=100`);
export const getAllUsers = (next = 0) => httpClient(`/admin/users?cursor=${next > 0 ? next : ""}&&limit=100`);
export const getUserById = (user_ids) => httpClient(`/admin/users?user_ids=${!!user_ids ? user_ids : ""}`);
export const getUserByEmail = (emails) => httpClient(`/admin/users?emails=${!!emails ? emails : ""}`);
export const updateUser = (user_id, data) => httpClient(`/admin/users/${user_id}`, { method: "PUT", data });
export const getUserAccounts = (user_id) => httpClient(`/admin/users/accounts/${user_id}`);
export const updateSpecificAccount = (account_id, data) => httpClient(`/admin/accounts/${account_id}`, { method: "PUT", data });

export const assignusertags = (user_id, data) =>
    httpClient(`/admin/users/${user_id}`, { method: "PUT", data });