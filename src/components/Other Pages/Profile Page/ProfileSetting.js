import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastMessage } from '../../common/ToastMessage';
import httpCommon from "../../../http-common";

function ProfileSetting(props) {
    const[userDetail,setUserDetail]=useState({});
    const [gstView, setGstView] = useState(false)
    const [file, setFile] = useState("")
    const history = useHistory()

    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
    };
    
    useEffect(()=>{
        setUserDetail(props?.user);
    },[])

   

    const updateProfile = async (userDetail) => {
        const user=localStorage.getItem("user")
        const obj=JSON.parse(user);
        try {
            let response = await httpCommon.patch(`/updateBrandBy/${obj?._id}`, userDetail);
            let { data } = response;
            let x = Math.random() * 10;
            props.setRandomValue(x);
            ToastMessage(data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleSave=()=>{
        let {brandName,email,contact,address,gstNo}=props?.user;
        let obj={brandName:brandName,email:email,contact:contact,address:address,gstNo:gstNo};
        updateProfile(obj);
        
    }

    const uploadGstDocument=async()=>{
        const user=localStorage.getItem("user")
        const obj=JSON.parse(user);
        const formData=new FormData();
        formData.append("file",file);
       try{
        let response= await httpCommon.patch(`/updateBrandGstDocumentBy/${obj?._id}`,formData);
        let { data } = response;
        setFile("")
        let x = Math.random() * 10;
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
       }
    }
    const uploadBrandLogo=async()=>{
        const user=localStorage.getItem("user")
        const obj=JSON.parse(user);
        const formData=new FormData();
        formData.append("file",file);
       try{
        let response= await httpCommon.patch(`/updateBrandLogoBy/${obj?._id}`,formData);
        let { data } = response;
        setFile("")
        let x = Math.random() * 10;
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
       }
    }
    const uploadBrandBanner=async()=>{
        const user=localStorage.getItem("user")
        const obj=JSON.parse(user);
        const formData=new FormData();
        formData.append("file",file);
       try{
        let response= await httpCommon.patch(`/updateBrandBannerBy/${obj?._id}`,formData);
        let { data } = response;
        setFile("")
        let x = Math.random() * 10;
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
       }
    }

    let {brandName,email,contact,address,gstNo}=props?.user;

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
                            <input className="form-control" type="text" name='brandName' value={brandName} onChange={(e)=>props?.onChange(e)}

                             />
                             <div className='text-danger'>
                                 {/* {errors.name?.message} */}
                             </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="form-label">Contact Number <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" name='contact' value={contact} onChange={props.onChange}
                             />
                             <div className='text-danger'>
                                 {/* {errors.contact?.message} */}
                             </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <textarea className="form-control" aria-label="With textarea" name='address' value={address} onChange={props.onChange}>
                            </textarea>
                            <div className='text-danger'>
                                {/* {errors.address?.message} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <label className="form-label">Email <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <span className="input-group-text">@</span>
                            <input type="text" className="form-control" name='email' value={email} onChange={props.onChange} />
                            
                        </div>
                        <div className='text-danger'>
                                 {/* {errors.email?.message} */}
                             </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">GST No.</label>
                            <input type="text" className="form-control" placeholder="GST No." name='gstNo' value={gstNo} onChange={props.onChange}></input>
                            <div className='text-danger'>
                                {/* {errors.gstNo?.message} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="button" className="btn btn-primary text-uppercase px-5" onClick={handleSave} >SAVE</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload GST Document</label>
                            <input type="file" name="file" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5" onClick={uploadGstDocument}  >Upload</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload Brand Logo</label>
                            <input type="file" name="file" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5"   onClick={uploadBrandLogo}>Upload</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-1">
                            <label className="form-label">Upload Brand Banner</label>
                            <input type="file" name="file" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-2 col-sm-12">
                        <button type="button" className="btn btn-primary text-uppercase px-5"  onClick={uploadBrandBanner} >Upload</button>
                    </div>

                     
                </form>
            </div>
        </div>
    )
}
export default ProfileSetting;