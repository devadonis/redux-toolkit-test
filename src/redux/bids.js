import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {PUBLIC_API_URL} from "@src/config";

// Async Thunk
export const fetchBidByNumber = createAsyncThunk(
    'bids/fetchBidByNumber',
    async (bidNumber, thunkAPI) => {
        try {
            const url = `${PUBLIC_API_URL}/api/bids/${bidNumber}`;
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const bidsSlice = createSlice({
    name: "bids",
    initialState: {
        table: [],
        baseCurrency: "USD",
        selectedRows: new Set(),
        bidNumber: 0,
        poNo: 0,
        loading: true,
        itemsLoaded: 0,
        sidebarValues: {},
        isEditable: true,
        calculateValues: {
            type: "franchise",
            percentage: 10,
        },
        error: null
    },
    reducers: {
        setBaseCurrency: (state, action) => {
            state.baseCurrency = action.payload;
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload;
        },
        setTable: (state, action) => {
            state.table = action.payload;
        },
        setSidebarValues: (state, action) => {
            state.sidebarValues = action.payload;
        },
        setItemsLoaded: (state, action) => {
            state.itemsLoaded = action.payload;
        },
        setIsEditable: (state, action) => {
            state.isEditable = action.payload;
        },
        setCalculateValues: (state, action) => {
            console.log(action.payload)
            state.calculateValues = action.payload;
        },
        setBidNumber: (state, action) => {
            state.bidNumber = action.payload;
        },
        setPoNo: (state, action) => {
            state.poNo = action.payload;
        },
        // Add this function to your reducers object
        resetValues: (state) => {
            state.table = [];
            state.baseCurrency = "USD";
            state.selectedRows = new Set();
            state.bidNumber = 0;
            state.poNo = 0;
            state.loading = false;
            state.itemsLoaded = 0;
            state.sidebarValues = {};
            state.isEditable = true;
            state.calculateValues = {
                type: "franchise",
                percentage:10,
            };
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBidByNumber.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBidByNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.isEditable = false;
                state.table = JSON.parse(action.payload.data.BidData);
                state.poNo = action.payload.data.PONo;
                state.sidebarValues = {
                    name: action.payload.data.Rep,
                    currency: {
                        label: action.payload.data.Currency,
                        value: action.payload.data.Currency,
                        id: action.payload.data.CurrencyID,
                        symbol: action.payload.data.Symbol,
                    },
                    terms: {
                        label: action.payload.data.Terms,
                        value: action.payload.data.TermsId,
                    },
                    contact: {
                        label: action.payload.data.Contact,
                        contactNo: action.payload.data.ContactID,
                    },
                    company: { value: action.payload.data.CompanyNo, label: action.payload.data.Company },
                };
                state.calculateValues = {
                    type: action.payload.data.BidType,
                    percentage: action.payload.data.BidPercentage,
                };
            })
            .addCase(fetchBidByNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export const {
    setBaseCurrency,
    setSelectedRows,
    setTable,
    setSidebarValues,
    setItemsLoaded,
    setIsEditable,
    setCalculateValues,
    setBidNumber,
    setPoNo,
    resetValues
} = bidsSlice.actions;

export default bidsSlice.reducer;
