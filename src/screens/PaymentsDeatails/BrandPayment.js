import React, { useEffect, useState } from 'react'
import httpCommon from "../../http-common"
import { ReactLoader } from '../../components/common/ReactLoader'
import { useParams } from 'react-router-dom'
import PageHeader1 from '../../components/common/PageHeader1'
import { Modal } from 'react-bootstrap'
import { ToastMessage } from '../../components/common/ToastMessage'
import DataTable from 'react-data-table-component'

const BrandPayment = () => {

    const param = useParams()

    const [brand, setBrand] = useState()
    const [table_row, setTable_row] = useState([]);

    const [totalPay, setTotalPay] = useState("")
    const [randomValue, setRandomValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [ismodal, setIsmodal] = useState(false);

    const getDashBoardData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getBrandBy/${param?.id}`);
            let { data } = response;
            setBrand(data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    const getTransactionData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getTransactionBy/${param?.id}`);
            let { data } = response;
            setTable_row(data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    useEffect(() => {

        getDashBoardData()
        getTransactionData()

    }, [randomValue]);

    const handleDuePayment = async (id) => {
        try{
        let response = await httpCommon.patch(`/updateTotalPay/${id}`,{totalPay: +totalPay})
        let { data } = response
       
        setIsmodal(false)
        let x = Math.floor((Math.random() * 10) + 1);
        setRandomValue(x)
        ToastMessage(data);
        }
        catch(err){
            console.log(err)
        }
    }
    const table_rowindex = table_row?.map((item, i) => ({ ...item, i: i + 1 }))
 

    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true,
            },
            {
                name: "Pay Amount",
                selector: (row) => row?.totalPay,
                sortable: true,  
            },
            {
                name: "Due Amount",
                selector: (row) => row?.totalDue,
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
            <div>
                {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                    <div className='row'>

                        <div className="col-md-4 col-lg-4 col-12" >

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

                        </div>
                        <PageHeader1 pagetitle='All Payments' modalbutton={() => {
                            return <div className="col-auto d-flex w-sm-100">
                                <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100"  ><i className="icofont-plus-circle me-2 fs-6"></i>Add Payment</button>
                            </div>
                        }} />
                    </div>

                }
            </div>
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
                                                    data={table_rowindex}
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
            <Modal show={ismodal} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setIsmodal(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Payment</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="item" className="form-label">Payment </label>
                                    <input type="number" className="form-control" id="item" onChange={(e)=>setTotalPay(e.target.value)} />
                                </div>
                                {/* <div className="col-sm-12">
                             <label htmlFor="taxtno" className="form-label">Transaction  Image</label>
                             <input type="File" className="form-control" id="taxtno" name='file'  />
                         </div> */}
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={() => handleDuePayment(brand?._id)} >Pay</button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default BrandPayment