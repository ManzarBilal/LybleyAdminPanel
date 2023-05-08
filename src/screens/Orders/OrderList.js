import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import { OrderListData } from '../../components/Data/OrderListData';
import httpCommon from "../../http-common";
function OrderList() {
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
       getAllOrder();
    },[]);

    const getAllOrder=async()=>{
        try{
          let response=await httpCommon.get("/getAllOrder");
          let {data}=response;
          setOrders(data);
        }catch(err){
            console.log(err);
        }
    }

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
                                                columns={OrderListData.columns}
                                                data={OrderListData.rows}
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