import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import { StockData } from '../interfaces/StockData';
import { useDispatch } from 'react-redux';

const API_URL = 'http://localhost:5000/api';

interface StockState {
    symbols: string[];
    data: { [key: string]: StockData[] };
}

const initialState: StockState = {
    symbols: ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple'],
    data: {},
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setStockData(
            state,
            action: PayloadAction<{ symbol: string; data: StockData[] }>
        ) {
            state.data[action.payload.symbol] = action.payload.data;
        },
    },
});

export const { setStockData } = stockSlice.actions;

export type AppThunk = ThunkAction<void, StockState, unknown, Action<string>>;

export const fetchStockData =
    (symbols: string[]): AppThunk =>
    async (dispatch) => {
        try {
            for (const symbol of symbols) {
                const response = await axios.get(`${API_URL}/data/${symbol}`);
                dispatch(setStockData({ symbol, data: response.data }));
            }
        } catch (error) {
            console.error('Failed to fetch stock data:', error);
        }
    };

export const store = configureStore({
    reducer: stockSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
