import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getUserFromLocalStorage = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const login = createAsyncThunk('auth/admin-login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrderByUser = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "success"
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.user = null
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "success"
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.user = null
            })
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "success"
                state.userOrders = action.payload
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.user = null
            })
    }
})


export default authSlice.reducer;
