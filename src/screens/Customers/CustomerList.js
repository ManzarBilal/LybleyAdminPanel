import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import { CustomerData } from '../../components/Data/CustomerData';
import httpCommon from "../../http-common"
import { ReactLoader } from '../../components/common/ReactLoader';

function CustomerList() {
    const [table_row, setTable_row] = useState([...CustomerData.rows]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState("");
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        allCustomers();
    }, [refresh])
    // const data=useSelector(state=>state?.userDetail);

    const columns = () => {
        return [
            // {
            //     name: " ID",
            //     selector: (row) => row._id,
            //     sortable: true,
            // },
            {
                name: "CUSTOMER",
                selector: (row) => row.name,
                //cell: row => <><img className="avatar rounded lg border" src={row.image} alt="" /> <span className="px-2"><Link to={process.env.PUBLIC_URL + '/customer-detail'}>{row.name}</Link></span></>,
                sortable: true, width: "150px"
            },
            {
                name: "ROLE",
                selector: (row) => row.role,
                sortable: true, width: "100px"
            },
            {
                name: "REGISTER DATE",
                selector: (row) => new Date(row?.createdAt)?.toLocaleDateString(),
                sortable: true, width: "150px"

            },
            {
                name: "MAIL",
                selector: (row) => row.email,
                sortable: true, width: "180px"
            },
            {
                name: "PHONE",
                selector: (row) => row.contact,
                sortable: true, width: "110px"
            },

            {
                name: "DOCUMENT",
                selector: (row) => { },
                sortable: true, width: "150px",
                cell: (row) => <div className='text-primary text-decoration-underline'><a href={row.document} className='text-primary'> {row.document} </a></div>
            },
            {
                name: "DISCOUNT STATUS",
                selector: (row) => { },
                sortable: true, width: "180px",
                cell: (row) => row.role === "Reseller" && <button className={`btn text-white ${row.discount === "NOT_VERIFIED" ? "btn-danger" : "btn-success"}`} onClick={() => { row.discount === "NOT_VERIFIED" ? verifyCustomer(row._id) : notVerifyCustomer(row._id) }}>{row.discount}</button>
            },
            // {
            //     name: "COUNTRY",
            //     selector: (row) => row.country,
            //     sortable: true,
            // },
            // {
            //     name: "TOTAL ORDER",
            //     selector: (row) => row.order,
            //     sortable: true,
            // },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {/* <button onClick={() => { setIseditmodal(true) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button> */}
                    <button type="button" onClick={() => { onDeleteRow(row) }} className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }

    const allCustomers = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/allUserDetail");
            let { data } = response;
            setData(data);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

    const verifyCustomer = async (id) => {
        try {
            let response = await httpCommon.patch(`/verifyReseller/${id}`, { discount: "VERIFIED" });
            let { data } = response;
            setRefresh(data);
        } catch (err) {
            console.log(err);
        }
    }
    const notVerifyCustomer = async (id) => {
        try {
            let response = await httpCommon.patch(`/notVerifyReseller/${id}`, { discount: "NOT_VERIFIED" });
            let { data } = response;
            setRefresh(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function onDeleteRow(row) {
        //eslint-disable-next-line
        var result = await table_row.filter((d) => { if (d !== row) { return d } });

        setTable_row([...result])
    }

    return (
        <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Customers Information' modalbutton={() => {
                    return <div className="col-auto d-flex w-sm-100">
                        <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Customers</button>
                    </div>
                }} />
                <div className="row clearfix g-3">
                    <div className="col-sm-12">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
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
                        }
                    </div>
                </div>
            </div>
            <Modal show={iseditmodal} onHide={() => { setIseditmodal(false) }} className="" style={{ display: 'block' }}>
                <Modal.Header className="modal-header" closeButton>
                    <h5 className="modal-title  fw-bold" id="expeditLabel"> Edit Customers</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">

                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlhtmlFor="item1" className="form-label">Customers Name</label>
                                    <input type="text" className="form-control" id="item1" value="Joan Dyer" onChange={() => { }} />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlhtmlFor="taxtno1" className="form-label">Customers Profile</label>
                                    <input type="file" className="form-control" id="taxtno1" onChange={() => { }} />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" value="South Africa" onChange={() => { }} />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlhtmlFor="abc1" className="form-label">Customers Register date</label>
                                    <input type="date" className="form-control w-100" id="abc1" value="2021-03-12" onChange={() => { }} />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlhtmlFor="mailid" className="form-label">Mail</label>
                                    <input type="text" className="form-control" id="mailid" value="JoanDyer@gmail.com" onChange={() => { }} />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlhtmlFor="phoneid" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phoneid" value="202-555-0983" onChange={() => { }} />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label className="form-label">Total Order</label>
                                    <input type="text" className="form-control" value="02" onChange={() => { }} />
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>

            </Modal>
            <Modal className="modal fade show" id="expadd" show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Customers</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="item" className="form-label">Customers Name</label>
                                    <input type="text" className="form-control" id="item" />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="taxtno" className="form-label">Customers Profile</label>
                                    <input type="File" className="form-control" id="taxtno" />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlFor="depone" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="depone" />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="abc" className="form-label">Customers Register date</label>
                                    <input type="date" className="form-control w-100" id="abc" />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlFor="abc11" className="form-label">Mail</label>
                                    <input type="text" className="form-control" id="abc11" />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="abc111" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="abc111" />
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label className="form-label">Total Order</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                    <button type="submit" className="btn btn-primary">Add</button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}
export default CustomerList;