import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../common/ToastMessage';
import httpCommon from "../../../http-common";
import { ConfirmBox } from '../../common/ConfirmBox';

function CardBlock(props) {

    const [productId, setProductId] = useState("");
    const [showDesc,setShowDesc]=useState(null);
    const [confirmBoxView, setConfirmBoxView] = useState(false);

    const handleProduct = (id) => {
        setProductId(id)
        setConfirmBoxView(true);
    }

    const handleShowDesc=(bool)=>{
        setShowDesc(bool);
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
        <div className="card mb-3 bg-transparent p-2">
            {
                props?.product?.map((d, i) => {
                    return <div key={'ffff' + i} className="card border-0 mb-1">
                        <div className='position-absolute top-0 end-0 py-3 px-3 d-flex justify-content-between'>
                            <Link to={props?.url + `/product-edit/${d?._id}`} className="btn btn-primary mt-4"><i class="icofont-ui-edit"></i></Link>
                            <div onClick={() => handleProduct(d?._id)} className="btn btn-danger text-white ms-3 mt-4"><i class="icofont-ui-delete"></i></div>
                        </div>
                        <div className="card-body d-flex align-items-center flex-column flex-md-row">
                            <Link to={props?.url + "/product-detail"}>
                                <img className=" rounded img-fluid" src={d.productImage} alt="" style={{ height: "150px",width:"150px" }} />
                            </Link>
                            <div className="ms-md-4 m-0 mt-4 mt-md-0 text-md-start text-center w-100">
                                {/* <Link to={props?.url + "/product-detail"}> */}
                                    <h6 className="mb-3 fw-bold">{d?.productName}  {props?.role === "ADMIN" ? <span className="fw-bold   d-block">Brand : {d?.brandName}</span> : ""}{showDesc===i ? <span className="text-muted small fw-light d-block">{d?.productDescription} <span style={{color:"blue",cursor: "pointer"}} onClick={()=>handleShowDesc(null)}>Hide</span></span> : <span className="text-muted small fw-light d-block">{d?.productDescription.substring(0,300)}... <span style={{color:"blue",cursor: "pointer"}} onClick={()=>handleShowDesc(i)}>Read more</span></span> }</h6>
                                    {/* </Link> */}
                                <div className="d-flex flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Special priceends</div>
                                        <strong>{new Date(d?.createdAt).toLocaleString()}</strong>
                                    </div>
                                    {/* <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Offer</div>
                                        <strong>Bank Offer</strong>
                                    </div>
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Price</div>
                                        <strong>$100</strong>
                                    </div> */}
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Ratings</div>
                                        <strong><i className="icofont-star text-warning"></i>4.5<span className="text-muted">(2)</span></strong>
                                    </div>
                                </div>
                                <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2 d-inline-flex d-md-none">
                                    <button type="button" className="btn btn-primary">Add Cart</button>
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
export default CardBlock;