import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../common/ToastMessage';
import httpCommon from "../../../http-common";
import { ConfirmBox } from '../../common/ConfirmBox';

function MyCardBlock(props) {
 
    const [productId, setProductId] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);

    const handleProduct = (id) => {
        setProductId(id)
        setConfirmBoxView(true);
    }
    const deleteProduct = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteProduct/${productId}`);
            let { data } = response;
            setConfirmBoxView(false);
            let x = Math.floor((Math.random() * 10) + 1);
            props.setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-3">
            {
                props?.product?.map((d, i) => {
                    return <div key={'product' + i} className="col">
                        <div className="card">
                            <div className="product">
                                <div className="product-image">
                                    <div className="product-item active">
                                        <img src={d.productImage} alt="product" className="img-fluid w-100" style={{height:"280px"}} />
                                    </div>
                                    <a className="add-wishlist" href="#!">
                                        <i className= "icofont-heart"></i>
                                    </a>
                                </div>
                                <div className="product-content p-3">
                                    <span className="rating mb-2 d-block"><i className= "* * *"></i>{4.5} </span>
                                    <Link to={props?.url + "/product-detail"} className="fw-bold">{d.productName} </Link>
                                   {props?.role==="ADMIN" ?  <p className="fw-bold">Brand : {d.brandName}</p>
                                   : ""}
                                    <p className="text-muted">{d?.productDescription?.substring(0,60)}</p>
                                    <div className='d-flex justify-content-between'>
                                    <Link to={props?.url + `/product-edit/${d?._id}`} className="btn btn-primary mt-3">Edit</Link>
                                    <div onClick={() => handleProduct(d?._id)} className="btn btn-danger text-white mt-3"><i class="icofont-ui-delete"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteProduct} />

        </div>
    )
}

export default MyCardBlock;