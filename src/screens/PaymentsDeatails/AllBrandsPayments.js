import React, { useEffect, useState } from 'react'
import { ReactLoader } from '../../components/common/ReactLoader'
import httpCommon from "../../http-common"

const AllBrandsPayments = () => {

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
    console.log("dayta", data);
    console.log("orders", orders);
    return (
        <div className='container'>
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <>
                    <div className='fw-bold mb-3'> TOTAL BRANDS ({data?.length})</div>
                    <div className='row'>
                        {data?.map((brand, i) => {

                            let order = orders?.filter(f1 => f1?.items?.find(f2 => f2?.brandId === brand?._id))

                            let revenue = order?.map(it => ({ rev: it?.items?.reduce((acc, curr) => acc + curr?.MRP, 0) }))
                            console.log("revenue",revenue);
                            let tRev = revenue?.reduce((acc, curr) => acc + curr?.rev, 0);
                           let duePay=tRev-brand?.totalPay
                            console.log("duePay",duePay);

                            return <div key={i} className="col-md-4 col-lg-4 col-12" >
                                <div className={`alert-success alert mb-4`} style={{ cursor: "pointer" }}>
                                    <div className="d-flex align-items-center mb-2">
                                        <img src={brand?.brandLogo} alt="brandLogo" className="avatar md rounded img-thumbnail shadow-sm" />

                                        <div className="flex-fill ms-3 text-truncate">
                                            <div className="h6 mb-0 fw-bold text-uppercase">{brand?.brandName}</div>
                                            <span className="small">{brand?.value}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='fw-bold'>Revenue </div>
                                        <div className='text-dark fs-5 fw-bold'> {revenue?.reduce((acc, curr) => acc + curr?.rev, 0)} INR</div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='fw-bold'>Total Pay </div>
                                        <div className='text-success fw-bold'>{brand?.totalPay} INR </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='fw-bold'>Total Due </div>
                                        <div className='text-danger fw-bold'>{duePay} INR </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                </>
            }
        </div>
    )
}

export default AllBrandsPayments