import React, { useEffect, useState } from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../Redux/Actions/category';
import httpCommon from "../../http-common"
import { ToastMessage } from '../../components/common/ToastMessage';
import { useHistory, useParams } from 'react-router-dom';
import EditBasicInformation from './EditBasicInformation';
import { getProduct } from '../../Redux/Actions/product';
import EditImage from './EditImage';

function SparePartEdit(props) {
    const params = useParams()
    const history=useHistory()
    const { id } = params;
 
    const dispatch=useDispatch();
    const products=useSelector(state=>state?.products);
    const categories=useSelector(state=>state?.category);
    const spareParts=useSelector(state=>state?.spareParts);

    const [img,setImage]=useState("");
    const [faults,setFault]=useState([]);
    const [sparePart,setSpareParts]=useState({ })
    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
        dispatch(getCategory(obj?._id));
        dispatch(getProduct(obj?._id));
        getFaults();
        const filterPart = spareParts?.data?.find(e1 => e1?._id === id)
     
        setSpareParts(filterPart)
    },[ dispatch,id,spareParts])

    
    
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

    //  console.log("sparePart",sparePart);
    const editProduct = async () => {
        let obj={partName:sparePart?.partName,category:sparePart?.category,description:sparePart?.description,
            MRP:sparePart?.MRP,bestPrice:sparePart?.bestPrice,productModel:sparePart?.productModel,faultType:sparePart?.faultType};
        try {
           
            let response = await httpCommon.patch(`/updateSparePart/${id}`,obj);
            let { data } = response;
            ToastMessage(data);
              history.push(`${props?.url}/spareParts-grid`)
        } catch (err) {
            console.log(err);
        }
    }
   
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Products Edit'
            //  button={true} 

            />
            <div className="row g-3">
                 
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <EditBasicInformation onDelete={handleFaultDelete} onSubmit={handleFault} products={products} categories={categories} faultType={faults} sparePart={sparePart} onChange={handleChange} />
                    </div>
                    
                    <div className="card mb-3">
                        <EditImage id={id} img={img} setImage={setImage} sparePart={sparePart} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5"onClick={editProduct} >Save</button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
export default SparePartEdit;