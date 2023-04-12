import React, { useState } from 'react';
import ImageSrc from "../../assets/images/google.svg";
import { Link, useHistory } from 'react-router-dom';
import httpCommon from '../../http-common';
import { ToastMessage } from '../common/ToastMessage';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../Redux/Actions/userEmail';


function SignIn(props) {

    console.log(props,"props");
    const history = useHistory();

    const dispatch =useDispatch()
    const [brandData,setBrandData]=useState({
        email:"",password:"",
    })

    const login = async (obj) => {
        try {
            let response = await httpCommon.post("/brandLogin", obj);
            let { data } = response;
              data && data.user && localStorage.setItem("user",JSON.stringify(data?.user));
            if (data?.user?.status === "ACTIVE") {
                ToastMessage(data);
                if(data?.user?.role==="ADMIN"){
                history.push("/admin/dashboard");
                }else{
                history.push("/brand/dashboard");
                }
            }else if(data?.status===false){
                ToastMessage(data);
            }
            else{
                history.push(`${props?.url+"/verification"}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogin = () => {
        login(brandData)
        dispatch(userEmail(brandData?.email))
    }
    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100 " >
            <div className="w-100 p-3 p-md-5 card border-0 shadow-sm" style={{ maxwidth: "32rem" }}>
                <form className="row g-1 p-3 p-md-4 mt-5">
                    <div className="col-12 text-center mb-0">
                        <h1>Sign  in</h1>
                        {/* <span>Free access to our dashboard.</span> */}
                    </div>
                    <div className="col-12 text-center mb-4">
                        <Link className="btn btn-lg btn-light btn-block" to={props?.url + "/dashboard"}>
                            <span className="d-flex justify-content-center align-items-center">
                                <img className="avatar xs me-2" src={ImageSrc} alt="img Description" />
                                Sign in with Google
                            </span>
                        </Link>
                        <span className="dividers text-muted mt-4">OR</span>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input type="email" onChange={(e)=>setBrandData({...brandData,email:e.target.value})} className="form-control form-control-lg lift" placeholder="name@example.com" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <div className="form-label">
                                <span className="d-flex justify-content-between align-items-center">
                                    Password
                                    <Link className="text-secondary" to={ "/user/reset-password"}>Forgot Password?</Link>
                                </span>
                            </div>
                            <input type="password" onChange={(e)=>setBrandData({...brandData,password:e.target.value})} className="form-control form-control-lg lift" placeholder="***************" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <div type='button' className="btn btn-lg btn-block btn-light lift text-uppercase" onClick={handleLogin}>SIGN IN</div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <span>Don't have an account yet? <Link to={"/user/sign-up"} className="text-secondary">Sign up here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default SignIn;