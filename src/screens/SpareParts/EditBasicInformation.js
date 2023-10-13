import React, { useState } from 'react';
 

function EditBasicInformation(props) {
// const [category,setCategory]=useState();
const [fault,setFault]=useState("");
 const fault1=(f)=>{
     setFault(f);
     props.onSubmit(f);
 }
 const handleIndex=(i)=>{
      props.onDelete(i);
      setFault("");
 }
let {partName,description,faultType,MRP,bestPrice,productModel,category,partNo,skuNo,length,breadth,height,weight,brandName}=props?.sparePart;
 
let {categories}=props;
 
const categoryById = categories?.filter(p1=>props?.products?.data?.find(f1=>f1?.categoryId===p1?._id))
let pds=(props?.user?.role==="RESELLER" || props?.user?.role==="ADMIN") ? props?.products?.data?.filter(f1=>f1?.productCategory===category && f1?.brandName===brandName) : props?.products?.data?.filter(f1=>f1?.productCategory===category && f1?.userId===props?.user?._id);
 
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
                        <div className="col-md-6">
                            <label className="form-label"> Spare Part No.</label>
                            <input type="text" className="form-control" name='partNo' value={partNo} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"> SKU No.</label>
                            <input type="text" className="form-control" name='skuNo' value={skuNo} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Length</label>
                            <input type="text" className="form-control" name='length' value={length} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Breadth</label>
                            <input type="text" className="form-control" name='breadth' value={breadth} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Height</label>
                            <input type="text" className="form-control" name='height' value={height} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Weight</label>
                            <input type="text" className="form-control" name='weight' value={weight} onChange={(e) => {props.onChange(e) }} />
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
                            <select className="form-select" name='category' value={category} onChange={(e)=>props.onChange(e)} >
                                <option value="" selected>Choose Category</option>
                                {categories?.map(c1=>
                                    <option value={c1.category} >{c1.categoryName}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Product Model</label>
                            <select className="form-select" name='productModel' value={productModel} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Model</option>
                               { category && pds?.map(c1=>
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
                        
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditBasicInformation