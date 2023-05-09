import React from 'react';
import { OrderDiv } from '../../Data/OrderDetailData';

function AddressBlock(finalData) {
 
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
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AddressBlock;