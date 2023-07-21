import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmBox } from '../../components/common/ConfirmBox';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';

function MyCardBlockList(props) {
    const [partId, setPartId] = useState("");
    const [showDesc,setShowDesc]=useState(null);
    const [confirmBoxView, setConfirmBoxView] = useState(false);

    const handlePart = (id) => {
        setPartId(id)
        setConfirmBoxView(true);
    }

    const handleShowDesc=(bool)=>{
        setShowDesc(bool);
    }
    const deleteSparePart = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteCompactibleSparePart/${partId}`);
            let { data } = response;
            setConfirmBoxView(false);
            // let x = Math.floor((Math.random() * 10) + 1);
            props.setRandomValue(data);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="card mb-3 bg-transparent p-2">
            {
                props?.spareParts?.map((d, i) => {
                    return <div key={'ffff' + i} className="card border-0 mb-1">

                        <div className='position-absolute top-0 end-0 py-3 px-3 d-flex justify-content-between'>
                            <Link to={props?.url + `/mysparePart-edit/${d?._id}`} className="btn btn-primary mt-4"><i class="icofont-ui-edit"></i></Link>
                            <div onClick={() => handlePart(d?._id)} className="btn btn-danger text-white ms-3 mt-4"><i class="icofont-ui-delete"></i></div>
                        </div>
                        <div className="card-body d-flex align-items-center flex-column flex-md-row">
                            <Link to={props?.url + "/product-detail"}>
                                <img className="w120 rounded img-fluid" src={d?.images[0]} alt="" style={{ height: "100px" }} />
                            </Link>
                            <div className="ms-md-4 m-0 mt-4 mt-md-0 text-md-start text-center w-100">
                                {/* <Link to={props?.url + "/product-detail"}> */}
                                    <h6 className="mb-3 fw-bold">{d?.partName} {props?.role === "ADMIN" ? <span className="fw-bold   d-block">Brand Name : {d?.brandName}</span> : ""}{ showDesc===i ? <span className="text-muted small fw-light d-block">{d?.description} <span style={{color:"blue",cursor: "pointer"}} onClick={()=>handleShowDesc(null)}>Hide</span> </span> : <span className="text-muted small fw-light d-block">{d?.description.substring(0,300)}... <span style={{color:"blue",cursor: "pointer"}} onClick={()=>handleShowDesc(i)}>Read more</span> </span>}</h6>
                                    {/* </Link> */}
                                <div className="d-flex flex-row flex-wrap align-items-center justify-content-center justify-content-md-start">
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">{d?.productModel}</div>
                                        <strong>12:30pm</strong>
                                    </div>
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">MRP</div>
                                        <strong>{d?.MRP}</strong>
                                    </div>
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Best Price</div>
                                        <strong>{d?.bestPrice}</strong>
                                    </div>
                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                        <div className="text-muted small">Ratings</div>
                                        <strong><i className="icofont-star text-warning"></i>4.5<span className="text-muted">(2)</span></strong>
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
export default MyCardBlockList;