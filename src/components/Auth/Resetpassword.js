import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Images from '../../assets/images/forgot-password.svg';
import httpCommon from '../../http-common';
import { ToastMessage } from '../common/ToastMessage';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../Redux/Actions/userEmail';


function Resetpassword(props) {

    const history = useHistory()
   const dispatch=useDispatch()

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState('');
    const [viewOtp, setViewOtp] = useState(false)
    const sendOTP = async () => {
       dispatch(userEmail(email))
        try {
            let response = await httpCommon.post("/brandResendOtp", { email: email });
            let { data } = response;
            setViewOtp(data?.status);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const otpVerification = async (obj) => {
        let body = { email:email, otp: otp }
        try {
            let response = await httpCommon.patch("/brandOtpVerification", body);
            let { data } = response;
            ToastMessage(data)
            if (data?.status === true) {
                history.push(`${props?.url + "/new-password"}`)
            }
            else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit=()=>{
        viewOtp===false ? sendOTP() : otpVerification();
    }

    return (
        <div className="w-100 p-3 p-md-5 card border-0 shadow-sm" style={{ maxWidth: '32rem' }}>
            <form className="row g-1 p-3 p-md-4">
                <div className="col-12 text-center mb-5">
                    <img src={Images} className="w240 mb-4" alt="" />
                    <h1>Forgot password?</h1>
                    <span>Enter the email address you used when you joined and we'll send you instructions to reset your password.</span>
                </div>
                {viewOtp === false ? <div className="col-12">
                    <div className="mb-2">
                        <label className="form-label">Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                    </div>
                </div>
                    :
                    <div className="col-12 d-flex justify-content-center">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle={{ width: "40px", height: "40px" }}
                            renderSeparator={<span className='p-2' >-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                }

                <div className="col-12 text-center mt-4">
                    <div onClick={handleSubmit} className="btn btn-lg btn-block btn-light lift text-uppercase">SUBMIT</div>
                </div>
                <div className="col-12 text-center mt-4">
                    <span className="text-muted"><Link to={props?.url + '/sign-in'} className="text-secondary">Back to Sign in</Link></span>
                </div>

            </form>
        </div>
    )
}

export default Resetpassword;