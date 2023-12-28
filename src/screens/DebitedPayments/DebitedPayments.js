import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { ToastMessage } from '../../components/common/ToastMessage';
import Avatar4 from "../../assets/images/lg/avatar4.svg";
import { ReactLoader } from '../../components/common/ReactLoader';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';


 
function DebitedPayments() {
     
    const [debitPayments, setDebitPayments] = useState();
    

    const [loading, setLoading] = useState(false)

   

    useEffect(() => {
        
        getPaymentDetails()
    }, [ ])
    
    const getPaymentDetails = async () => {

        try {
            let user = localStorage.getItem("user");
            let brandObj = JSON.parse(user);
            setLoading(true)
            let response = await httpCommon.get(`/getCourierDebitTransaction/${brandObj?._id}`)

            let { data } = response
           
            setDebitPayments(data.reverse())
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }


     


    

    const columns = () => {
        return [
           
            {
                name: "Brand Name",
                selector: (row) => row?.brandName,
                sortable: true,
            },
            {
                name: "Debit Amount",
                selector: (row) => row?.debitAmount+ " INR",
                sortable: true,
            },
            {
                name: "Courier Partner",
                selector: (row) => row?.courier,
                sortable: true,
            },
           
            {
                name: "Payment Release Date",
                selector: (row) => new Date(row?.createdAt).toLocaleString(),
                sortable: true,
            },


        ]
    }
    

    
    return (
        <>
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <PageHeader1 pagetitle='Ship Debit Amount' modalbutton={() => {
                        return <>
                            <div className="col-auto d-flex w-sm-100">
                                 
 
                            </div>

                        </>
                    }} />

                    <div className="row clearfix g-3">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                            : <div className="col-sm-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <DataTable
                                                        columns={columns()}
                                                        data={debitPayments}
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
                        }
                    </div>
                </div>


               

            </div>

        </>
    )
}
export default DebitedPayments;