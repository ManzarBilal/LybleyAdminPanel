import React from 'react';
 

function BasicInformation(props) {
 
let {productName,productDescription,productCategory}=props?.product;

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Basic information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            <label className="form-label"> Product Name</label>
                            <input type="text" className="form-control" name='productName' value={productName} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Product  Description</label>
                            <textarea type="text" className="form-control" name='productDescription' value={productDescription} onChange={(e) => {props.onChange(e) }} ></textarea>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body">
                            <label className="form-label">Categories Select</label>
                            <select className="form-select" name='productCategory' value={productCategory} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Category</option>
                                {props?.categories?.filter(c1=>c1.status==="ACTIVE")?.map(c1=>
                                    <option value={c1.categoryName} >{c1.categoryName}</option>
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