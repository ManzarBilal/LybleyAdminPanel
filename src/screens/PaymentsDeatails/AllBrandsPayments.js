import React, { useEffect, useState } from 'react'
import { ReactLoader } from '../../components/common/ReactLoader'
import httpCommon from "../../http-common"
import {Link}  from "react-router-dom";

const AllBrandsPayments = (props) => {

    const [data, setData] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const getDashBoardData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getAllBrands`);
            let { data } = response;
            setData(data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    const getAllOrder = async () => {
        try {
            let response = await httpCommon.get("/getAllOrder");
            let { data } = response;
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllOrder()
        getDashBoardData()

    }, []);

    return (
        <div className='container'>
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <>
                    <div className='fw-bold mb-3'> TOTAL BRANDS ({data?.length})</div>
                    <div className='row'>
                        {data?.map((brand, i) => {

                            let order = orders?.filter(f1 => f1?.items?.find(f2 => f2?.brandId === brand?._id))

                            let revenue = order?.map(it => ({ rev: it?.items?.reduce((acc, curr) => acc + curr?.MRP, 0) }))
                          
                            let tRev = revenue?.reduce((acc, curr) => acc + curr?.rev, 0);
                           let duePay=tRev-brand?.totalPay
                           

                            return <div key={i} className="col-md-4 col-lg-4 col-12" >
                                <Link to={props?.url + `/brandPayments/${brand?._id}`} >
                                <div className={`alert-success alert mb-4`} style={{ cursor: "pointer" }}>
                                    <div className="d-flex align-items-center mb-2">
                                        <img src={brand?.brandLogo} alt="brandLogo" className="avatar md rounded img-thumbnail shadow-sm" />

                                        <div className="flex-fill ms-3 text-truncate">
                                            <div className="h6 mb-0 fw-bold text-uppercase">{brand?.brandName}</div>
                                            <span className="small">{brand?.value}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='fw-bold text-uppercase'>Revenue </div>
                                        {/* <div className='text-dark fs-5 fw-bold'> {revenue?.reduce((acc, curr) => acc + curr?.rev, 0)} INR</div> */}
                                        <div className='text-dark fs-5 fw-bold'> {brand?.revenue} INR</div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='text-success fw-bold text-uppercase'>Total Pay </div>
                                        <div className='text-success fw-bold'>{brand?.totalPay} INR </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='text-danger fw-bold text-uppercase'>Total Due </div>
                                        <div className='text-danger fw-bold'>{brand?.totalDue} INR </div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        })}
                    </div>

                </>
            }
        </div>
    )
}

export default AllBrandsPayments