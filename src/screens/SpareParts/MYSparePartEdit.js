import React, { useEffect, useState } from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getCategory } from '../../Redux/Actions/category';
import httpCommon from "../../http-common"
import { ToastMessage } from '../../components/common/ToastMessage';
import { useHistory, useParams } from 'react-router-dom';
import { getAllProduct, getProduct } from '../../Redux/Actions/product';
import MyEditBasicInformation from './MyEditBasicinformation';
import MySparePartEditImages from './MySparePartImageEdit';

function MySparePartEdit(props) {
    const params = useParams()
    const history=useHistory()
    const { id } = params;
 
    const dispatch=useDispatch();
    const products=useSelector(state=>state?.products);
    const categories=useSelector(state=>state?.category);
    const spareParts=useSelector(state=>state?.spareParts);
    const [randomValue,setRandomValue]=useState("");
    const [loading,setLoading]=useState(false);
    const [img,setImage]=useState("");
    const [faults,setFault]=useState([]);
    const [sparePart,setSpareParts]=useState({ })
    let obj=localStorage.getItem("user");
    let user=JSON.parse(obj);
    useEffect(()=>{
       
        dispatch(getAllCategory());
        dispatch(getAllProduct());
        getFaults();
        const filterPart = spareParts?.data?.find(e1 => e1?._id === id)
        console.log(randomValue,filterPart.images);
        setSpareParts(filterPart)
    },[ dispatch,id,randomValue]);


    const handleChange=(e)=>{
        const {currentTarget:input}=e;
        let sparePart1={...sparePart};
        sparePart1[input.name]=input.value;
        setSpareParts(sparePart1);
    }
    const handleImage=(file)=>{
         setImage(file);
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

    const changeRandom=()=>{
        let x = Math.floor((Math.random() * 10) + 1);
        setRandomValue(x)
    }

    //  console.log("sparePart",sparePart);
    const editProduct = async () => {
        let pdId=products?.data?.find(f1=>f1?.productName===sparePart?.productModel)
        let obj={productId:pdId?._id,partName:sparePart?.partName,category:sparePart?.category,description:sparePart?.description,
            MRP:sparePart?.MRP,bestPrice:sparePart?.bestPrice,productModel:sparePart?.productModel,faultType:sparePart?.faultType,partNo:sparePart?.partNo,skuNo:sparePart?.skuNo,length:sparePart?.length,breadth:sparePart?.breadth,height:sparePart?.height,weight:sparePart?.weight};
        try {
            setLoading(true);
            let response = await httpCommon.patch(`/updateSparePart/${id}`,obj);
            let { data } = response;
            setLoading(false);
            ToastMessage(data);
              history.push(`${props?.url}/spareParts-grid`)
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
   
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Spare Part Edit'
            //  button={true} 

            />
            <div className="row g-3">
                 
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <MyEditBasicInformation user={user} onDelete={handleFaultDelete} onSubmit={handleFault} products={products} categories={categories} faultType={faults} sparePart={sparePart} onChange={handleChange} />
                    </div>
                    
                    <div className="card mb-3">
                        <MySparePartEditImages url={props?.url} id={id} img={img} setImage={setImage} sparePart={sparePart} onImage={handleImage} changeRandom={changeRandom} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5"onClick={editProduct} >{loading ? "Updating..." : "Update"}</button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
export default MySparePartEdit;