import { createSlice } from "@reduxjs/toolkit";
// import SecureLS from "secure-ls";
import {
    getAllAssets, getAllContracts, getAllSpots, getContract, getSpot,
    createContract, createAsset, createSpot, deleteContract, deleteAsset,
    deleteSpot,
    updateAsset,
    updateSpot,
    updateContract
} from './panel.service';

export const panelSlice = createSlice({
    name: "panel",
    initialState: {
        assets: [],
        contracts: [],
        spots: [],
        assetSymbol: "",
        contractSymbol: "",
        spotSymbol: "",
        asset: {},
        contract: {},
        spot: {},
        success: false,
        createdStatus: false,
        updatedStatus: false,
        deletedStatus: false
    },
    reducers: {
        getAssets: (state, action) => {
            state.assets = action.payload;
        },
        getContracts: (state, action) => {
            state.contracts = action.payload;
        },
        getSpots: (state, action) => {
            state.spots = action.payload;
        },
        fetchAsset: (state, action) => {
            state.asset = state.assets.find(v => v.name === action.payload);
            state.assetSymbol = action.payload;
        },
        fetchContract: (state, action) => {
            state.contract = action.payload.data;
            state.contractSymbol = action.payload.symbol;
        },
        fetchSpot: (state, action) => {
            state.spot = action.payload.data;
            state.spotSymbol = action.payload.symbol;
        },
        created: (state, action) => {
            state.createdStatus = !state.createdStatus;
            state.createsuccess = true;
        },
        updated: (state, action) => {
            state.updatedStatus = !state.updatedStatus;
            state.updatesuccess = true;
        },
        deleted: (state, action) => {
            state.deletedStatus = !state.deletedStatus;
            state.deletesuccess = true;
        },
        resetFlags: (state, action) => {
            state.createdStatus = false;
            state.updatedStatus = false;
            state.deletedStatus = false;
        },
        reset: (state, action) => {
            state.assets = [];
            state.contracts = [];
            state.spots = [];
            state.asset = "";
            state.contract = "";
            state.spot = "";
            state.createdStatus = false;
            state.updatedStatus = false;
            state.deletedStatus = false;
        }
    }
});

export const {
    getAssets,
    getContracts,
    getSpots,
    fetchAsset,
    fetchContract,
    fetchSpot,
    created,
    updated,
    deleted,
    resetFlags,
    reset } = panelSlice.actions;


// data: Array(3)
// 0: {id: "71baac3b-ab84-4c2c-94fa-2a1554efc600", name: "USDT", precision: 1, symbol: "USDT"}
// 1: {id: "b8c6d0a6-423a-4ff2-8559-f6649b5257a0", name: "BTC", precision: 1, symbol: "BTC"}
// 2: {id: "f04d0935-3c71-4db4-88db-959821c21c0f", name: "Ethereum", precision: 1, symbol: "ETH"}
// length: 3
// __proto__: Array(0)
// error: "No error found"
// errors: "[No error Found...]"
// message: "Login Successfully"
// status: 200
// success: true

export const Assets = () => {
    return async dispatch => {
        try {
            let response = await getAllAssets();
            let { data, status, success } = response;
            if (status === 200 && success) {
                dispatch(getAssets(data))
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}


export const Contracts = () => {
    return async dispatch => {
        try {
            let response = await getAllContracts();
            let { data, status, success } = response;
            if (status === 200 && success) {
                dispatch(getContracts(data))
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const Spots = () => {
    return async dispatch => {
        try {
            let response = await getAllSpots();
            let { data, status, success } = response;
            if (status === 200 && success) {
                dispatch(getSpots(data))
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const Asset = (symbol) => {
    return dispatch => {
        dispatch(fetchAsset(symbol))
    }
}

export const Contract = (symbol) => {
    return async dispatch => {
        try {
            let response = await getContract(symbol);
            let { data, status, success } = response;
            console.log(response);
            if (status === 200 && success) {
                dispatch(fetchContract({ symbol, data }))
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const Spot = (symbol) => {
    return async dispatch => {
        try {
            let response = await getSpot(symbol);
            let { data, status, success } = response;
            console.log(response);
            if (status === 200 && success) {
                dispatch(fetchSpot({ symbol, data }))
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const createNewContract = (payload) => {
    return async dispatch => {
        try {
            let response = await createContract(payload);
            let { data, status, success } = response;
            console.log("response", response);
            if (status === 200 && success) {
                dispatch(created())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const createNewAsset = (payload) => {
    return async dispatch => {
        try {
            let response = await createAsset(payload);
            let { data, status, success } = response;
            console.log("response", response);
            if (status === 200 && success) {
                dispatch(created())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const createNewSpot = (payload) => {
    return async dispatch => {
        try {
            let response = await createSpot(payload);
            let { data, status, success } = response;
            console.log("response", response);
            if (status === 200 && success) {
                dispatch(created())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const UpdateContract = (payload, symbol) => {
    return async dispatch => {
        try {
            let response = await updateContract(payload, symbol);
            console.log("updateContract", response);
            if (response.status === 200 && response.success) {
                dispatch(updated());
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const UpdateAsset = (payload) => {
    return async dispatch => {
        try {
            let response = await updateAsset(payload);
            console.log("updateAsset", response);
            if (response.status === 200 && response.success) {
                dispatch(updated())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const UpdateSpot = (payload, symbol) => {
    return async dispatch => {
        try {
            let response = await updateSpot(payload, symbol);
            console.log("updateSpot", response);
            if (response.status === 200 && response.success) {
                dispatch(updated())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const removeContract = (symbol) => {
    return async dispatch => {
        try {
            const response = await deleteContract(symbol);
            let { data, status, success } = response;
            console.log(response);
            if (status === 200 && success) {
                dispatch(deleted())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const removeAsset = (symbol) => {
    return async dispatch => {
        try {
            const response = await deleteAsset(symbol);
            let { data, status, success } = response;
            console.log(response);
            if (status === 200 && success) {
                dispatch(deleted())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const removeSpot = (symbol) => {
    return async dispatch => {
        try {
            const response = await deleteSpot(symbol);
            let { data, status, success } = response;
            console.log(response);
            if (status === 200 && success) {
                dispatch(deleted())
            }
        }
        catch (error) {
            dispatch(reset());
        }
    }
}

export const restoreFlags = () => {
    return dispatch => {
        dispatch(resetFlags())
    }
}


export const panel = (state) => state.panel;
