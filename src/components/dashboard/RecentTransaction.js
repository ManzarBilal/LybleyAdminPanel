import React from 'react';
import DataTable from 'react-data-table-component';
import { RecentTransactionData } from '../Data/RecentTransactionData';

function RecentTransaction(props) {
    const columns = () => {
        return [

            

            {
                name: "BRAND",
                selector: (row) => row?.brandName,
                sortable: true
            },
            {
                name: "TOTAL PAY",
                selector: (row) => row?.totalPay,
                sortable: true
            },
            {
                name: "TOTAL DUE",
                selector: (row) => row?.totalDue,
                sortable: true,
            },
            {
                name: "DATE",
                selector: (row) => new Date(row?.createdAt).toLocaleString(),
                sortable: true,
            },
            
        ]
    }
    return (
        <div className="card">
            <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                <h6 className="m-0 fw-bold">Recent Transactions</h6>
            </div>
            <div className="card-body">
                <div id="myDataTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer" >
                    <div className="row">
                        <div className="col-sm-12">
                            <DataTable
                                title={RecentTransactionData.title}
                                columns={columns()}
                                data={props?.transaction}
                                defaultSortField="title"
                                pagination
                                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                                selectableRows={false}
                                highlightOnHover={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecentTransaction;