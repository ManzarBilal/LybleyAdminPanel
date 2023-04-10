import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Images from '../../assets/images/forgot-password.svg';
import httpCommon from '../../http-common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ToastMessage } from '../common/ToastMessage';
 

function Newpassword() {
const history=useHistory()
 const userEmail=useSelector(state=>state?.userEmail)

    const forgetPassword = async (obj) => {
        try {
            let response = await httpCommon.patch("/brandForgetPassword", {email:userEmail?.email,password:obj?.password});
            let { data } = response;
            ToastMessage(data)
            if(data?.status===true){
                history.push(`${process.env.PUBLIC_URL + "/sign-in"}`)
            }
            else{
                return null;
            }

        } catch (err) {
            console.log(err);
        }
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });
    const {
        register,
         
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handlePassword=data=>{
        forgetPassword(data)
    }
    return (
        <div className="w-100 p-3 p-md-5 card border-0 shadow-sm" style={{ maxWidth: '32rem' }}>
            <form className="row g-1 p-3 p-md-4">
                <div className="col-12 text-center mb-5">
                    <img src={Images} className="w240 mb-4" alt="" />
                    <h1>New password?</h1>
                    <span>Enter the new password and confirm password to reset your password.</span>
                </div>
                <div className="col-12">
                    <div className="mb-2">
                        <label className="form-label">New Password</label>
                        <input type="password" className={(errors && errors.password) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="New Password" 
                          {...register('password')}

                          />
                          <div className='text-danger'>
                              {errors.password?.message}
                          </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-2">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className={(errors && errors.confirmPassword) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="Confirm Password"  
                             {...register('confirmPassword')}

                             />
                             <div className='text-danger'>
                                 {errors.confirmPassword?.message}
                             </div>
                    </div>
                </div>
                <div className="col-12 text-center mt-4">
                    <div   onClick={handleSubmit(handlePassword)} className="btn btn-lg btn-block btn-light lift text-uppercase">SUBMIT</div>
                </div>
                <div className="col-12 text-center mt-4">
                    <span className="text-muted"><Link to={process.env.PUBLIC_URL + '/sign-in'} className="text-secondary">Back to Sign in</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Newpassword;