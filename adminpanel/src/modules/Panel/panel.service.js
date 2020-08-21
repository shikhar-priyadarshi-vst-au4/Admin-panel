import httpClient from '../../api/httpClient';

export const getAllAssets = () => httpClient("/admin/assets");
export const getAllContracts = () => httpClient("/admin/contracts");
export const getAllSpots = () => httpClient("/admin/spots");

export const getSpot = (symbol) => httpClient(`/admin/spots/${symbol}`);
export const getContract = (symbol) => httpClient(`/admin/contracts/${symbol}`);

export const deleteAsset = (symbol) => httpClient(`/admin/assets/${symbol}`, { method: "DELETE" });
export const deleteContract = (symbol) => httpClient(`/admin/contracts/${symbol}`, { method: "DELETE" });
export const deleteSpot = (symbol) => httpClient(`/admin/spots/${symbol}`, { method: "DELETE" });

export const createAsset = (data) => httpClient(`/admin/assets`, { method: "POST", data });
export const createContract = (data) => httpClient(`/admin/contracts`, { method: "POST", data });
export const createSpot = (data) => httpClient(`/admin/spots`, { method: "POST", data });

export const updateAsset = (data) => httpClient(`/admin/assets`, { method: "PUT", data });
export const updateContract = (data, symbol) => httpClient(`/admin/contracts/${symbol}`, { method: "PUT", data });
export const updateSpot = (data, symbol) => httpClient(`/admin/spots/${symbol}`, { method: "PUT", data });
