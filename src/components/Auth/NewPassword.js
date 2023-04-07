import React from 'react';
import { Link } from 'react-router-dom';
import Images from '../../assets/images/forgot-password.svg';
import httpCommon from '../../http-common';


function Newpassword() {

    const  forgetPassword = async(obj)=>{
        try{
            let response=await httpCommon.patch("/brandForgetPassword",obj);
            let {data}=response;
        }catch(err){
            console.log(err);
        }
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
                        <input type="password" className="form-control form-control-lg" placeholder="New Password" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-2">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" />
                    </div>
                </div>
                <div className="col-12 text-center mt-4">
                    <Link to={process.env.PUBLIC_URL + '/sign-in'} title="" className="btn btn-lg btn-block btn-light lift text-uppercase">SUBMIT</Link>
                </div>
                <div className="col-12 text-center mt-4">
                    <span className="text-muted"><Link to={process.env.PUBLIC_URL + '/verification'} className="text-secondary">Back to Sign in</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Newpassword;