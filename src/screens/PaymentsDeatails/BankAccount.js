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


const defaultBanner = "https://visme.co/blog/wp-content/uploads/2021/01/header-3.png"
function BankAccount() {
    const [table_row, setTable_row] = useState();
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");

    const [loading, setLoading] = useState(false)



    useEffect(() => {
        GetBankDetails()
    }, [randomValue])
    const GetBankDetails = async () => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        try {
            setLoading(true)
            let response = await httpCommon.get(`/bankDetailByBrand/${brandObj?._id}`)
            let { data } = response
            setTable_row(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }


    const validationSchema = Yup.object().shape({
        accountHolderName: Yup.string().required(' Account Holder Name is required')
            .min(4, "Account Holder Name must be at least 4 characters"),
        accountNumber: Yup.string()
            .required('Account Number is required')
            .min(5, 'Account Number must be at least 5 characters'),

        bankName: Yup.string()
            .required('Bank Name is required')
            .min(4, 'Bank Name must be at least 4 characters'),
        IFSC: Yup.string()
            .required('IFSC code is required')
            .min(4, 'IFSC code must be at least 4 characters'),

    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const signUp = async (obj) => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        let accObj = {
            brandId: brandObj?._id,
            accountHolderName: obj?.accountHolderName,
            accountNumber: obj?.accountNumber,
            bankName: obj?.bankName,
            IFSC: obj?.IFSC,
        }

        try {
            let response = await httpCommon.post("/addBankDetails", accObj);
            let { data } = response;
            setIsmodal(false)
            ToastMessage(data)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
        } catch (err) {
            console.log(err);
        }
    }


    const onRegister = data => {
        signUp(data);
    }
    const onUpdate = data => {
        updateBankDetail(data);
    }
    const handleBrandEdit = (obj) => {
        setIseditmodal(true)
    }

    const updateBankDetail = async (obj) => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        let accObj = {
            brandId: brandObj?._id,
            accountHolderName: obj?.accountHolderName,
            accountNumber: obj?.accountNumber,
            bankName: obj?.bankName,
            IFSC: obj?.IFSC,
        }

        try {
            let response = await httpCommon.patch(`/updateBankDetails/${table_row?._id}`, accObj);
            let { data } = response;
            setIseditmodal(false)
            ToastMessage(data)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <PageHeader1 pagetitle='Brand Information' modalbutton={() => {
                        return <>{ !table_row && <div className="col-auto d-flex w-sm-100">
                            <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Bank Account</button>
                        </div>
                        }
                        </>
                    }} />
                    <div className="row clearfix g-3">
                        <div className="col-sm-12">
                            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                                : <>

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Account Holder Name</th>
                                                                    <th scope="col">Bank Nmae</th>
                                                                    <th scope="col">IFSC Code</th>
                                                                    <th scope="col">Account Number</th>
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            {table_row &&
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">{table_row?.accountHolderName}</th>
                                                                        <td>{table_row?.bankName}</td>
                                                                        <td>{table_row?.IFSC}</td>
                                                                        <td>{table_row?.accountNumber}</td>
                                                                        <td>
                                                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                                                <button onClick={() => { handleBrandEdit(table_row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            }
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            }
                        </div>
                    </div>
                </div>
                <Modal show={iseditmodal} onHide={() => { setIseditmodal(false) }} className="" style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expeditLabel">Bank Details</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form">
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Account Holder Name</label>
                                    <input type="text" defaultValue={table_row?.accountHolderName} className={(errors && errors.accountHolderName) ? "form-control   border-danger " : "form-control  "} placeholder="Account Holder Name"
                                        {...register('accountHolderName')}

                                    />
                                    <div className='text-danger'>
                                        {errors.accountHolderName?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Account Number</label>
                                    <input type="text" defaultValue={table_row?.accountNumber} className={(errors && errors.accountNumber) ? "form-control  border-danger " : "form-control"} placeholder=" 44545545454544"
                                        {...register('accountNumber')}

                                    />
                                    <div className='text-danger'>
                                        {errors.accountNumber?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Bank Name</label>
                                    <input type="text" defaultValue={table_row?.bankName} className={(errors && errors.bankName) ? "form-control border-danger " : "form-control "} placeholder="Bank Name"
                                        {...register('bankName')}

                                    />
                                    <div className='text-danger'>
                                        {errors.bankName?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> IFSC Code</label>
                                    <input type="text" defaultValue={table_row?.IFSC} className={(errors && errors.IFSC) ? "form-control   border-danger " : "form-control "} placeholder="IFSC code"
                                        {...register('IFSC')}

                                    />
                                    <div className='text-danger'>
                                        {errors.IFSC?.message}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Modal.Body>
                    <div className="modal-footer">
                        <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit(onUpdate)} >Save</button>
                    </div>

                </Modal>
                <Modal className="modal fade show" id="expadd" show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expaddLabel">Add Bank Account</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form">
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Account Holder Name</label>
                                    <input type="text" className={(errors && errors.accountHolderName) ? "form-control   border-danger " : "form-control  "} placeholder="Account Holder Name"
                                        {...register('accountHolderName')}

                                    />
                                    <div className='text-danger'>
                                        {errors.accountHolderName?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Account Number</label>
                                    <input type="text" className={(errors && errors.accountNumber) ? "form-control  border-danger " : "form-control"} placeholder=" 44545545454544"
                                        {...register('accountNumber')}

                                    />
                                    <div className='text-danger'>
                                        {errors.accountNumber?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Bank Name</label>
                                    <input type="text" className={(errors && errors.bankName) ? "form-control border-danger " : "form-control "} placeholder="Bank Name"
                                        {...register('bankName')}

                                    />
                                    <div className='text-danger'>
                                        {errors.bankName?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> IFSC Code</label>
                                    <input type="text" className={(errors && errors.IFSC) ? "form-control   border-danger " : "form-control "} placeholder="IFSC code"
                                        {...register('IFSC')}

                                    />
                                    <div className='text-danger'>
                                        {errors.IFSC?.message}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit(onRegister)} className="btn btn-primary">Add Account</button>
                    </Modal.Footer>

                </Modal>

            </div>

        </>
    )
}
export default BankAccount;