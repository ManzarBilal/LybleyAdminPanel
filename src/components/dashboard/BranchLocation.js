import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import httpCommon from "../../http-common";

function BranchLocation() {
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        getAllOrder();
    },[]);
    const getAllOrder = async () => {
        try {
            let response = await  httpCommon.get("/getAllOrder");
            let { data } = response;
             setOrders(data);
        } catch (err) {
            console.log(err);
        }
    }

    const userData=localStorage.getItem("user")
    const user=JSON.parse(userData);

    const orderData= user?.role==="ADMIN"? orders : orders?.filter(f1=>f1?.items?.find(f2=>f2?.brandId===user?._id));
    

    let count={};
    let obj= orderData?.map(o1=> {
       if(count[o1?.state]){
        count[o1?.state].order++;
       }else{
        count[o1?.state]={state:o1?.state,order:1};
       }
    })
    let branch=Object?.values(count);
    return (
        <div className="card">
            {/* <div style={{ width: '100%', height: '100%' }}>
                <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                    <h6 className="m-0 fw-bold">Our Branch Location &amp; Revenue</h6>
                </div>
                <div id='map' style={{ margin: '15px' }}>
                    <iframe
                        src="https://maps.google.com/maps?hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                        width="100%"
                        height="365"
                        frameBorder="0"
                        title="f"
                        style={{ border: '0' }}
                        allowFullScreen
                    ></iframe>
                </div>
            </div> */}

            <div className="card-body">
                <div className="location-revenue  row g-3">
                    {branch?.map((b1,index)=> <>
                         <span style={{ fontWeight: 'bold' }}>{b1?.state}</span>
                         <ProgressBar striped now={b1?.order} variant="success" style={{ height: '9px' }} />
                         </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default BranchLocation;
