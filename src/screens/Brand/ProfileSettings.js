import React, {  useState } from 'react';
 
import { ToastMessage } from '../../components/common/ToastMessage';
import httpCommon from "../../http-common"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ProfileSettings(props) {
    // const[userDetail,setUserDetail]=useState({});
    const param = useParams()

    const [file1, setFile1] = useState("")
    const [file2, setFile2] = useState("")
    const [file3, setFile3] = useState("")

    const [loading,setLoading]=useState(false);
    const [loadingUpload,setLoadingUpload]=useState(0);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file1") {
                setFile1(e.target.files[0]);
            }
            if (e.target.name === "file2") {
                setFile2(e.target.files[0]);
            }
            if (e.target.name === "file3") {
                setFile3(e.target.files[0]);
            }
        }
    };
    
    

    const updateProfile = async (userDetail) => {
         
        try {
            setLoading(true);
            let response = await httpCommon.patch(`/updateBrandBy/${param?.id}`, userDetail);
            let { data } = response;
            
            props.setRandomValue(data);
            setLoading(false);
            ToastMessage(data)
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleSave=()=>{
        let {brandName,email,contact,address,aboutUs,gstNo,password}=props?.user;
        let obj={brandName:brandName,email:email,contact:contact,address:address,aboutUs:aboutUs,gstNo:gstNo,password:password};
        updateProfile(obj);
        
    }

    const uploadGstDocument=async(val)=>{
        
        const formData=new FormData();
        formData.append("file",file1);
       try{
        setLoadingUpload(val)
        let response= await httpCommon.patch(`/updateBrandGstDocumentBy/${param?.id}`,formData);
        let { data } = response;
        setFile1("")
        setLoadingUpload(0)
        let x = Math.floor((Math.random() * 10) + 1);
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
        setLoadingUpload(0)
       }
    }
    const uploadBrandLogo=async(val)=>{
        
        const formData=new FormData();
        formData.append("file",file2);
       try{
        setLoadingUpload(val);
        let response= await httpCommon.patch(`/updateBrandLogoBy/${param?.id}`,formData);
        let { data } = response;
        setFile2("")
        setLoadingUpload(0)
        let x = Math.floor((Math.random() * 10) + 1);
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
        setLoadingUpload(0)
       }
    }
    const uploadBrandBanner=async(val)=>{
         
        const formData=new FormData();
        formData.append("file",file3);
       try{
        setLoadingUpload(val)
        let response= await httpCommon.patch(`/updateBrandBannerBy/${param?.id}`,formData);
        let { data } = response;
        setFile3("")
        setLoadingUpload(0)
        let x = Math.floor((Math.random() * 10) + 1);
        props.setRandomValue(x);
        ToastMessage(data);
       }catch(err){
        console.log(err);
        setLoadingUpload(0)
       }
    }

    let {brandName,email,contact,address,aboutUs,gstNo,password}=props?.user;
     

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
                        <label className="form-label">Password <span className="text-danger">*</span></label>
                        <div className="input-group">
                            
                            <input type="text" className="form-control" name='password' value={password} onChange={props.onChange} />
                            
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
                    <div className="col-12">
                        <div className="form-group">
                            <label className="form-label">About Us</label>
                            <textarea className="form-control" aria-label="With textarea" name='aboutUs' value={aboutUs} onChange={props.onChange}>
                            </textarea>
                            <div className='text-danger'>
                                {/* {errors.address?.message} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="button" disabled={loading} className="btn btn-primary text-uppercase px-5" onClick={handleSave} >{loading ? "Saving..." : "SAVE"}</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mt-3 mb-1">
                            <label className="form-label">Upload GST Document</label>
                            <input type="file" name="file1" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-3 col-sm-12">
                        <button type="button" disabled={loadingUpload===1 || !file1 ? true : false} className="btn btn-primary text-uppercase px-5" onClick={(e)=>
                            uploadGstDocument(1)
                        }
                            >{loadingUpload===1 ? "Uploading..." : "Upload"}</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="mt-2 mb-1">
                            <label className="form-label">Upload Brand Logo</label>
                            <input type="file" name="file2" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-3 col-sm-12">
                        <button type="button" disabled={loadingUpload===2 || !file2 ? true : false} className="btn btn-primary text-uppercase px-5"   onClick={(e)=>
                            uploadBrandLogo(2)
                            }>{loadingUpload===2 ? "Uploading..." : "Upload"}</button>
                    </div>
                    <div className="col-md-6 col-sm-12 ">
                        <div className="mt-2 mb-1">
                            <label className="form-label">Upload Brand Banner</label>
                            <input type="file" name="file3" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                            // {...register('gstDocument')}

                            />
                            
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 pt-3 col-sm-12">
                        <button type="button" disabled={loadingUpload===3 || !file3 ? true : false} className="btn btn-primary text-uppercase px-5"  onClick={(e)=>
                            uploadBrandBanner(3)} >{loadingUpload===3 ? "Uploading..." : "Upload"}</button>
                    </div>

                     
                </form>
            </div>
        </div>
    )
}
export default ProfileSettings;