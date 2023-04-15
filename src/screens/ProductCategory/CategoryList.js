import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from "../../components/common/ToastMessage";

function CategoryList() {
    const [table_row, setTable_row] = useState([]);
    const [randomValue, setRandomValue] = useState("");
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [id,setCatId]=useState("");

    const columns = () => {
        return [
            {
                name: " ID",
                selector: (row) => row?._id,
                sortable: true,
            },
            {
                name: "CATEGORY NAME",
                selector: (row) => row?.categoryName,
                sortable: true, minWidth: "200px"
            },
            {
                name: "CATEGORY IMAGE",
                cell: row => <><img className="avatar rounded lg border" src={row?.categoryImage} alt="" /> </>,
                sortable: true, minWidth: "200px"
            },
            {
                name: "STATUS",
                selector: (row) => row?.status,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {row?.status === "INACTIVE" ? <button type="button" className="btn text-white btn-success" onClick={() => approval(row?._id, "ACTIVE")}>ACTIVE</button>
                        : <button type="button" className="btn text-white btn-danger" onClick={() => approval(row?._id, "INACTIVE")} >INACTIVE</button>}

                </div>,
                sortable: true,
            },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => { edit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                    <button type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }

    useEffect(() => {
        GetAllCategory()
    }, [randomValue])
    const GetAllCategory = async () => {
        try {
            let user = localStorage.getItem("user");
            let obj=JSON.parse(user);
            const id = obj?._id;
            let response = await httpCommon.get(`/getProductCategoryBy/${id}`)
            let { data } = response
            setTable_row(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                setCategoryImage(e.target.files[0]);
            }
        }
    };

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                setCategoryImage(e.target.files[0]);
                imageUpload(e.target.files[0]);
            }
        }
    };

    const approval = async (_id, body) => {
        try {
            let response = await httpCommon.patch(`/updateProductCategoryBy/${_id}`, { status: body });
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
        setCategoryName(editData?.categoryName);
        setCatId(id);
    }

    const imageUpload=async(obj)=>{
          try{
            const formData = new FormData();
            formData.append("categoryImage",obj);
            let response=await httpCommon.patch(`/updateProductCategoryImageBy/${id}`,{categoryImage:formData});
            let {data}=response;
            ToastMessage(data);
          }catch(err){
            console.log(err);
          }
    }
    const editCategory=async()=>{
          try{
            const formData = new FormData();
            formData.append("categoryName",categoryName);
            let response=await httpCommon.patch(`/updateProductCategoryBy/${id}`,{categoryName:categoryName});
            let {data}=response;
            setIseditmodal(false)
            let x=Math.random * 5;
            setRandomValue(x)
            ToastMessage(data);
          }catch(err){
            console.log(err);
          }
    }
    const addCategory=async ()=>{
        try{
            let user=localStorage.getItem("user");
            let obj=JSON.parse(user);
            const formData = new FormData();
            formData.append("userId",user?._id);
            formData.append("categoryName",categoryName);
            let response=await httpCommon.post("/addProductCategory",formData);
            let {data}=response;
            setIsmodal(false)
            let x=Math.random * 5;
            setRandomValue(x)
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
                <PageHeader1 pagetitle='All Category' modalbutton={() => {
                    return <div className="col-auto d-flex w-sm-100">
                        <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100"  ><i className="icofont-plus-circle me-2 fs-6"></i>Add Category</button>
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
                                    <input type="text" className="form-control" id="item1" name="categoryName" value={categoryName} onChange={(e)=>setCategoryName(e.currentTarget.value)} />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlhtmlFor="taxtno1" className="form-label">Category Image</label>
                                    <input type="File" className="form-control" name='file' id="taxtno1" onChange={(e) => {handleFileUpload(e) }} />
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={()=>editCategory()}>Save</button>
                </div>

            </Modal>
            <Modal show={ismodal}   style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setIsmodal(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Category</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="item" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="item" value={categoryName} onChange={(e) => setCategoryName(e.currentTarget.value)} />
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="taxtno" className="form-label">Category Image</label>
                                    <input type="File" className="form-control" id="taxtno" name='file' onChange={(e) => handleFileChange(e)} />
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={addCategory}>Add</button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}
export default CategoryList;