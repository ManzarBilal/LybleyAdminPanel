import React, { useEffect, useState } from 'react'

import httpCommon from "../../http-common"
import { ReactLoader } from './ReactLoader'
import { Link } from 'react-router-dom';

export const Notification = (props) => {

    const [notifications, setNotifications] = useState([])
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getAllNotification()
        GetAllBrands()
       
    }, [])


    const getAllNotification = async () => {
        try {
            setLoading(true)

            let response = await httpCommon.get("/allNotification");
            let { data } = response;
            setLoading(false)
            setNotifications(data);

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    const GetAllBrands = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllBrands")
            let { data } = response
            setBrands(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }

    const brand = brands?.filter(fe => notifications?.find(f1 => f1?.brandId === fe._id));
    // console.log(brand, "brand");
    // console.log(notifications, "getAllNotification");
    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)
    // console.log(user, "user");

    const notification = user?.role === "ADMIN" ? notifications : notifications?.filter(f1 => f1?.brandId === user?._id);
    const notification1 = notification?.map(n1 => ({ ...n1, brandName: brands?.find(f1 => f1?._id === n1?.brandId)?.brandName }))?.reverse();

    // console.log("notification1",props);

//    console.log(props?.showDropdown,"props?.showDropdown");
    return (
        <div className={props?.showDropdown===true ? "" : "d-none"}>

            <div className="card border-0 w380">
                <div className="card-header border-0 p-3">
                    <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                        <span>Notifications</span>
                        <span className="badge text-white">{notification1?.length}</span>
                    </h5>
                </div>
                <div className=" card-body">
                    <div className="">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> : <ul className="list-unstyled list mb-0">
                            {notification1?.map((item, i) =>
                                <li key={i} className="py-2 mb-1 border-bottom">
                                    <div className="d-flex">
                                        {/* <img className="avatar rounded-circle" src={Avatar1} alt="" /> */}
                                        <div className="flex-fill ms-2">
                                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">{item?.name}</span> <small>{new Date(item?.createdAt)?.toLocaleString()}</small></p>
                                            <div className="d-flex justify-content-between">
                                                <div> <span className=""> {item?.title}<span className="badge bg-success ms-3">{item?.brandName} </span></span></div>
                                                <button type="button" className='btn btn-primary btn-sm' onClick={() => props?.onSubmit(false)}  ><Link to={
                                                    item?.category === "BRAND" ?
                                                        `${props?.url}/brand-dashboard/${item?.id}`
                                                        : item?.category === "USER" ? `${props?.url}/customer-list`
                                                            : item?.category === "ORDER" ? `${props?.url}/order-detail/${item?.id}`
                                                                : item?.category === "RETURN" ? `${props?.url}/return-list`
                                                                    : `${props?.url}/dashboard`
                                                }  className="text-decoration-none text-white" > View </Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                        }
                    </div>
                </div>
                <div className="card-footer text-center border-top-0"  > View all notifications</div>
            </div>

            {/* <li className="py-2 mb-1 border-bottom">
                    <a href="#!" className="d-flex">
                        <div className="avatar rounded-circle no-thumbnail">DF</div>
                        <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Diane Fisher</span> <small>13MIN</small></p>
                            <span className="">Task added Get Started with Fast Cad project</span>
                        </div>
                    </a>
                </li>
                <li className="py-2 mb-1 border-bottom">
                    <a href="#!" className="d-flex">
                        <img className="avatar rounded-circle" src={Avatar3} alt="" />
                        <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Andrea Gill</span> <small>1HR</small></p>
                            <span className="">Quality Assurance Task Completed</span>
                        </div>
                    </a>
                </li>
                <li className="py-2 mb-1 border-bottom">
                    <a href="#!" className="d-flex">
                        <img className="avatar rounded-circle" src={Avatar5} alt="" />
                        <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Diane Fisher</span> <small>13MIN</small></p>
                            <span className="">Add New Project for App Developemnt</span>
                        </div>
                    </a>
                </li>
                <li className="py-2 mb-1 border-bottom">
                    <a href="#!" className="d-flex">
                        <img className="avatar rounded-circle" src={Avatar6} alt="" />
                        <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Andrea Gill</span> <small>1HR</small></p>
                            <span className="">Add Timesheet For Rhinestone project</span>
                        </div>
                    </a>
                </li>
                <li className="py-2">
                    <a href="#!" className="d-flex">
                        <img className="avatar rounded-circle" src={Avatar7} alt="" />
                        <div className="flex-fill ms-2">
                            <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Zoe Wright</span> <small className="">1DAY</small></p>
                            <span className="">Add Calander Event</span>
                        </div>
                    </a>
                </li> */}

        </div >
    )
}
