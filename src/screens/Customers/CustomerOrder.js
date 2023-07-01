import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
import { ReactLoader } from '../../components/common/ReactLoader';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function CustomerOrderList(props) {
    const param = useParams()

    const columns = () => {
        return [
            {
                name: "DATE",
                selector: (row) => new Date(row?.createdAt)?.toLocaleDateString(),
                sortable: true,
            },
            {
                name: "CUSTOMER NAME",
                selector: (row) => row?.name,
                cell: (row) => <div style={{backgroundColor:"#b4ebed",cursor:"pointer"}}><Link className='ps-2 pe-2 text-decoration' to={props?.url + `/order-detail/${row?._id}`} >{row?.name}</Link></div>,
                sortable: true,
            },
            {
                name: "ADDRESS",
                cell: row => row?.address,
                sortable: true, 
            },

            {
                name: "EMAIL",
                cell: row => row?.email,
                sortable: true, 
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
            {
                name: "PRODUCT IMAGE",
                cell: row => row?.items?.map((item,i)=> <><img key={i} className="avatar rounded lg border" src={item?.sparePartImage} alt="" /> </>),
                sortable: true,
            },
            {
                    name: "ACTION",
                    selector: (row) => { },
                    sortable: true,
                    cell: (row) => <div style={{ cursor:"pointer"}}><Link className='ps-2 pe-2 text-decoration' to={props?.url + `/order-detail/${row?._id}`} >  <button   type="button" className="btn btn-outline-secondary"><i className="icofont-eye fs-3 text-primary"></i></button></Link></div>
                     
                 }
        ]
    }

    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllOrder();
    }, []);

    const getAllOrder = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getOrderByCustomer/${param?.id}`);
            let { data } = response;
            setOrders(data);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }


    
    const finalData = order?.map((item, i) => ({ ...item, i: i + 1 }))

 
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
export default CustomerOrderList;