import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from "../../components/common/ToastMessage";
import { ConfirmBox } from '../../components/common/ConfirmBox';

function FaultList() {
    const [table_row, setTable_row] = useState([]);
    const [randomValue, setRandomValue] = useState("");
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [faultName, setFaultName] = useState("");
    const [id,setCatId]=useState("");
    const [brandId, setBrandId] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);

const index=1;
    const columns = () => {
        return [
            {
                name: " ID",
                selector: (row) => row?._id ,
                sortable: true,
            },
            {
                name: "FAULT NAME",
                selector: (row) => row?.faultName,
                sortable: true, minWidth: "400px"
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

    useEffect(() => {
        GetAllFault()
    }, [randomValue])
    const GetAllFault = async () => {
        try {
            let user = localStorage.getItem("user");
            let obj=JSON.parse(user);
            const id = obj?._id;
            let response = await httpCommon.get(`/getFaultBy/${id}`)
            let { data } = response
            setTable_row(data)
        }
        catch (err) {
            console.log(err)
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

    const edit=(id)=>{
        setIseditmodal(true);
        let table_row1=[...table_row];
        let editData=table_row1.find(c1=>c1._id===id);
        setFaultName(editData?.faultName);
        setCatId(id);
    }
 
    const editFault=async()=>{
          try{            
            let response=await httpCommon.patch(`/updateFaultBy/${id}`,{faultName:faultName});
            let {data}=response;
            setIseditmodal(false)
            let x=Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
            ToastMessage(data);
          }catch(err){
            console.log(err);
          }
    }
    const addFault=async ()=>{
        try{
            let user=localStorage.getItem("user");
            let obj=JSON.parse(user);
            const dataObj={faultName:faultName,userId:obj?._id}
            let response=await httpCommon.post("/addFault",dataObj);
            let {data}=response;
            setIsmodal(false)
            let x=Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
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
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleFault = (id) => {
        setBrandId(id)
        setConfirmBoxView(true);
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
                        <div className="card mb-3">
                            <div className="card-body">
                                <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <DataTable
                                                columns={columns()}
                                                data={table_row}
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
                                    <input type="text" className="form-control" id="item1" name="faultName" value={faultName} onChange={(e)=>setFaultName(e.currentTarget.value)} />
                                </div>
                                
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={()=>editFault()}>Save</button>
                </div>

            </Modal>
            <Modal show={ismodal}   style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setIsmodal(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Fault</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="item" className="form-label">Fault Name</label>
                                    <input type="text" className="form-control" id="item" value={faultName} onChange={(e) => setFaultName(e.currentTarget.value)} />
                                </div>
                                
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={addFault}>Add</button>
                </Modal.Footer>

            </Modal>
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteFault} />

        </div>
    )
}
export default FaultList;