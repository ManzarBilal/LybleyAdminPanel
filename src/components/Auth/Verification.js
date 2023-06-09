import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import Images from '../../assets/images/verify.svg';
import OtpInput from 'react-otp-input';
import httpCommon from '../../http-common';
import { useSelector } from 'react-redux';
import { ToastMessage } from '../common/ToastMessage';


function Verification(props) {

    const history = useHistory();

    const brandEmail = useSelector(state => state?.userEmail)
    const [otp, setOtp] = useState('');
    const [loading,setLoading]=useState(false);
    const [loading1,setLoading1]=useState(false);


    const otpVerification = async (obj) => {
        let body = { email: brandEmail?.email, otp: otp }
        try {
            setLoading(true);
            let response = await httpCommon.patch("/brandOtpVerification", body);
            let { data } = response;
            let user=localStorage.getItem("user");
            let user1=JSON.parse(user);
            ToastMessage(data)
            setLoading(false);
            if (data?.status === true && user1?.role!=="ADMIN") {
                history.push(`${props?.url + "/sign-in"}`)
            }
            else if(data?.status === true && user1?.role==="ADMIN") {
                history.push(`${props?.url + "/brand-list"}`);
            }else{
                return null;
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const reSendOtpVerification = async (obj) => {
        let body = { email: brandEmail?.email }
        try {
            setLoading1(true);
            let response = await httpCommon.post("/brandResendOtp", body);
            let { data } = response;
            ToastMessage(data)
            setLoading1(false);
        } catch (err) {
            console.log(err);
            setLoading1(false);
        }
    }

    const handleOtp = () => {
        otpVerification()
    }

    const handleResendOtp=()=>{
        reSendOtpVerification();
    }
    return (
        <div className="w-100 p-3 p-md-5 card border-0 shadow-sm" style={{ maxWidth: '32rem' }}>
            <form className="row g-1 p-3 p-md-4">
                <div className="col-12 text-center mb-5">
                    <img src={Images} className="w240 mb-4" alt="" />
                    <h1>Verification</h1>
                    <span>We sent a verification code to your email. Enter the code from the email in the field below.</span>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{ width: "40px", height: "40px" }}
                        renderSeparator={<span className='p-2' >-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>

                <div className="col-12 text-center mt-4">
                    <div className="btn btn-lg btn-block btn-light lift text-uppercase" onClick={handleOtp}>{loading ? "Verifying..." : "Verify my account"}</div>
                </div>
                <div className="col-12 text-center mt-4">
                    <span>Haven't received it? <div  className="text-secondary" onClick={handleResendOtp}>{loading1 ? "Sending..." : "Resend a new code" }</div></span>
                </div>
            </form>
        </div>
    )
}
export default Verification;