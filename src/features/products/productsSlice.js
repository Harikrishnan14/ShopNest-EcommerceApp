import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getAllProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productsService.getProducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAProduct = createAsyncThunk('product/get-product', async (id, thunkAPI) => {
    try {
        return await productsService.getProduct(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishlist = createAsyncThunk('product/wishlist', async (id, thunkAPI) => {
    try {
        return await productsService.addToWishList(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "success"
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = "success"
                state.product = action.payload
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.message = "Product Added To Wishlist"
                state.addToWishlist = action.payload
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})


export default productsSlice.reducer;
