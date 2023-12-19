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
function PickupLocation() {
    const [table_row, setTable_row] = useState();
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");

    const [loading, setLoading] = useState(false)



    useEffect(() => {
        GetPickupLocation()
    }, [randomValue])
    const GetPickupLocation = async () => {
       
        try {
            let user = localStorage.getItem("user");
            let brandObj = JSON.parse(user);
            setLoading(true)
            let response = brandObj?.role==="ADMIN" ?
            await httpCommon.get(`/getAllPickupLocation`)
            : await httpCommon.get(`/getPickupLocationbyUser/${brandObj?._id}`)
       
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
        pickupLocation: Yup.string().required(' Account Holder Name is required')
            .min(4, "Pickup Location must be at least 4 characters"),
            email: Yup.string().required(' Email is required')
            .email( "Please enter a valid email address"), 
            phone: Yup.string().required(' phone is required')
            .min(10, "phone must be at least 10 characters")
            .max(10, "phone must be at least 10 characters"),
        city: Yup.string().required(' city is required')
            .min(4, "city must be at least 4 characters"),
        state: Yup.string().required(' state is required')
            .min(2, "state must be at least 2 characters"),
        pinCode: Yup.string()
            .required('Pin Code is required')
            .min(6, 'Pin Code must be at least 6 characters'),
            pinCode: Yup.string()
            .required('Pin Code is required')
            .max(6, 'Pin Code must be at least 6 characters'),
        address: Yup.string()
            .required('Address is required')
            .min(4, 'Address must be at least 4 characters'),

    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const AddPickup = async (obj) => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        let pickObj = {
            userId: brandObj?._id,
            name:brandObj?.brandName,
             pickupLocation:obj?.pickupLocation,
             email:obj?.email,
             phone:obj?.phone,
             city:obj?.city,
             state:obj?.state,
             pinCode:obj?.pinCode,
             address:obj?.address,
        }

        try {
            let response = await httpCommon.post("/addPickupLocation", pickObj);
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
        AddPickup(data);
    }
    const onUpdate = data => {
        updateDetail(data);
    }
    const handleBrandEdit = (obj) => {
        setIseditmodal(true)
    }

    const updateDetail = async (obj) => {
        let user = localStorage.getItem("user");
        let brandObj = JSON.parse(user);
        let pickObj = {
            userId: brandObj?._id,
            name:brandObj?.brandName,
             pickupLocation:obj?.pickupLocation,
             email:obj?.email,
             phone:obj?.phone,
             city:obj?.city,
             state:obj?.state,
             pinCode:obj?.pinCode,
             address:obj?.address,
        }

        try {
            let response = await httpCommon.patch(`/updatePickupLocation/${table_row?._id}`, pickObj);
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
                    <PageHeader1 pagetitle='Courier Information' modalbutton={() => {
                        return <>{!table_row && <div className="col-auto d-flex w-sm-100">
                            <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Pickup Location</button>
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
                                                                    <th scope="col">Brand Name</th>
                                                                    <th scope="col">Address Name</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Phone</th>
                                                                    <th scope="col">city</th>
                                                                    <th scope="col">state</th>
                                                                    <th scope="col">Country</th>
                                                                    <th scope="col">pickup address</th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                    <tr>
                                                            {table_row.map((item,i)=>
                                                                <>
                                                                        <th scope="row">{item?.name}</th>
                                                                        <td>{item?.pickupLocation}</td>
                                                                        <td>{item?.email}</td>
                                                                        <td>{item?.phone}</td>
                                                                        <td>{item?.state}</td>
                                                                        <td>{item?.pinCode}</td>
                                                                        <td>{item?.country}</td>
                                                                        <td>{item?.address}</td>
                                                                        {/* <td>
                                                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                                                <button onClick={() => { handleBrandEdit(table_row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                                                                            </div>
                                                                        </td> */}
                                                                        </>
                                                                    
                                                            )}
                                                            </tr>
                                                                </tbody>
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
                                    <label className="form-label"> Pickup Address Name</label>
                                    <input type="text" defaultValue={table_row?.pickupLocation} className={(errors && errors.pickupLocation) ? "form-control  border-danger " : "form-control"} placeholder=" Pickup Address Name"
                                        {...register('pickupLocation')}

                                    />
                                    <div className='text-danger'>
                                        {errors.pickupLocation?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Email</label>
                                    <input type="email"defaultValue={table_row?.email} className={(errors && errors.email) ? "form-control border-danger " : "form-control "} placeholder="Email"
                                        {...register('email')}

                                    />
                                    <div className='text-danger'>
                                        {errors.email?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Phone</label>
                                    <input type="number"defaultValue={table_row?.phone} className={(errors && errors.phone) ? "form-control   border-danger " : "form-control "} placeholder="Contact No"
                                        {...register('phone')}

                                    />
                                    <div className='text-danger'>
                                        {errors.phone?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label className="form-label"> City</label>
                                    <input type="text"defaultValue={table_row?.city} className={(errors && errors.city) ? "form-control   border-danger " : "form-control "} placeholder="City"
                                        {...register('city')}

                                    />
                                    <div className='text-danger'>
                                        {errors.city?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label className="form-label"> State</label>
                                    <input type="text"defaultValue={table_row?.state} className={(errors && errors.state) ? "form-control   border-danger " : "form-control "} placeholder="state"
                                        {...register('state')}

                                    />
                                    <div className='text-danger'>
                                        {errors.state?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Pincode</label>
                                    <input type="number"defaultValue={table_row?.pinCode} className={(errors && errors.pinCode) ? "form-control   border-danger " : "form-control "} placeholder="pinCode"
                                        {...register('pinCode')}

                                    />
                                    <div className='text-danger'>
                                        {errors.pinCode?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Address</label>
                                    <input type="text"defaultValue={table_row?.address} className={(errors && errors.address) ? "form-control   border-danger " : "form-control "} placeholder="address"
                                        {...register('address')}

                                    />
                                    <div className='text-danger'>
                                        {errors.address?.message}
                                    </div>
                                </div>

                            </div>


                        </div>
                    </Modal.Body>
                    <div className="modal-footer">
                        <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit(onUpdate)} >Update</button>
                    </div>

                </Modal>

                <Modal  show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expaddLabel">Add Bank Account</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form row">


                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Pickup Address Name</label>
                                    <input type="text" className={(errors && errors.pickupLocation) ? "form-control  border-danger " : "form-control"} placeholder=" Pickup Address Name"
                                        {...register('pickupLocation')}

                                    />
                                    <div className='text-danger'>
                                        {errors.pickupLocation?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Email</label>
                                    <input type="email" className={(errors && errors.email) ? "form-control border-danger " : "form-control "} placeholder="Email"
                                        {...register('email')}

                                    />
                                    <div className='text-danger'>
                                        {errors.email?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Phone</label>
                                    <input type="number" className={(errors && errors.phone) ? "form-control   border-danger " : "form-control "} placeholder="Contact No"
                                        {...register('phone')}

                                    />
                                    <div className='text-danger'>
                                        {errors.phone?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label className="form-label"> City</label>
                                    <input type="text" className={(errors && errors.city) ? "form-control   border-danger " : "form-control "} placeholder="City"
                                        {...register('city')}

                                    />
                                    <div className='text-danger'>
                                        {errors.city?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-1">
                                    <label className="form-label"> State</label>
                                    <input type="text" className={(errors && errors.state) ? "form-control   border-danger " : "form-control "} placeholder="state"
                                        {...register('state')}

                                    />
                                    <div className='text-danger'>
                                        {errors.state?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Pincode</label>
                                    <input type="number" className={(errors && errors.pinCode) ? "form-control   border-danger " : "form-control "} placeholder="pinCode"
                                        {...register('pinCode')}

                                    />
                                    <div className='text-danger'>
                                        {errors.pinCode?.message}
                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Address</label>
                                    <input type="text" className={(errors && errors.address) ? "form-control   border-danger " : "form-control "} placeholder="address"
                                        {...register('address')}

                                    />
                                    <div className='text-danger'>
                                        {errors.address?.message}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit(onRegister)} className="btn btn-primary">Add Location</button>
                    </Modal.Footer>

                </Modal>

            </div>

        </>
    )
}
export default PickupLocation;