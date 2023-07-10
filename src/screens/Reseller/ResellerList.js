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
import { useDispatch } from 'react-redux';
import { userEmail } from '../../Redux/Actions/userEmail';

const defaultBanner = "https://visme.co/blog/wp-content/uploads/2021/01/header-3.png"
function ResellerList(props) {
    const [table_row, setTable_row] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);
    const [brandId, setBrandId] = useState("");
    const [loading, setLoading] = useState(false)

    const [gstView, setGstView] = useState(false)
    const [gstDocument, setGstDocument] = useState("")
    const [brandLogo, setBrandLogo] = useState("")

    const columns = () => {
        return [

            {
                name: "BRAND",
                selector: (row) => row?.brandName,
                cell: row => <div className='text-primary' style={{ cursor: "pointer" }} onClick={() => { handleViewDetail(row?._id) }}><img className="avatar rounded lg border" src={row?.brandLogo} alt="" /> <span className="px-2"><span   >{row.brandName}</span></span></div>,
                sortable: true, minWidth: "200px"
            },

            {
                name: "EMAIL",
                selector: (row) => row?.email,
                sortable: true
            },
            {
                name: "PHONE",
                selector: (row) => row?.contact,
                sortable: true
            },
            {
                name: "ADDRESS",
                selector: (row) => row?.address,
                sortable: true,
            },
            {
                name: "STATUS",
                selector: (row) => row?.status,
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    {row?.approval === "DISAPPROVED" ? <button type="button" className="btn text-white btn-danger" onClick={() => approval(row?._id, "APPROVED")}>DisApprove</button>
                        : <button type="button" className="btn text-white btn-success" onClick={() => approval(row?._id, "DISAPPROVED")} >Approve</button>}

                </div>
            },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <div style={{ cursor: "pointer" }}><Link className='ps-2 pe-2 text-decoration' to={props?.url + `/reseller-dashboard/${row?._id}`} >
                        <button type="button" onClick={() => { handleBrand(row?._id) }} className="btn btn-outline-secondary deleterow"><i className="icofont-eye-alt text-info"></i></button></Link>
                    </div>
                    <button onClick={() => { handleBrandEdit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                    <button type="button" onClick={() => { handleBrand(row?._id) }} className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }

    useEffect(() => {
        GetAllBrands()
    }, [randomValue])
    const GetAllBrands = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllBrands")
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
            let response = await httpCommon.patch(`/brandApproval/${_id}`, { approval: body });
            let { data } = response;
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteBrand = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteBrandBy/${brandId}`);
            let { data } = response;
            setConfirmBoxView(false);
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleBrand = (id) => {
        setBrandId(id)
        setConfirmBoxView(true);
    }
    const handleBrandEdit = (id) => {
        // const findData = table_row.find(obj => {
        //     return obj._id === id
        // })
        // setBrandId(id)
        // setBrandImage(findData?.brandLogo)
        // setIseditmodal(true)
        history.push(props?.url + `/reseller-details/${id}`)
    }

    const handleViewDetail = (id) => {
        const findData = table_row.find(obj => {
            return obj._id === id
        })
        setViewDetail(findData)
        setIseditmodal(true);

    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(' Brand Name is required')
            .min(4, "Brand Name must be at least 4 characters"),
        // contact: Yup.string()
        //     .required('Contact No. is required')
        //     .min(10, 'Contact No. must be at least 10 characters')
        //     .max(10, 'Contact No. must not exceed 10 characters'),
        // gstNo: Yup.string()
        //     .required('GST No. is required')
        //     .min(10, 'GST No. must be at least 10 characters'),
        // address: Yup.string()
        //     .required('address is required')
        //     .min(10, 'address must be at least 10 characters'),
        // email: Yup.string()
        //     .required('Email is required')
        //     .email('Email is invalid'),
        // gstDocument: Yup.mixed().test("file", "You need to provide a file", (value) => {
        //     if (value.length > 0) {
        //         return true;
        //     }
        //     return false;
        // }),
        // password: Yup.string()
        //     .required('Password is required')
        //     .min(8, 'Password must be at least 8 characters')
        //     .max(40, 'Password must not exceed 40 characters'),
        // confirmPassword: Yup.string()
        //     .required('Confirm Password is required')
        //     .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        // chooseCb: Yup.bool().oneOf([true], 'Please fill the box')
    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "gstDocument") {
                setGstDocument(e.target.files[0]);
            }
            if (e.target.name === "brandLogo") {
                setBrandLogo(e.target.files[0]);
            }
        }
    };

    const signUp = async (obj) => {
        try {
            const formData = new FormData()
            // formData.append("gstDocument", gstDocument);
            // formData.append("gstNo", obj.gstNo);
            formData.append("brandName", obj.name,)
            formData.append("brandLogo", brandLogo,)
            // formData.append("address", obj.address,)
            // formData.append("email", obj.email,)
            // formData.append("contact", +obj.contact,)
            // formData.append("password", obj.password,)


            // const fullData={...body ,gstDocument:gstDocument}
            // console.log(fullData,"fullData");
            let response = await httpCommon.post("/brandRegistration", formData);
            let { data } = response;
            ToastMessage(data)
            if (data.status === true) {
                history.push(`${"/user/verification"}`)
            }
            else return null;
        } catch (err) {
            console.log(err);
        }
    }
    const dispatch = useDispatch()
    const history = useHistory()
    const onRegister = data => {
        // console.log("data", gstDocument);
        setGstView(true)
        signUp(data);
        dispatch(userEmail(data?.email))
    }

    const [file, setFile] = useState("")
    const [brandImage, setBrandImage] = useState("")


    const handleFileChangeImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
    };
    const uploadBrandLogo = async () => {

        const formData = new FormData();
        formData.append("file", file);
        try {
            let response = await httpCommon.patch(`/updateBrandLogoBy/${brandId}`, formData);
            let { data } = response;
            setFile("")
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
            setIseditmodal(false)
        } catch (err) {
            console.log(err);
        }
    }

    const resellerData=table_row?.filter(f1=>f1?.role==="RESELLER");
 
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
                            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                                : <div className="card mb-3">
                                    <div className="card-body">
                                        <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <DataTable
                                                        columns={columns()}
                                                        data={resellerData}
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
                        <h5 className="modal-title  fw-bold" id="expeditLabel">Brand Details</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">

                        <div className="card-body d-flex profile-fulldeatil flex-column">
                            <div className="profile-block text-center w220 mx-auto">
                                <a href="#!">
                                    <img src={brandImage ? brandImage : Avatar4} alt="brandLogo" className="avatar xl rounded img-thumbnail shadow-sm" />
                                </a>
                            </div>
                            <div className="profile-info w-100">
                                <h6 className="mb-0 mt-2 fw-bold d-block fs-6 text-center"> {viewDetail?.brandName}</h6>
                                <div className="row g-2 pt-2">

                                    <div className="col-md-6 col-sm-12">
                                        <div className="mt-2 mb-1">
                                            <label className="form-label">Upload Brand Logo</label>
                                            <input type="file" name="file" onChange={(e) => handleFileChangeImage(e)} id="myfile" className="form-control"


                                            />

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <div className="modal-footer">
                        <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={uploadBrandLogo}>Save</button>
                    </div>

                </Modal>
                <Modal show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expaddLabel">Add Brand</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form">
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Brand name</label>
                                    <input type="email" className={(errors && errors.name) ? "form-control   border-danger " : "form-control  "} placeholder="Brand name"
                                        {...register('name')}

                                    />
                                    <div className='text-danger'>
                                        {errors.name?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Brand Logo</label>
                                    <input type="file" name="brandLogo" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"


                                    />

                                </div>
                            </div>
                            {/* <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className={(errors && errors.email) ? "form-control  border-danger " : "form-control"} placeholder="name@example.com"
                                        {...register('email')}

                                    />
                                    <div className='text-danger'>
                                        {errors.email?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Contact No.</label>
                                    <input type="number" className={(errors && errors.contact) ? "form-control border-danger " : "form-control "} placeholder="Contact No."
                                        {...register('contact')}

                                    />
                                    <div className='text-danger'>
                                        {errors.contact?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">GST No.</label>
                                    <input type="text" className={(errors && errors.gstNo) ? "form-control   border-danger " : "form-control "} placeholder="GST No."
                                        {...register('gstNo')}

                                    />
                                    <div className='text-danger'>
                                        {errors.gstNo?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Upload GST Document</label>
                                    <input type="file" name="gstDocument" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                                   

                                    />
                                    {gstView ? <> {gstDocument === "" ? <div className='text-danger'>
                                        Gst Document is required.
                                    </div> : ""}
                                    </> : ""}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Address</label>
                                    <input type="text" className={(errors && errors.address) ? "form-control   border-danger " : "form-control "} placeholder="address"
                                        {...register('address')}

                                    />
                                    <div className='text-danger'>
                                        {errors.address?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Password</label>
                                    <input type="email" className={(errors && errors.password) ? "form-control  border-danger " : "form-control  "} placeholder="8+ characters required"
                                        {...register('password')}

                                    />
                                    <div className='text-danger'>
                                        {errors.password?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Confirm password</label>
                                    <input type="email" className={(errors && errors.confirmPassword) ? "form-control  border-danger " : "form-control "} placeholder="8+ characters required"
                                        {...register('confirmPassword')}

                                    />
                                    <div className='text-danger'>
                                        {errors.confirmPassword?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input type="checkbox" value="" id="flexCheckDefault"
                                        {...register('chooseCb')}
                                        className={`form-check-input ${errors.chooseCb ? 'is-invalid' : ''
                                            }`}
                                    />

                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        I accept the <Link to="#!" title="Terms and Conditions" className="text-secondary">Terms and Conditions</Link>
                                    </label>
                                    
                                </div>
                            </div> */}
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <button onClick={() => setIsmodal(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit(onRegister)} className="btn btn-primary">Add Brand</button>
                    </Modal.Footer>

                </Modal>

            </div>
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteBrand} />
        </>
    )
}
export default ResellerList;