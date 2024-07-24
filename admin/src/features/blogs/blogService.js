import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { config } from "../../utils/axiosConfig";


const getBlogs = async () => {
    const response = await axios.get(`${baseURL}blog/`);
    return response.data;
}

const createBlog = async (blog) => {
    const response = await axios.post(`${baseURL}blog/`, blog, config);
    return response.data;
};

const getBlog = async (id) => {
    const response = await axios.get(`${baseURL}blog/${id}`, config);
    return response.data;
};

const updateBlog = async (blog) => {
    const response = await axios.put(`${baseURL}blog/${blog.id}`, {
        title: blog.blogData.title,
        category: blog.blogData.category,
        description: blog.blogData.description,
        images: blog.blogData.images,
    }, config);
    return response.data;
};

const deleteBlog = async (id) => {
    const response = await axios.delete(`${baseURL}blog/${id}`, config);
    return response.data;
};



const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}


export default blogService;
