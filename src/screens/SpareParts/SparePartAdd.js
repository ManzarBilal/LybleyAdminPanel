import React, { useState ,useEffect} from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';
import BasicInformation from './BasicInformation';
import Image from './Images';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/Actions/product';
import { getCategory } from '../../Redux/Actions/category';

function SparePartAdd() {
    
    const dispatch=useDispatch();
    const products=useSelector(state=>state?.products);
    const categories=useSelector(state=>state?.category);
    const [faults,setFault]=useState([]);
    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
        dispatch(getCategory(obj?._id));
        dispatch(getProduct(obj?._id));
        getFaults();
    },[dispatch])

    const [sparePart,setSpareParts]=useState({
        partName:"",
        description:"",
        MRP:"",
        bestPrice:"",
        category:"",
        technician:"",
        faultType:[],
        productModel:"",
        images:[]
    })
    
    const handleChange=(e)=>{
        const {currentTarget:input}=e;
        let sparePart1={...sparePart};
        sparePart1[input.name]=input.value;
        setSpareParts(sparePart1);
    }
    const handleImage=(file)=>{
         let sparePart1={...sparePart};
         sparePart1?.images?.push(file);
         setSpareParts(sparePart1);
       // setSpareParts({...sparePart,images:file});
    }

    const handleFault=(fault)=>{
        let sparePart1={...sparePart};
        let index=sparePart1?.faultType?.findIndex(f1=>f1===fault);
        if(index>=0){
            return null;
        }else if(sparePart1?.faultType?.length>=5){
            return null;
        }
        else{
            sparePart1?.faultType?.push(fault);
        }
         setSpareParts(sparePart1);
    }

    const handleFaultDelete=(i)=>{
        let sparePart1={...sparePart};
         sparePart1?.faultType?.splice(i,1);
         setSpareParts(sparePart1);
    }

    const getFaults=async()=>{
        try{
         let response=await httpCommon.get("/getAllFault");
         let {data}=response;
         setFault(data);
        }catch(err){
         console.log(err);
        }
    }

    const addSparePart=async ()=>{
        try{
            let technician= +sparePart?.technician;
            let product=products?.data?.find(p1=>p1.productName===sparePart.productModel);
            const formData=new FormData();
            formData.append("partName",sparePart?.partName);
            formData.append("description",sparePart?.description);
            formData.append("MRP",sparePart?.MRP);
            formData.append("bestPrice",sparePart?.bestPrice);
            formData.append("technician",technician);
            sparePart?.faultType.forEach(fault => formData.append('faultType', fault))
            formData.append("category",sparePart?.category);
            formData.append("productModel",sparePart?.productModel);
            for(let x=0; x<sparePart?.images?.length; x++){
                formData.append("images",sparePart?.images[x]);
            }
            formData.append("userId",product?.userId);
            formData.append("productId",product?._id);
            formData.append("brandName",product?.brandName);

            let response=await httpCommon.post("/addSparePart",formData);
            let {data}=response;
            ToastMessage(data);
            setSpareParts({ partName:"",description:"",MRP:"",bestPrice:"",faultType:[],images:[],technician:""});
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Add Spare Part'
            //  button={true} 

            />
            <div className="row g-3">
                
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <BasicInformation onDelete={handleFaultDelete} onSubmit={handleFault} products={products} categories={categories} faultType={faults} sparePart={sparePart} onChange={handleChange} />
                    </div>
                    
                   
                    <div className="card mb-3">
                        <Image product={sparePart} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5" onClick={addSparePart}>Save</button>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}
export default SparePartAdd;