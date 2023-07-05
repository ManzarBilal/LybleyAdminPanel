import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from "../../components/common/ToastMessage";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/Actions/product';
import { ReactLoader } from '../../components/common/ReactLoader';

function FaultList() {
    const [table_row, setTable_row] = useState([]);
    const [randomValue, setRandomValue] = useState("");
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [fault, setFault] = useState({ faultName: "", productId: "", productModel: "" });
    const [id, setCatId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)



    let table_row1 = table_row.map((t1, i) => ({ ...t1, i: i + 1 }));
    const columns = () => {
        return [
            {
                name: "Sr. No.",
                selector: (row) => row?.i,
                sortable: true,
            },
            {
                name: "FAULT NAME",
                selector: (row) => row?.faultName,
                sortable: true, minWidth: "350px"
            },
            {
                name: "PRODUCT NAME",
                selector: (row) => row?.productModel,
                sortable: true,
            },
            {
                name: "STATUS",
                selector: (row) => row?.status,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {row?.status === "INACTIVE" ? <button type="button" className="btn text-white btn-danger" onClick={() => approval(row?._id, "ACTIVE")}>INACTIVE</button>
                        : <button type="button" className="btn text-white btn-success" onClick={() => approval(row?._id, "INACTIVE")} >ACTIVE</button>}

                </div>,
                sortable: true,
            },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => { edit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                    <button onClick={() => { handleFault(row?._id) }} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }
    const dispatch = useDispatch();

    useEffect(() => {
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        dispatch(getProduct(obj?._id));
        obj?.role === 'ADMIN' ?  GetAllFault()
       : GetAllFaultByBrand()
    }, [randomValue, dispatch])

    const products = useSelector(state => state?.products)

    const GetAllFaultByBrand = async () => {
        try {
            setLoading(true)
            let user = localStorage.getItem("user");
            let obj = JSON.parse(user);
            const id = obj?._id;
            let response = await httpCommon.get(`/getFaultBy/${id}`);
            let { data } = response
            setTable_row(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }
    const GetAllFault = async () => {
        try {
            setLoading(true)
            let user = localStorage.getItem("user");
            let obj = JSON.parse(user);
            const id = obj?._id;
            let response = await httpCommon.get(`/getAllFault`)
            let { data } = response
            setTable_row(data)
            setLoading(false)

        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }



    const approval = async (_id, body) => {
        try {
            let response = await httpCommon.patch(`/updateFaultBy/${_id}`, { status: body });
            let { data } = response;
            let x = Math.random() * 5;
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    const edit = (id) => {
        setIseditmodal(true);
        let table_row1 = [...table_row];
        let editData = table_row1.find(c1 => c1._id === id);
        setFault({ faultName: editData?.faultName, productModel: editData?.productModel });
        setCatId(id);
    }

    const editFault = async () => {
        try {
            setLoading1(true);
            let response = await httpCommon.patch(`/updateFaultBy/${id}`, fault);
            let { data } = response;
            setLoading1(false);
            setIseditmodal(false)
           // let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(data);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const addFault = async () => {
        let product = products?.data?.find(p1 => p1?.productName === fault?.productModel);

        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        const dataObj = { faultName: fault?.faultName, productModel: product?.productName, productId: product?._id, userId: obj?._id }

        try {
            setLoading1(true);
            let response = await httpCommon.post("/addFault", dataObj);
            let { data } = response;
            setLoading1(false);
            setFault({ faultName: "", productId: "", productModel: "" })
            setIsmodal(false)
            setRandomValue(data);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const deleteFault = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteFaultBy/${brandId}`);
            let { data } = response;
            setConfirmBoxView(false);
            setRandomValue(data);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleFault = (id) => {
        setBrandId(id)
        setConfirmBoxView(true);
    }

    const handleChange = (e) => {
        const { currentTarget: input } = e;
        let fault1 = { ...fault };
        fault1[input.name] = input.value;
        setFault(fault1);
    }
    return (
        <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
                <PageHeader1 pagetitle='All Faults' modalbutton={() => {
                    return <div className="col-auto d-flex w-sm-100">
                        <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100"  ><i className="icofont-plus-circle me-2 fs-6"></i>Add Fault</button>
                    </div>
                }} />
                <div className="row clearfix g-3">
                    <div className="col-sm-12">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                            :
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <DataTable
                                                    columns={columns()}
                                                    data={table_row1}
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
                    <h5 className="modal-title  fw-bold" id="expeditLabel"> Edit Category</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">

                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlhtmlFor="item1" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="item1" name="faultName" value={fault?.faultName} onChange={(e) => setFault({ faultName: e.currentTarget.value })} />
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-body m-0 p-0">
                                        <label className="form-label">Product Model</label>
                                        <select className="form-select" name='productModel' value={fault?.productModel} onChange={handleChange}  >
                                            <option value="" selected>Choose Model</option>
                                            {products?.data?.map(c1 =>
                                                <option value={c1.productName} >{c1.productName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" disabled={loading1} className="btn btn-primary" onClick={() => editFault()}>{loading1 ? "Updating..." : "Update"}</button>
                </div>

            </Modal>
            <Modal show={ismodal} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setIsmodal(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Fault</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="item" className="form-label">Fault Name</label>
                                    <input type="text" className="form-control" id="item" value={fault?.faultName} onChange={(e) => setFault({ faultName: e.currentTarget.value })} />
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-body m-0 p-0">
                                        <label className="form-label">Product Model</label>
                                        <select className="form-select" name='productModel' value={fault?.productModel} onChange={handleChange}  >
                                            <option value="" selected>Choose Model</option>
                                            {products?.data?.map(c1 =>
                                                <option value={c1.productName} >{c1.productName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" disabled={loading1} className="btn btn-primary" onClick={addFault}>{loading1 ? "Adding..." : "Add"}</button>
                </Modal.Footer>

            </Modal>
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteFault} />

        </div>
    )
}
export default FaultList;