import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
 
import { ReactLoader } from '../../components/common/ReactLoader';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function AllShipmentsList(props) {

    const router=useHistory()

    const param = useParams()
    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true,
                maxWidth: "50px",
            },
            {
                name: "PRODUCT NAME",
                selector: (row) => row?.customer_name,
                cell: (row) => row?.products?.map((item, i) => <div key={i}>{item?.name},</div>),
                sortable: true,minWidth: "300px",
            },
            {
                name: "SKU",
                cell: (row) =>  row?.products?.map((item, i) => <div key={i}>{item?.sku},</div>),
                sortable: true, minWidth: "200px",
            },

            

            
            {
                name: "ITEMS",
                cell: (row) => row?.products?.map((item, i) => <div key={i}>{item?.quantity},</div>),
                sortable: true, minWidth: "170px",
            },
            {
                name: "SHIPMENT STATUS",
                selector: (row) => row?.status,
                cell: (row) => row?.status,
                sortable: true, minWidth: "170px",
            },
            {
                name: "ORDER DATE & TIME",
                selector: (row) => row.date,
                sortable: true,
                cell: row => row?.created_at,
                minWidth: "190px",
                //  <>
                // {<div className='row'> <span>({new Date(row?.createdAt)?.toLocaleDateString()}) {new Date(row?.createdAt)?.toLocaleTimeString()}</span></div>}</>,

            },
            // {
            //     name: "STATUS",
            //     selector: (row) => row?.status,
            //     cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
            //         {row?.status === "INACTIVE" ? <button type="button" className="btn text-white btn-danger" onClick={() => approval(row?._id, "ACTIVE")}>INACTIVE</button>
            //             : <button type="button" className="btn text-white btn-success" onClick={() => approval(row?._id, "INACTIVE")} >ACTIVE</button>}

            //     </div>,
            //     sortable: true,
            // },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) =>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button onClick={() => { cancelShipment(row?.awb) }} type="button" className="btn btn-danger text-white">Cancel Shipment</button>
                        <button onClick={() => { trackShipment(row?.awb) }} type="button" className="ms-3 btn btn-success text-white">Track Shipment</button>
                        {/* <Link to={props?.url +`/coirierPartners?pickupCode=${row?.pickup_address_detail?.pin_code}&deliveryCode=${row?.customer_pincode}&cod=${0}&weight=${row?.shipments[0]?.weight}&shipment_id=${row?.shipments[0]?.id}`} className='text-decoratio-none' ><button type="button" className="btn btn-success text-white deleterow"  > Select Courier</button></Link> */}
                    </div>, minWidth: "320px",
            }
        ]
    }

    const [order, setOrders] = useState([]);
   
 
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllShipment();
    }, []);

    const cancelShipment=async(awb)=>{ 
        try {
        setLoading(true)
        let response = await httpCommon.post("/cancelShipment",{awbs:awb});
        let { data } = response;
        setLoading(false)
    } catch (err) {
        console.log(err);
        setLoading(false)

    }
}
    const trackShipment=async(id)=>{ 
        try {
        
        let response = await httpCommon.get(`/trackShipmentbyAWB/${id}`);
        let { data } = response;
        console.log(data);
        if (data?.track_status=== 0) {

        }
        else {
            
            window.open(data?.tracking_data?.track_url ,'_blank');
        }
    } catch (err) {
        console.log(err);
        setLoading(false)

    }
    }
    const getAllShipment = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllShipment");
            let { data } = response;
            
            setOrders(data?.data?.reverse());
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

  
    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)
    let propsId1 = props?.id === undefined ? "wewewer" : props?.id;
    const orders = (user?.role === "ADMIN" && propsId1 === param?.id) ? order?.filter((item, i) => item?.items?.find((it => it?.brandId === param?.id))) : (user?.role === "ADMIN") ? order : order?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
    //console.log("orders", orders);
    // const orders1 = ((user?.role === "ADMIN") && (props?.id === param?.id)) ? console.log("admin and param id",props?.id === param?.id, props?.id,param?.id) : (user?.role === "ADMIN") ? console.log("only admin") : console.log("only brand");
    //  console.log("orders1",orders1)
    // const orders =   user?.role === "ADMIN" ? order  : order?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
    // const orders1=orders
    const finalData = order?.map((item, i) => ({ ...item, i: i + 1 }))
 
    console.log(finalData);
    
    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle='All Shipments List' />
                <div className="row g-3 mb-3">
                    <div className="col-md-12">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                            <div className="card">
                                <div className="card-body">
                                    <div id="myDataTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <DataTable
                                                    columns={columns()}
                                                    data={finalData}
                                                    defaultSortField="title"
                                                    pagination
                                                    selectableRows={false}
                                                    className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                                                    highlightOnHover={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
        </div>

    )
}
export default AllShipmentsList;