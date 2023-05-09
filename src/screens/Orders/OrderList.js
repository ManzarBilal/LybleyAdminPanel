import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
 
function OrderList(props) {

    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true,
            },
            {
                name: "CUSTOMER NAME",
                selector: (row) => row?.name,
                cell: (row) => <Link className='text-primary' to={props?.url + `/order-detail/${row?._id}`} >{row?.name}</Link>,
                sortable: true,
            },
            {
                name: "ADDRESS",
                cell: row => row?.address,
                sortable: true, minWidth: "200px"
            },

            {
                name: "EMAIL",
                cell: row => row?.email,
                sortable: true, minWidth: "220px"
            },
            {
                name: "CONTACT NO.",
                cell: row => row?.contact,
                sortable: true,
            },
            {
                name: "ITEMS",
                cell: row => row?.items?.length,
                sortable: true,
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
            // {
            //     name: "ACTION",
            //     selector: (row) => { },
            //     sortable: true,
            //     cell: (row) => 
            //     <div className="btn-group" role="group" aria-label="Basic outlined example">
            //         <button onClick={() => { edit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
            //         <button onClick={() => { handleBrand(row?._id) }} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
            //     </div>
            // }
        ]
    }

    const [order, setOrders] = useState([]);
    useEffect(() => {
        getAllOrder();
    }, []);

    const getAllOrder = async () => {
        try {
            let response = await httpCommon.get("/getAllOrder");
            let { data } = response;
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    }


    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)

    const orders = user?.role === "ADMIN" ? order : order?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
    // const orders1=orders
    const finalData = orders?.map((item, i) => ({ ...item, i: i + 1 }))

    
    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Orders List' />
                <div className="row g-3 mb-3">
                    <div className="col-md-12">
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
                    </div>
                </div>
            </div>
        </div>

    )
}
export default OrderList;