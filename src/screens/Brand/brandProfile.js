import React, { useEffect, useState } from 'react';
import httpCommon from "../../http-common";
import PageHeader1 from '../../components/common/PageHeader1';
import Profile from './Profile';
import ProfileSettings from './ProfileSettings';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
 

function BrandProfile() {
    const param = useParams()

    const[userDetail,setUserDetail]=useState({});
    const [randomValue,setRandomValue]=useState("");

useEffect(()=>{
    GetProfile()
},[randomValue]);

const handleChange=(e)=>{
    const {currentTarget : input}=e;
    let userDetail1={...userDetail};
    userDetail1[input.name]=input.value;
    setUserDetail(userDetail1);
 }   

const GetProfile = async () => {
// const user=localStorage.getItem("user")
// const obj=JSON.parse(user);
    try {
        let response = await httpCommon.get(`/getBrandBy/${param?.id}`);
        let { data } = response;
        setUserDetail(data);
    } catch (err) {
        console.log(err);
    }
}

    return (    
        <div className='row g-3'>
            <PageHeader1 pagetitle='Brand Profile' />
            <div className='col-xl-4 col-lg-5 col-md-12'>

                <Profile setRandomValue={setRandomValue}  user={userDetail}/>
                {/* <PaymentsMethod /> */}
            </div>
            <div className='col-xl-8 col-lg-7 col-md-12'>
                <ProfileSettings setRandomValue={setRandomValue}  user={userDetail} onChange={handleChange}/>
                {/* <AuthenticationDetail /> */}
            </div>

        </div>
    )
}
export default BrandProfile;