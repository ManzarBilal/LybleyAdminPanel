import React, { useEffect, useState } from 'react';
import Profile from '../../components/Other Pages/Profile Page/Profile';
import ProfileSetting from '../../components/Other Pages/Profile Page/ProfileSetting'
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';

function ProfilePage() {

const [getUser,setGetUser]=useState({})
const [randomValue,setRandomValue]=useState("")

useEffect(()=>{
    GetProfile()
},[randomValue]);

const GetProfile = async () => {
const user=localStorage.getItem("user")
const obj=JSON.parse(user);
    try {
        let response = await httpCommon.get(`/getBrandBy/${obj?._id}`);
        let { data } = response;
        setGetUser(data)
       // ToastMessage(data)

    } catch (err) {
        console.log(err);
    }
}

    return (
        <div className='row g-3'>
            <PageHeader1 pagetitle='Admin Profile' />
            <div className='col-xl-4 col-lg-5 col-md-12'>

                <Profile setRandomValue={setRandomValue}  user={getUser}/>
                {/* <PaymentsMethod /> */}
            </div>
            <div className='col-xl-8 col-lg-7 col-md-12'>
                <ProfileSetting setRandomValue={setRandomValue}  user={getUser}/>
                {/* <AuthenticationDetail /> */}
            </div>

        </div>
    )
}
export default ProfilePage;