import React, { useEffect, useState } from 'react';
import httpCommon from "../../http-common";
import PageHeader1 from '../../components/common/PageHeader1';
import { ReactLoader } from '../../components/common/ReactLoader';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';



const CourierPartners = (props) => {
    const [courier, setCourier] = useState([]);
    const [loading, setLoading] = useState(false)

    const param = useLocation()
    const queruParams = new URLSearchParams(param.search)
    const cod = queruParams.get("cod")
    const weight = queruParams.get("weight")
    const pickupCode = queruParams.get("pickupCode")
    const deliveryCode = queruParams.get("deliveryCode")
    const shipmentId = queruParams.get("shipment_id")
    console.log(cod, weight, pickupCode, deliveryCode,shipmentId);
    useEffect(() => {
        getCourier();
    }, []);
    const getCourier = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.post("/courierAbility", { pickup_postal_code: pickupCode, delivery_postal_code: deliveryCode, cod: cod, weight: weight });
            let { data } = response;
            setCourier(data);
            setLoading(false)


        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

    const selectCourier = async() => {
        try {
            setLoading(true)
            let response = await httpCommon.post("/shipProduct", { shipment_id:[shipmentId] });
            let { data } = response;
            setCourier(data);
            setLoading(false)


        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    console.log(courier);
    return (
        <div>
            <PageHeader1 pagetitle='Courier Partners List' />
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <div className='container'>
                    <div className="row d-flex justify-content-between fw-bold border bg-dark text-white p-3">
                    <div className='col-3 fs-5' >Courier Name</div>
                        {/* <div className='col-4'  ><img className="avatar rounded lg border" src={item?.image?.email_logo_s3_path} alt="" /> </div> */}
                        <div className='col-2 fs-5'  >Courier Charge</div>
                        <div className='col-2 fs-5'  >Rating</div>
                        <div className='col-2 fs-5'  >City</div>
                        <div className='col-2 fs-5'  >ESD</div>
                        <div className='col-1 fs-5'  >Action</div>
                        </div>
                    {courier?.data?.available_courier_companies?.map((item, i) => 
                    <div key={i} className='row border-bottom d-flex justify-content-between p-3'>

                        <div className='col-3 fw-bold fs-5' >{item?.courier_name}</div>
                        {/* <div className='col-4'  ><img className="avatar rounded lg border" src={item?.image?.email_logo_s3_path} alt="" /> </div> */}
                        <div className='col-2 text-danger fw-bold'  >{item?.rate}</div>
                        <div className='col-2 ps-2'  >{item?.rating}</div>
                        <div className='col-2'  >{item?.city}</div>
                        <div className='col-2'  >{item?.etd}</div>
                        <div className='col-1'  >
                            <div className='btn text-white btn-success'>Ship</div>
                            
                            </div>         
                    </div>
                    )}
                </div>
            }
        </div>
    )
}

export default CourierPartners