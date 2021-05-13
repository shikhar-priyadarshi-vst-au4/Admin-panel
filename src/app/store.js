import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import rootReducer from './reducers';


const middleware = [...getDefaultMiddleware().concat(logger)];

const store = configureStore({
    reducer: rootReducer,
    middleware
});

export default store;