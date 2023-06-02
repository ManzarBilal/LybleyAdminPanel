import React, { useEffect, useState } from 'react'
import httpCommon from "../../http-common";


const BrandPayments = () => {
  const [data,setData]=useState([]);

   useEffect(()=>{
    getBrands();
   },[]);

   const getBrands=async()=>{
    let user=localStorage.getItem("user");
    let obj=JSON.parse(user);
    try{
      let response=await httpCommon.get(`/getOrderBrand/${obj?._id}`);
      let {data}=response;
      setData(data);
    }catch(err){
      console.log(err);
    }
   }

  return (
    <>
    <h3>Brand Payments</h3>
    <div class="row bg-dark border text-light p-2 mt-2">
        <div class="col-1">
          Name
        </div>
        <div class="col-2">
          Email
        </div>
        <div class="col-1">
        Contact
        </div>
        <div class="col-2">
        Address
        </div>
        <div class="col-3">
          SparePart Name
        </div>
        <div class="col-1">
          Quantity
        </div>
        <div class="col-2">
         Amount
        </div>
      </div>
    {data?.map(c1=>
      <div class="row border p-1">
        <div class="col-1">
          {c1?.name}
        </div>
        <div class="col-2">
          {c1?.email}
        </div>
        <div class="col-1">
          {c1?.contact}
        </div>
        <div class="col-2">
          {c1?.address}
        </div>
        <div class="col-3">
          {c1?.items?.map(f1=>f1?.sparePartName)}
        </div>
        <div class="col-1">
          {c1?.items?.map(f1=>f1?.quantity)}
        </div>
        <div class="col-2">
          {c1?.items?.reduce((acc,curr)=> acc+curr?.MRP,0)}
        </div>
      </div>
      )}
    </>
  )
}

export default BrandPayments