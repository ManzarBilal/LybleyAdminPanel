import React, { useEffect, useState } from 'react';
import PageHeader1 from '../../components/common/PageHeader1'; 
import httpCommon from "../../http-common"
import { useParams } from 'react-router-dom';
import { ReactLoader } from '../../components/common/ReactLoader';
import BookingSummeryBlock from './BookingSummaryDetail';
import CardBlock from './CardBlock';
import AddressBlock from './AddressBlock';

function BookingDetail() {
    const param = useParams()
    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loadingCard, setLoadingCard] = useState(false)
    const [loadingCust, setLoadingCust] = useState(false)
    const [faults,setFaults]=useState([]);



    
   const getFaults=async()=>{
    try{
        let response=await httpCommon.get("/getAllFault");
        let {data}=response;
        setFaults(data);
    }catch(err){
        console.log(err);
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
    const [orderById, setOrderById] = useState({});
    const [orderByCust, setOrderByCust] = useState("");
    //  const finalData=order?.find((item)=>item?._id===param.id);
    const [finalData, setFinalData] = useState([]);
    const getAllOrderByCustomer = async () => {
        try {
            setLoadingCust(true)
            let response = await httpCommon.get(`/getOrderByCustomer/${orderById?.customerId}`);
            let { data } = response;
            setFinalData(data);
            setLoadingCust(false)

        } catch (err) {
            console.log(err);
            setLoadingCust(false)

        }
    }
    console.log(orderById);
    const getAllOrderById = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getOrderById/${param?.id}`);
            let { data } = response;
            setOrderById(data);
            setOrderByCust("dgfg")
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

    useEffect(() => {
        getAllOrder();
        getAllOrderByCustomer();
        getAllOrderById();
        getFaults();
    }, [orderByCust]);

    
   
    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle={ ` BOOKING DETAIL : ${orderById?._id} `} Orderdetail={true} />
                {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                    :
                    <>
                        <CardBlock finalData={orderById} />
                        <div className="row g-3 mb-3 row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck">
                            <AddressBlock finalData={orderById} />
                            <div className="col">
                                {orderById?.items?.map((item, i) => (<div className="card" key={i}>
                                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                        <h6 className="mb-0 fw-bold ">Current Order</h6>
                                        {/* <a href="#!" className="text-muted">Download</a> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Product Name:</label>
                                                <span><strong>{item?.sparePartName}</strong></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Product Image :</label>
                                                <span><img className="avatar rounded lg border me-1" src={item?.sparePartImage} alt="" /></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Spare Part Model :</label>
                                                <span><strong>{item?.sparePartModel}</strong></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Spare Part Category :</label>
                                                <span><strong>{item?.sparePartCategory}</strong></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">price :</label>
                                                <span><strong>{item?.MRP}</strong></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Quantity :</label>
                                                <span><strong>{item?.quantity}</strong></span>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label col-6 col-sm-5">Fault Type :</label>
                                                <span><strong>{faults?.find(f1=>f1?.productModel===item?.sparePartModel)?.faultName}</strong></span>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                ))
                                }
                            </div>
                        </div>
                    </>
                }
                <div className="row g-3 mb-3">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                <h6 className="mb-0 fw-bold ">Order Summary</h6>
                            </div>
                            <div className="card-body">
                                <div className="product-cart">
                                    <div className="checkout-table table-responsive">
                                        <div id="myCartTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                {loadingCust ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                                                    :
                                                    <BookingSummeryBlock orders={finalData} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="checkout-coupon-total checkout-coupon-total-2 d-flex flex-wrap justify-content-end">
                                        <div className="checkout-total">
                                            <div className="single-total">
                                                <p className="value">Subotal Price:</p>
                                                <p className="price">$1096.00</p>
                                            </div>
                                            <div className="single-total">
                                                <p className="value">Shipping Cost (+):</p>
                                                <p className="price">$12.00</p>
                                            </div>
                                            <div className="single-total">
                                                <p className="value">Discount (-):</p>
                                                <p className="price">$10.00</p>
                                            </div>
                                            <div className="single-total">
                                                <p className="value">Tax(18%):</p>
                                                <p className="price">$198.00</p>
                                            </div>
                                            <div className="single-total total-payable">
                                                <p className="value">Total Payable:</p>
                                                <p className="price">$1296.00</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-xl-12 col-xxl-4">
                        <StatusOrderBlock />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default BookingDetail;