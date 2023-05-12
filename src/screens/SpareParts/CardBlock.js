import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmBox } from '../../components/common/ConfirmBox';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';

function CardBlock(props) {
    const [partId, setPartId] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);

    const handlePart = (id) => {
        setPartId(id)
        setConfirmBoxView(true);
    }
    const deleteSparePart = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteSparePart/${partId}`);
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
                props?.sparePart?.map((d, i) => {
                    return <div key={'product' + i} className="col">
                        <div className="card">
                            <div className="product">
                                <div className="product-image">
                                    <div className="product-item active">
                                        <img src={d.images[0]} alt="product" className="img-fluid w-100" style={{ height: "200px" }} />
                                    </div>
                                    <a className="add-wishlist" href="#!">
                                        <i className="icofont-heart"></i>
                                    </a>
                                </div>
                                <div className="product-content p-3">
                                    <span className="rating mb-2 d-block"><i className="* * *"></i>{4.5} </span>
                                    <Link to={props?.url + "/product-detail"} className="fw-bold">{d.partName} </Link>
                                    {props?.role === "ADMIN" ?  <div className="text-muted">Brand Name : {d.brandName}</div>
                                    : "" }
                                    <div className="text-muted">{d.productModel}</div>
                                    <div className='d-flex justify-content-between'>
                                        <Link to={props?.url + `/sparePart-edit/${d?._id}`} className="btn btn-primary mt-3">Edit</Link>
                                        <div onClick={() => handlePart(d?._id)} className="btn btn-danger text-white mt-3"><i class="icofont-ui-delete"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteSparePart} />
        </div>
       
    )
}

export default CardBlock;