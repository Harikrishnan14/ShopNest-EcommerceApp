import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
    try {
        return await blogService.getBlogs()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getABlog = createAsyncThunk('blog/get-blog', async (id, thunkAPI) => {
    try {
        return await blogService.getBlog(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (blogData, thunkAPI) => {
        try {
            return await blogService.createBlog(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateABlog = createAsyncThunk(
    "blog/update-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.updateBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteABlog = createAsyncThunk('blog/delete-blog', async (id, thunkAPI) => {
    try {
        return await blogService.deleteBlog(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.blogs = action.payload
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createdBlog = action.payload
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.blogName = action.payload.title
                state.blogCat = action.payload.category
                state.blogDesc = action.payload.description
                state.blogImgs = action.payload.images
            })
            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(updateABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            })
            .addCase(updateABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    }
})


export default blogSlice.reducer;
