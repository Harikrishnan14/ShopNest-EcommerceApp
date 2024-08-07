import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getABlogCategory = createAsyncThunk('blogCategory/get-category', async (id, thunkAPI) => {
    try {
        return await blogCategoryService.getBlogCategory(id)
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

export const updateABlogCategory = createAsyncThunk(
    "blogCategory/update-category",
    async (brand, thunkAPI) => {
        try {
            return await blogCategoryService.updateBlogCategory(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteABlogCategory = createAsyncThunk('blogCategory/delete-category', async (id, thunkAPI) => {
    try {
        return await blogCategoryService.deleteBlogCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")

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
            .addCase(getABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
            })
            .addCase(getABlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
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
            .addCase(updateABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCategory = action.payload;
            })
            .addCase(updateABlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCategory = action.payload;
            })
            .addCase(deleteABlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
})


export default blogCategorySlice.reducer;
