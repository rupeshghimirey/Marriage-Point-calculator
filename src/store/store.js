import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import MarriageSlice from '../features/MarriageSlice';

const rootReducer = combineReducers({
    MarriageSlice
})

const store = configureStore({
    reducer :rootReducer
})

export default store;
