import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ToastMessage } from '../../common/ToastMessage';
import httpCommon from "../../../http-common";

function ProfileSetting() {
  const[user,setUser]=useState([])
   

    useEffect(()=>{
     const userrId=localStorage.getItem("user")
     const obj=JSON.parse(userrId)
     setUser(obj)
    },[])

    const [gstView, setGstView] = useState(false)
    const [file, setFile] = useState("")
    const history = useHistory()

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
                setFile(e.target.files[0]);
            }
        }
    };
  
    
    const UpdateProfile = async (obj) => {
      const id=user?._id;

        try {
            let response = await httpCommon.patch(`/updateBrandBy/${id}`, obj);
            let { data } = response;
            ToastMessage(data)
           
        } catch (err) {
            console.log(err);
        }
    }
    const onUpdate = data => {
        console.log("data", data);
        let obj = { name: data?.name, email: data?.email, contact: data?.contact ,address:data?.address,gstNo:data.gstNo }
        console.log("obj", obj);
    
        // UpdateProfile(obj);
        // dispatch(userEmail(data?.email))
    }

    console.log("user",user);
    return (
        <div className="card mb-3">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Profile Settings</h6>
            </div>
            <div className="card-body">
                <form className="row g-4">


                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="form-label">Company Name <span className="text-danger">*</span></label>
                            <input className={(errors && errors.name) ? "form-control   border-danger " : "form-control "} type="text" 
                            defaultValue={user?.brandName}
                             {...register('name')}

                             />
                             <div className='text-danger'>
                                 {errors.name?.message}
                             </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="form-label">Contact Number <span className="text-danger">*</span></label>
                            <input className={(errors && errors.contact) ? "form-control   border-danger " : "form-control "}type="text" 
                             defaultValue={user?.contact}
                             {...register('contact')}

                             />
                             <div className='text-danger'>
                                 {errors.contact?.message}
                             </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <textarea className={(errors && errors.address) ? "form-control   border-danger " : "form-control "} aria-label="With textarea"
                            defaultValue={user?.address}
                            {...register('address')}></textarea>
                            <div className='text-danger'>
                                {errors.address?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <label className="form-label">Email <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <span className="input-group-text">@</span>
                            <input type="text" className={(errors && errors.email) ? "form-control   border-danger " : "form-control "}
                            defaultValue={user?.email}
                           {...register('email')}

                             />
                            
                        </div>
                        <div className='text-danger'>
                                 {errors.email?.message}
                             </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">GST No.</label>
                            <input type="text" className={(errors && errors.gstNo) ? "form-control   border-danger " : "form-control "} placeholder="GST No."
                               
                               defaultValue={user?.gstNo}
                               {...register('gstNo')}

                            />
                            <div className='text-danger'>
                                {errors.gstNo?.message}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="button" className="btn btn-primary text-uppercase px-5" onClick={handleSubmit(onUpdate)} >SAVE</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload GST Document</label>
                            <input type="file" name="gstDocument" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5"   >Upload</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload Brand Logo</label>
                            <input type="file" name="gstDocument" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5"   >Upload</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload Brand Banner</label>
                            <input type="file" name="gstDocument" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5"   >Upload</button>
                    </div>

                     
                </form>
            </div>
        </div>
    )
}
export default ProfileSetting;