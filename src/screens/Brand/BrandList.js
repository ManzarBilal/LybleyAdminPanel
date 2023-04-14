import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { ToastMessage } from '../../components/common/ToastMessage';
import Avatar4 from "../../assets/images/lg/avatar4.svg";
const defaultBanner = "https://visme.co/blog/wp-content/uploads/2021/01/header-3.png"
function BrandList() {
    const [table_row, setTable_row] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");
    const [confirmBoxView,setConfirmBoxView]=useState(false);
    const [brandId,setBrandId]=useState("");
    const columns = () => {
        return [
            {
                name: " SR. NO.",
                selector: (row) =>  row?._id,
                sortable: true,
            },
            {
                name: "BRAND",
                selector: (row) => row?.brandName,
                cell: row => <div className='text-primary' style={{ cursor: "pointer" }} onClick={() => { handleViewDetail(row?._id) }}><img className="avatar rounded lg border" src={row?.brandLogo} alt="" /> <span className="px-2"><span   >{row.brandName}</span></span></div>,
                sortable: true, minWidth: "200px"
            },
            // {
            //     name: "REGISTER DATE",
            //     selector: (row) => new Date(row?.createdAt).toDateString(),
            //     sortable: true,

            // },
            {
                name: "MAIL",
                selector: (row) => row?.email,
                sortable: true
            },
            {
                name: "PHONE",
                selector: (row) => row?.contact,
                sortable: true
            },
            // {
            //     name: "ADDRESS",
            //     selector: (row) => row?.address,
            //     sortable: true,
            // },
            {
                name: "STATUS",
                selector: (row) => row?.status,
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {row?.approval === "DISAPPROVED" ? <button type="button" className="btn text-white btn-success" onClick={()=>approval(row?._id,"APPROVED")}>Approve</button>
                        : <button type="button" className="btn text-white btn-danger" onClick={()=>approval(row?._id,"DISAPPROVED")} >Disapprove</button>}

                </div>
            },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {/* <button onClick={() => { setIseditmodal(true) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button> */}
                    <button type="button" onClick={() => { handleBrand(row?._id) }} className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }
    async function onDeleteRow(row) {
        //eslint-disable-next-line
        var result = await table_row.filter((d) => { if (d !== row) { return d } });

        setTable_row([...result])
    }
    useEffect(() => {
        GetAllBrands()
        console.log(randomValue);
    }, [randomValue])
    const GetAllBrands = async () => {
        try {
            let response = await httpCommon.get("/getAllBrands")
            let { data } = response
            setTable_row(data)
        }
        catch (err) {
            console.log(err)
        }
    }
     const approval=async (_id,body)=>{
        try{
            let response= await httpCommon.patch(`/brandApproval/${_id}`,{approval:body});
            let {data}=response;
            let x = Math.random() * 5;
            setRandomValue(x);
            ToastMessage(data); 
        }catch(err){
            console.log(err);
        }
     }

     const deleteBrand=async ()=>{
          try{
            let response=await httpCommon.deleteData(`/deleteBrandBy/${brandId}`);
            let {data}=response;
            setConfirmBoxView(false);
            let x = Math.random() * 5;
            setRandomValue(x);
            ToastMessage(data); 
          }catch(err){
            console.log(err);
          }
     }
   const handleBrand=(id)=>{
       setBrandId(id)
       setConfirmBoxView(true);
   }
   
    const handleViewDetail = (id) => {
        const findData=table_row.find(obj=>{
            return obj._id===id
        })
        setViewDetail(findData)
        setIseditmodal(true);
       
    }
    // console.log(table_row)
    // console.log("viewDetail",viewDetail)
    return (
        <>
        <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Brand Information' modalbutton={() => {
                    return <div className="col-auto d-flex w-sm-100">
                        <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Brand</button>
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
                    <h5 className="modal-title  fw-bold" id="expeditLabel">Brand Details</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">

                    <div className="card-body d-flex profile-fulldeatil flex-column">
                        <div className="profile-block text-center w220 mx-auto">
                            <a href="#!">
                                <img src={viewDetail?.brandLogo ? viewDetail?.brandLogo : Avatar4} alt="brandLogo" className="avatar xl rounded img-thumbnail shadow-sm" />
                            </a>
                        </div>
                        <div className="profile-info w-100">
                            <h6 className="mb-0 mt-2 fw-bold d-block fs-6 text-center"> {viewDetail?.brandName}</h6>
                            <div className="row g-2 pt-2">

                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-id text-primary"></i>
                                        <span className="ms-2">{viewDetail?._id}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-ui-touch-phone text-primary"></i>
                                        <span className="ms-2">{viewDetail?.contact}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-email text-primary"></i>
                                        <span className="ms-2">{viewDetail?.email}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-address-book text-primary"></i>
                                        <span className="ms-2">{viewDetail?.address}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-license text-primary"></i>
                                        <span className="ms-2">{viewDetail?.gstNo}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="d-flex align-items-center">
                                        <i className="icofont-calendar text-primary"></i>
                                        <span className="ms-2">{new Date(viewDetail?.createdAt).toDateString()}</span>
                                    </div>
                                </div>
                                <div className="col-xl-12 mt-1">
                                    <div className="d-flex align-items-center mt-2 fw-bold">GST Document :
                                    </div>
                                    <div className='border' ><a className='text-primary ' rel="noopener noreferrer" href={viewDetail?.gstDocument} target='_blank'><u>{viewDetail?.gstDocument}</u></a></div>
                                </div>
                               
                                <div className="col-12 mt-1">
                                    <div className='pb-2 fw-bold'> Brand Banner</div>
                                    <div className="d-flex align-items-center">
                                        <img height="70" width="100%" alt='brandImage' src={viewDetail?.brandBanner ? viewDetail?.brandBanner : defaultBanner} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <div className="modal-footer">
                    {/* <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    {/* <button type="submit" className="btn btn-primary">Save</button> */}
                </div>

            </Modal>
            <Modal className="modal fade show" id="expadd" show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Brand</h5>
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
        <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteBrand}/>
        </>
    )
}
export default BrandList;