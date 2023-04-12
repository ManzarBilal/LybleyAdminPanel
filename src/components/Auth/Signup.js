import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import httpCommon from '../../http-common';
import { ToastMessage } from '../common/ToastMessage';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../Redux/Actions/userEmail';

function Signup() {

    const [gstView, setGstView] = useState(false)
    const [gstDocument, setGstDocument] = useState("")
    const history = useHistory()

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(' Brand Name is required')
            .min(4, "Brand Name must be at least 4 characters"),
        contact: Yup.string()
            .required('Contact No. is required')
            .min(10, 'Contact No. must be at least 10 characters')
            .max(10, 'Contact No. must not exceed 10 characters'),
        gstNo: Yup.string()
            .required('GST No. is required')
            .min(10, 'GST No. must be at least 10 characters'),
        address: Yup.string()
            .required('address is required')
            .min(10, 'address must be at least 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        // gstDocument: Yup.mixed().test("file", "You need to provide a file", (value) => {
        //     if (value.length > 0) {
        //         return true;
        //     }
        //     return false;
        // }),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        chooseCb: Yup.bool().oneOf([true], 'Please fill the box')
    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "gstDocument") {
                // console.log(e.target.files[0]);
                setGstDocument(e.target.files[0]);
            }
        }
    };

    const signUp = async (obj) => {
        try {
            let body = {
                brandName: obj.name, email: obj.email, contact: +obj.contact, password: obj.password,
                // gstNo:obj.gstNo 
            };
            const formData = new FormData()
            formData.append("gstDocument", gstDocument);
            formData.append("gstNo", obj.gstNo);
            formData.append("brandName", obj.name,)
            formData.append("email", obj.email,)
            formData.append("contact", +obj.contact,)
            formData.append("password", obj.password,)
            console.log(gstDocument, "gstDocument");

            // const fullData={...body ,gstDocument:gstDocument}
            // console.log(fullData,"fullData");
            let response = await httpCommon.post("/brandRegistration", formData);
            let { data } = response;
            ToastMessage(data)
            if (data.status === true) {
                history.push(`${process.env.PUBLIC_URL + "/verification"}`)
            }
            else return null;
        } catch (err) {
            console.log(err);
        }
    }
    const onRegister = data => {
        // console.log("data", gstDocument);
        setGstView(true)
        signUp(data);
        dispatch(userEmail(data?.email))
    }

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 shadow-sm mt-md-5" style={{ maxWidth: '32rem' }}>

                <form className="row g-1 p-3 p-md1-4">
                    <div className="col-12 text-center mt-5 mb1-5">
                        <h1 className='mt-md-5 pt-md-5'>Create your account</h1>
                        {/* <span>Free access to our dashboard.</span> */}
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Brand name</label>
                            <input type="email" className={(errors && errors.name) ? "form-control   border-danger " : "form-control  "} placeholder="Brand name"
                                {...register('name')}

                            />
                            <div className='text-danger'>
                                {errors.name?.message}
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Email address</label>
                            <input type="email" className={(errors && errors.email) ? "form-control  border-danger " : "form-control"} placeholder="name@example.com"
                                {...register('email')}

                            />
                            <div className='text-danger'>
                                {errors.email?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Contact No.</label>
                            <input type="number" className={(errors && errors.contact) ? "form-control border-danger " : "form-control "} placeholder="Contact No."
                                {...register('contact')}

                            />
                            <div className='text-danger'>
                                {errors.contact?.message}
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">GST No.</label>
                            <input type="text" className={(errors && errors.gstNo) ? "form-control   border-danger " : "form-control "} placeholder="GST No."
                                {...register('gstNo')}

                            />
                            <div className='text-danger'>
                                {errors.gstNo?.message}
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Upload GST Document</label>
                            <input type="file" name="gstDocument" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                           { gstView &&  gstDocument==="" ?  <div className='text-danger'>
                                Gst Document is required.
                            </div> :""}

                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Address</label>
                            <input type="text" className={(errors && errors.address) ? "form-control   border-danger " : "form-control "} placeholder="address"
                                {...register('address')}

                            />
                            <div className='text-danger'>
                                {errors.address?.message}
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Password</label>
                            <input type="email" className={(errors && errors.password) ? "form-control  border-danger " : "form-control  "} placeholder="8+ characters required"
                                {...register('password')}

                            />
                            <div className='text-danger'>
                                {errors.password?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Confirm password</label>
                            <input type="email" className={(errors && errors.confirmPassword) ? "form-control  border-danger " : "form-control "} placeholder="8+ characters required"
                                {...register('confirmPassword')}

                            />
                            <div className='text-danger'>
                                {errors.confirmPassword?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input type="checkbox" value="" id="flexCheckDefault"
                                {...register('chooseCb')}
                                className={`form-check-input ${errors.chooseCb ? 'is-invalid' : ''
                                    }`}
                            />

                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I accept the <Link to="#!" title="Terms and Conditions" className="text-secondary">Terms and Conditions</Link>
                            </label>
                            {/* <div className='text-danger'>
                                 {errors.chooseCb?.message}
                             </div> */}
                        </div>
                    </div>
                    <div className="col-12 text-center mt-3">
                        <div type='button' className="btn btn-lg btn-block btn-light lift text-uppercase" onClick={handleSubmit(onRegister)} >SIGN UP</div>
                    </div>
                    <div className="col-12 text-center mt-3">
                        <span>Already have an account? <Link to={process.env.PUBLIC_URL + '/sign-in'} title="Sign in" className="text-secondary">Sign in here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup;