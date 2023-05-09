import React, { useState } from 'react';
 

function BasicInformation(props) {
// const [category,setCategory]=useState();
const [fault,setFault]=useState("");
const [technicianPrice,setTechnicianPrice]=useState(["350","600"]);
 const fault1=(f)=>{
     setFault(f);
     props.onSubmit(f);
 }
 const handleIndex=(i)=>{
      props.onDelete(i);
      setFault("");
 }
let {partName,description,faultType,MRP,bestPrice,technician,productModel,category,}=props?.sparePart;
let {categories}=props;

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Basic information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            <label className="form-label"> Spare Part Name</label>
                            <input type="text" className="form-control" name='partName' value={partName} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea type="text" className="form-control" name='description' value={description} onChange={(e) => {props.onChange(e) }} ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label"> MRP</label>
                            <input type="number" className="form-control" name='MRP' value={MRP} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label"> Best Price</label>
                            <input type="number" className="form-control" name='bestPrice' value={bestPrice} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Category</label>
                            <select className="form-select" name='category' value={category} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Category</option>
                                {categories?.map(c1=>
                                    <option value={c1.categoryName} >{c1.categoryName}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Product Model</label>
                            <select className="form-select" name='productModel' value={productModel} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Model</option>
                                {props?.products?.filter(p1=>p1?.productCategory===category)?.map(c1=>
                                    <option value={c1.productName} >{c1.productName}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Fault Type </label>{" "} <span className='text-muted'>(Select max 5)</span>
                            <select className="form-select" name='fault' value={fault} onChange={(e)=>fault1(e.currentTarget.value)}  >
                                <option value="" selected>Choose Fault</option>
                                {props?.faultType?.map(c1=>
                                    <option value={c1.faultName} >{c1.faultName}</option>
                                    )}
                            </select>
                        </div>
                        {faultType?.map((f1,i)=><div className='btn btn-sm bg-dark text-white m-1'>{f1} <i className='ms-2 icofont-close-circled' onClick={(e)=> handleIndex(i)}></i></div>)}
                    </div>
                    <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Technician Price </label>
                            <select className="form-select" name='technician' value={technician} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Select Price</option>
                                {technicianPrice?.map(t1=>
                                    <option value={t1} >{t1}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}
export default BasicInformation