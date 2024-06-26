import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryService from "./bCategoryService";

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getBlogCategories = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
    try {
        return await blogCategoryService.getBlogCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlogCategory = createAsyncThunk(
    "blogCategory/create-category",
    async (categoryData, thunkAPI) => {
        try {
            return await blogCategoryService.createBlogCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const blogCategorySlice = createSlice({
    name: "blogCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.blogCategories = action.payload
            })
            .addCase(getBlogCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdBlogCategory = action.payload
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})


export default blogCategorySlice.reducer;
