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
    console.log(cod, weight, pickupCode, deliveryCode);
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

    const selectCourier = () => {

    }
    console.log(courier);
    return (
        <div>
            <PageHeader1 pagetitle='Courier Partners List' />
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <div className='container'>
                    <div className="row fw-bold border p-2">
                    <div className='col-3 ' >Courier Name</div>
                        {/* <div className='col-4'  ><img className="avatar rounded lg border" src={item?.image?.email_logo_s3_path} alt="" /> </div> */}
                        <div className='col-2'  >Courier Charge</div>
                        <div className='col-2'  >Rating</div>
                        <div className='col-2'  >City</div>
                        <div className='col-3'  >ESD</div>
                        </div>
                    {courier?.data?.available_courier_companies?.map((item, i) => <div key={i} className='row p-2'>

                        <div className='col-3' >{item?.courier_name}</div>
                        {/* <div className='col-4'  ><img className="avatar rounded lg border" src={item?.image?.email_logo_s3_path} alt="" /> </div> */}
                        <div className='col-2'  >{item?.rate}</div>
                        <div className='col-2'  >{item?.rating}</div>
                        <div className='col-2'  >{item?.city}</div>
                        <div className='col-3'  >{item?.etd}</div>
                    </div>
                    )}
                </div>
            }
        </div>
    )
}

export default CourierPartners