import { React, useEffect, useState } from "react";
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlog, getABlog, resetState, updateABlog } from "../features/blogs/blogSlice";
import { getBlogCategories } from "../features/bCategory/bCategorySlice";

const AddBlog = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [desc, setDesc] = useState()
    const [images, setImages] = useState([]);

    const blogId = location.pathname.split("/")[3]

    useEffect(() => {
        if (blogId !== undefined) {
            dispatch(getABlog(blogId));
            img.push(blogImgs)
        } else {
            dispatch(resetState());
        }
    }, [blogId, dispatch]);

    let schema = yup.object().shape({
        title: yup.string().required("Title is Required"),
        description: yup.string().required("Description is Required"),
        category: yup.string().required("Category is Required"),
    });

    useEffect(() => {
        dispatch(resetState())
        dispatch(getBlogCategories());
    }, []);

    const imgState = useSelector((state) => state.upload.images);
    const brandCatState = useSelector((state) => state.blogCategory.blogCategories)
    const newBlogState = useSelector((state) => state.blog);

    const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName, blogCat, blogDesc, blogImgs } = newBlogState;

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfullly!");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog Updated Successfullly!");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = img;
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCat || "",
            images: blogImgs || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (blogId !== undefined) {
                const data = { id: blogId, blogData: values };
                dispatch(updateABlog(data));
                navigate('/admin/blog-list')
                dispatch(resetState())
            } else {
                dispatch(createBlog(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 1000);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">{blogId !== undefined ? "Edit" : "Add"} Blog</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <CustomInput
                            type="text"
                            label="Enter Blog Title"
                            name="title"
                            onChange={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            value={formik.values.title}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mt-3"
                        id=""
                    >
                        <option value="">Select Blog Category</option>
                        {brandCatState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill
                        className="mt-3"
                        theme="snow"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="bg-white border-1 p-5 text-center mt-3">
                        <Dropzone
                            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap mt-3 gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(deleteImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>{blogId !== undefined ? "Edit" : "Add"} Blog</button>
                </form>
            </div>
        </div >
    )
}

export default AddBlog
