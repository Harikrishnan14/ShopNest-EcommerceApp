import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
    return (
        <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center title'>Forgot Password</h3>
                <p className='text-center'>Enter your registered email to get reset password link</p>
                <form action="">
                    <CustomInput type='text' label='Email Address' i_id='email' />
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100' type='submit' style={{ background: "#ffd333" }}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
