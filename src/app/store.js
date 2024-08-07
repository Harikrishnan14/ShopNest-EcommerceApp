import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from '../features/products/productsSlice'
import blogReducer from "../features/blogs/blogsSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducer
    }
})