import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';

import { ReactLoader } from '../../components/common/ReactLoader';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ShipOrderList(props) {


    const param = useParams()


    const [order, setOrders] = useState([]);


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllOrder();
    }, []);

    const cancelOrder = async (id) => {
        try {

            let response = await httpCommon.post("/cancelOrder", { ids: [id] });
            let { data } = response;
        } catch (err) {
            console.log(err);


        }
    }
    const getAllOrder = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllShiprocketOrders");
            let { data } = response;
            setOrders(data?.data);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

    const handleGenManifest = async (shipmentId) => {
        const body = { shipment_id: [shipmentId] }
        try {
            let response = await httpCommon.post("/generateManifest", body)
            let { data } = response
        }
        catch (err) {
            console.log(err);
        }
    }
    const handlePrintManifest = async (orderId) => {
        const body = { order_ids: [orderId] }
        try {
            let response = await httpCommon.post("/printManifest", body)
            let { data } = response
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleLabel = async (shipmentId) => {
        const body = { shipment_id: [shipmentId] }
        try {
            let response = await httpCommon.post("/generateLabel", body)
            let { data } = response
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleInvoice = async (orderId) => {
        const body = { ids: [orderId] }
        try {
            let response = await httpCommon.post("/generateInvoice", body)
            let { data } = response
        }
        catch (err) {
            console.log(err);
        }
    }
    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true,
                maxWidth: "50px",
            },
            {
                name: "CUSTOMER NAME",
                selector: (row) => row?.customer_name,
                cell: (row) => <div style={{ backgroundColor: "#b4ebed", cursor: "pointer" }}><Link className='ps-2 pe-2 text-decoration' to={props?.url + `/order-detail/${row?.channel_order_id
                    }`} >{row?.customer_name}</Link></div>,
                sortable: true,
            },
            // {
            //     name: "ADDRESS",
            //     cell: (row) => <div>{row?.customer_address}, {row?.customer_cit}</div>,
            //     sortable: true, minWidth: "200px",
            // },

            // {
            //     name: "EMAIL",
            //     cell: row => row?.customer_email,
            //     sortable: true, minWidth: "220px"
            // },
            // {
            //     name: "CONTACT NO.",
            //     cell: row => row?.customer_phone,
            //     sortable: true,
            // },
            {
                name: "ITEMS",
                cell: (row) => row?.products?.map((item, i) => <div key={i}>{item?.name},</div>),
                sortable: true, minWidth: "170px",
            },
            {
                name: "STATUS",
                cell: row => row?.status,
                sortable: true,
            },
            {
                name: "ORDER DATE & TIME",
                selector: (row) => row.date,
                sortable: true,
                cell: row => row?.created_at,
                minWidth: "170px",
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
                    row?.status === 'CANCELED' ? <div> </div>
                        : <div className="btn-group d-flex justify-content-between align-items-center" role="group" aria-label="Basic outlined example">
                            <div className='row'>
                                <div className='col-6'>
                                    <button type="button" className="btn btn-success text-white deleterow " onClick={() => handleGenManifest(row?.shipments[0].id)} >Gen Manifest</button>
                                </div>
                                <div className='col-6'>
                                    <button type="button" className="btn btn-success text-white deleterow " onClick={() => handlePrintManifest(row?.channel_order_id)}> Print Manifest</button>
                                </div>
                                <div className='col-6'>
                                    <button type="button" className="btn btn-success text-white deleterow mt-2" onClick={() => handleLabel(row?.shipments[0].id)}> Label</button>
                                </div>
                                <div className='col-6'>
                                    <button type="button" className="btn btn-success text-white deleterow mt-2" onClick={() => handleInvoice(row?.id)}> Invoice</button>
                                </div>
                            </div>
                           {row?.status !=="NEW" ? "" : <Link style={{ width: "200px" }} to={props?.url + `/coirierPartners?pickupCode=${row?.pickup_address_detail?.pin_code}&deliveryCode=${row?.customer_pincode}&cod=${0}&weight=${row?.shipments[0]?.weight}&shipment_id=${row?.shipments[0]?.id}`} className='text-decoratio-none' ><button type="button" className="btn btn-success text-white deleterow ms-4"  > Select Courier</button></Link>}
                            <button onClick={() => { cancelOrder(row?.id) }} type="button" className=" ms-4 btn btn-outline-secondary"><i className="icofont-ui-delete text-danger"></i></button>
                        </div>, minWidth: "400px",
            }
        ]
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
    const finalData = orders?.map((item, i) => ({ ...item, i: i + 1 }))

    console.log(finalData);

    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Orders List' />
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
export default ShipOrderList;