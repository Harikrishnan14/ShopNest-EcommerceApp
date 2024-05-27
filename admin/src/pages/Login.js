import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let schema = Yup.object({
        email: Yup.string().email("Email should be valid").required("Email is Required"),
        password: Yup.string().required("Password is Required")
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            dispatch(login(values))
            alert(JSON.stringify(values, null, 2));
        },
    });

    const authState = useSelector((state) => state)
    const { user, isLoading, isError, isSuccess, message } = authState.auth

    useEffect(() => {
        if (isSuccess) {
            navigate("admin")
        } else {
            navigate("")
        }
    }, [user, isLoading, isError, isSuccess, message])

    return (
        <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center title'>Login</h3>
                <p className='text-center'>Login to you account to continue</p>
                <div className="error tet-center">
                    {message.message === "Rejected" ? "You are not an Admin" : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' name="email" val={formik.values.email} label='Email Address' i_id='email' onChange={formik.handleChange('email')} />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput type='password' name="password" val={formik.values.password} label='Password' i_id='password' onChange={formik.handleChange('password')} />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className='mb-3 text-end'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' type='submit' style={{ background: "#ffd333" }}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
