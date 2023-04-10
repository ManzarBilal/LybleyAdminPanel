import React from 'react';
import { Link } from 'react-router-dom';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ToastMessage } from '../common/ToastMessage';
 

function Signup() {
   
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(' Brand Name is required')
            .min(4, "Brand Name must be at least 4 characters"),
        contact: Yup.string()
            .required('Contact No. is required')
            .min(10, 'Contact No. must be at least 10 characters')
            .max(10, 'Contact No. must not exceed 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        auth:Yup.mixed().test("file", "You need to provide a file", (value) => {
            if (value.length > 0) {  
              return true;
            }
            return false;
            }),
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

    const onRegister = data => {
        console.log("data", data)
        ToastMessage("helllo")
    }

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 shadow-sm" style={{ maxWidth: '32rem' }}>
          
                <form className="row g-1 p-3 p-md1-4">
                    <div className="col-12 text-center mt-5 mb1-5">
                        <h1 className='mt-5'>Create your account</h1>
                        {/* <span>Free access to our dashboard.</span> */}
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Brand name</label>
                            <input type="email" className={(errors && errors.name) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="Brand name"
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
                            <input type="email" className={(errors && errors.email) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="name@example.com"
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
                            <input type="number" className={(errors && errors.contact) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="Contact No."
                                {...register('contact')}

                            />
                            <div className='text-danger'>
                                {errors.contact?.message}
                            </div>
                        </div>

                    </div>
                     
                    <div className="col-12">
                        <div className="mb-1">
                        <label className="form-label">Upload Document</label>
                            <input type="file" id="myfile" className="form-control" name="myfile" 
                             {...register('auth')}

                             />
                             <div className='text-danger'>
                                 {errors.auth?.message}
                             </div>
                             
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-1">
                            <label className="form-label">Password</label>
                            <input type="email" className={(errors && errors.password) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="8+ characters required" 
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
                            <input type="email" className={(errors && errors.confirmPassword) ? "form-control form-control-lg border-danger " : "form-control form-control-lg"} placeholder="8+ characters required" 
                             {...register('confirmPassword')}

                             />
                             <div className='text-danger'>
                                 {errors.confirmPassword?.message}
                             </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input   type="checkbox" value="" id="flexCheckDefault" 
                             {...register('chooseCb')}
                             className={`form-check-input ${
                               errors.chooseCb ? 'is-invalid' : ''
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
                        <div   type='button' className="btn btn-lg btn-block btn-light lift text-uppercase" onClick={ onRegister} >SIGN UP</div>
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