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
    const [adminBankDtl, setAdminBankDtl] = useState()
    const [brandBankDtl, setBrandBankDtl] = useState()
    const [table_row, setTable_row] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const [toDateFormat, setToDateFormat] = useState("");
    const [fromDateFormat, setFromDateFormat] = useState("");
    const [filter, setFilter] = useState(false)
    const [totalPay, setTotalPay] = useState("")
    const [randomValue, setRandomValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [ismodal, setIsmodal] = useState(false);
    const [notDue, setNotDue] = useState(false);

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
    const GetBrandBankDetails = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/bankDetailByBrand/${param?.id}`)
            let { data } = response
            setBrandBankDtl(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }
    const GetAdminBankDetails = async () => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        try {
            setLoading(true)
            let response = await httpCommon.get(`/bankDetailByBrand/${brandObj?._id}`)
            let { data } = response
            setAdminBankDtl(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }
    useEffect(() => {
        getDashBoardData()
        getTransactionData()
        GetBrandBankDetails()
        GetAdminBankDetails()
    }, [randomValue]);



    const handleOpen = () => {
        if (brand?.totalDue === 0) {
            setNotDue(true)
        }
        else {
            setIsmodal(true)
        }
    }
    const handleDuePayment = async (id) => {
        try {
            let userData = localStorage.getItem("user")
            let brandInfo = JSON.parse(userData)
            setDisable(true)
            const brandPayInfo=
            {
                "account_number":adminBankDtl?.accountNumber,
                "amount":(+totalPay) * 100,
                "currency":"INR",
                "mode":"NEFT",
                "purpose":"payout",
                "fund_account":{
                    "account_type":"bank_account",
                    "bank_account":{
                        "name":brandBankDtl?.accountHolderName,
                        "ifsc":brandBankDtl?.IFSC,
                        "account_number": brandBankDtl?.accountNumber
                    },
                    "contact":{
                        "name":brand?.brandName,
                        "email":brand?.email,
                        "contact":brand?.contact,
                        "type":"employee",
                        "reference_id":"12345",
                        "notes":{
                            "notes_key_1":"Tea, Earl Grey, Hot",
                            "notes_key_2":"Tea, Earl Grey… decaf."
                        }
                    }
                },
                "queue_if_low_balance":true,
                "reference_id":"Acme Transaction ID 12345",
                "narration":"Acme Corp Fund Transfer",
                "notes":{
                    "notes_key_1":"Beam me up Scotty",
                    "notes_key_2":"Engage"
                }
            }

            let response = await httpCommon.post(`/brandDuePayment`, brandPayInfo)
            let { data } = response

            if (data?.entity === "payout") {
                let response = await httpCommon.patch(`/updateTotalPay/${id}`, { totalPay: +totalPay })
                let { data } = response
                setDisable(false)
                setIsmodal(false)
                let x = Math.floor((Math.random() * 10) + 1);
                setRandomValue(x)
                ToastMessage(data);
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    const table_rowindex = table_row?.map((item, i) => ({ ...item, i: i + 1 }))
    const filterindex = filterData?.map((item, i) => ({ ...item, i: i + 1 }))


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
    const handleToDate = (e) => {
        const getToDateValue = e.target.value;
        const date = new Date(getToDateValue)

        // const setFormat=getToDateValue.split("-")
        // const setToYear=setFormat[0]
        // const setToMonth=setFormat[1]
        // const setToDate=setFormat[2]
        // const dateFill=setToYear+""+setToMonth+""+setToDate
        setToDateFormat(date)

    }
    const handleFromDate = (e) => {
        const getFromDateValue = e.target.value;
        const date = new Date(getFromDateValue)
        setFromDateFormat(date)

    }
    const getFilteredData = () => {
        let data = table_row.filter(item => {
            let date = new Date(item.createdAt).getTime();

            return date >= toDateFormat && date <= fromDateFormat;
        })
        setFilter(true)
        setFilterData(data)


    }

    const data = filter === true ? filterindex : table_rowindex;
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
                                <button type="button" onClick={() => handleOpen()} className="btn btn-primary btn-set-task w-sm-100"  ><i className="icofont-plus-circle me-2 fs-6"></i>Add Payment</button>
                            </div>
                        }} />
                    </div>

                }
            </div>
            <div className='row mb-4'>
                <div className='col-12 col-md-3 col-lg-3'>
                    <input type='date' className='form-control' placeholder='dd-mm-yyyy' onChange={(e) => handleToDate(e)} />
                </div>
                <div className='col-12 col-md-3 col-lg-3'>
                    <input type='date' className='form-control' placeholder='dd-mm-yyyy' onChange={(e) => handleFromDate(e)} />
                </div>
                <div className='col-12 col-md-3 col-lg-3'>
                    <button className='btn btn-primary' onClick={(e) => getFilteredData()}>Filter</button>
                </div>
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
                                                data={data}
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
                                    <input type="number" className="form-control" id="item" onChange={(e) => setTotalPay(e.target.value)} />
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
                    <button type="submit" className="btn btn-primary" disabled={disable} onClick={() => handleDuePayment(brand?._id)} >Pay</button>
                </Modal.Footer>

            </Modal>
            <Modal show={notDue} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setNotDue(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">  Due Payment</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        You have  not due payment this Brand.
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setNotDue(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                </Modal.Footer>

            </Modal>
        </>
    )
}

export default BrandPayment