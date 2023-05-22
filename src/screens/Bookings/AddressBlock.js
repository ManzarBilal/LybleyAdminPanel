import React, { useEffect, useState } from 'react';
import httpCommon from "../../http-common"
import { useParams } from 'react-router-dom';


function AddressBlock(finalData) {
    const [status,setStatus]=useState("");
    const [rand,setRand]=useState("");
    const params=useParams();
    const {id}=params;
    const updateStatus=async()=>{
        try{
         let response=await httpCommon.post("/createTechnicianStatus",{orderId:finalData?.finalData?._id,status:status});
         let {data}=response;
         let x = Math.floor((Math.random() * 10) + 1);
         setRand(x)
        }catch(err){
          console.log(err);
        }
    }

    const getStatus=async()=>{
        try{
         let response=await httpCommon.get(`/getTechnicianStatus/${id}`);
         let {data}=response;
         setStatus(data);
        }catch(err){
          console.log(err);
        }
    }
    
    useEffect(()=>{
        getStatus(); 
    },[rand,id]);

    return (
        <>

            <div className="col">
                <div className="card">
                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                        <h6 className="mb-0 fw-bold "> Delivery Address</h6>
                        {/* <a href="#!" className="text-muted">Edit</a> */}
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">Address:</label>
                                <span><strong>{finalData?.finalData?.address}</strong></span>
                            </div>
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">Address2:</label>
                                <span><strong>{finalData?.finalData?.address2}</strong></span>
                            </div>
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">City:</label>
                                <span><strong>{finalData?.finalData?.city}</strong></span>
                            </div>
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">State:</label>
                                <span><strong>{finalData?.finalData?.state}</strong></span>
                            </div>
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">Pincode:</label>
                                <span><strong>{finalData?.finalData?.pin}</strong></span>
                            </div>
                            <div className="col-12">
                                <label className="form-label col-6 col-sm-5">Phone:</label>
                                <span><strong>{finalData?.finalData?.contact}</strong></span>
                            </div> 
                            <hr/>
                            <div className="col-12 mt-2">
                               <div class="d-flex align-items-center"> <h2 className="form-label col-6 col-sm-5 ">Status:</h2> <h5 className='bg-secondary border-2 rounded fw-bold p-2'>{status?.status ? status?.status : "Pending"}</h5> </div>
                               {status?.closed ? "" : <div className="row">
                               
                               <div className="form-group col-9"> <input type="text" className='form-control' name="status" value={status?.status} onChange={(e)=>setStatus(e.currentTarget.value)}/></div>
                               <div className='col-3'>
                                <button className='btn btn-primary' onClick={()=>updateStatus()}>Update</button>
                               </div>

                               </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AddressBlock;