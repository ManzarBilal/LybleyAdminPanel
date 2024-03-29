import React, { useState ,useEffect} from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';
import Image from './Images';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getProduct } from '../../Redux/Actions/product';
import { getAllCategory, getCategory } from '../../Redux/Actions/category';
import MyBasicInformation from './MyBasicInformation';

function MySparePartAdd() {
    
    const dispatch=useDispatch();
    // const products=useSelector(state=>state?.products);
    // const categories=useSelector(state=>state?.category);
    const [loading,setLoading]=useState(false);
    const [faults,setFault]=useState([]);
    const [brands,setBrands]=useState([]);
    const [errors,setErrors]=useState({});

    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
        (obj?.role!=="RESELLER" && setSpareParts({...sparePart,brandName:obj?.brandName})); 
        // dispatch(getAllCategory());
        // dispatch(getAllProduct());
        // GetAllBrands();
        getFaults();
    },[dispatch])

    const [sparePart,setSpareParts]=useState({
        partName:"",
        description:"",
        MRP:"",
        bestPrice:"",
        category:"",
        // technician:"",
        faultType:[],
        brandName:"",
        partNo:"",
        compactibleWith:[],
        productModel:"",
        images:[]
    })

    // const GetAllBrands = async () => {
    //     try {
    //         let response = await httpCommon.get("/getAllBrands")
    //         let { data } = response
    //         setBrands(data);

    //     }
    //     catch (err) {
    //         console.log(err)


    //     }
    // }
    
    const handleChange=(e)=>{
        const {currentTarget:input}=e;
        let sparePart1={...sparePart};
        sparePart1[input.name]=input.value;
    
        const updatedErrors = { ...errors };
    if (updatedErrors[input.name]) {
      delete updatedErrors[input.name];
    }
        setErrors(updatedErrors);
        setSpareParts(sparePart1);
    }
    const handleImage=(file)=>{
         let sparePart1={...sparePart};
         sparePart1?.images?.push(file);
         setSpareParts(sparePart1);
       // setSpareParts({...sparePart,images:file});
    }
    const handleCompactible=(val)=>{
        let sparePart1={...sparePart};
        let index=sparePart1?.compactibleWith?.findIndex(f1=>f1===val);
        if(index>=0){
            sparePart1?.compactibleWith?.splice(index,1);
        }else{
            sparePart1?.compactibleWith?.push(val);
        }
        setSpareParts(sparePart1);
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
  
const deleteCompactible=(val)=>{
    let sparePart1={...sparePart};
        let index=sparePart1?.compactibleWith?.findIndex(f1=>f1===val);
        if(index>=0){
            sparePart1?.compactibleWith?.splice(index,1);
            setSpareParts(sparePart1);
        }else{
            return null;
        }
}

const handleSubmit = (e) => {
    e.preventDefault();
    const errors1 = {};
    const { partName,
        description,
        MRP,
        bestPrice,
        category,
        technician,
        faultType,
        brandName,
        partNo,
        productModel,
        image,skuNo,length,breadth,height,weight} = sparePart;
    errors1.partName = !partName
      ? "Part name is required"
      : "";
    errors1.MRP = !MRP
      ? "MRP is required"
      : isNaN(MRP) 
      ? "MRP should be number"
      : "";
    errors1.bestPrice = !bestPrice ? "Best Price is required" : isNaN(bestPrice) ? "Best Price should be number" : "";
    errors1.skuNo = !skuNo ? "Sku number is required" : "";
    errors1.length = !length ? "Length is required" : +length<=0.5 ? "Length should be greater than 0.5" : isNaN(length) ? "Length should be number" : "";
    errors1.breadth = !breadth ? "Breadth is required" : +breadth<=0.5 ? "Length should be greater than 0.5" : isNaN(breadth) ? "Breadth should be number" : "";
    errors1.height = !height ? "Height is required" : +height<=0.5 ? "Length should be greater than 0.5" : isNaN(height) ? "Height should be number" : "";
    errors1.weight = !weight ? "Weight is required" : isNaN(weight) ? "Weight should be number" : weight>1000 ? "weight should not be greater than 1000" : "";
    
    let keys = Object.keys(errors1);
    let count = keys.reduce((acc, curr) => (errors1[curr] ? acc + 1 : acc), 0);
    if (count === 0) {
      addSparePart();
    } else {
      setErrors(errors1);
    }
  };
    const addSparePart=async ()=>{
        try{
            let user=localStorage.getItem("user");
            let obj=JSON.parse(user);
            // let technician= +sparePart?.technician;
            // let product=products?.data?.find(p1=>(p1.productName===sparePart.productModel && p1?.brandName===sparePart?.brandName));
            const formData=new FormData();
            formData.append("partName",sparePart?.partName);
            formData.append("description",sparePart?.description);
            formData.append("MRP",sparePart?.MRP);
            formData.append("bestPrice",sparePart?.bestPrice);
            for(let x=0; x<sparePart?.compactibleWith?.length; x++){
            formData.append("compactibleWith",sparePart?.compactibleWith[x]);
            }
            formData.append("skuNo",sparePart?.skuNo);
            formData.append("partNo",sparePart?.partNo);
            formData.append("length",+sparePart?.length);
            formData.append("weight",+sparePart?.weight);
            formData.append("height",+sparePart?.height);
            formData.append("breadth",+sparePart?.breadth);
            formData.append("seller",obj?.role);
            sparePart?.faultType.forEach(fault => formData.append('faultType', fault))
            // formData.append("category",sparePart?.category);
            // formData.append("productModel",sparePart?.productModel);
            for(let x=0; x<sparePart?.images?.length; x++){
                formData.append("images",sparePart?.images[x]);
            }
            formData.append("userId",obj?._id);
           // formData.append("productId",product?._id);
            formData.append("brandName",sparePart?.brandName);
            setLoading(true);
            let response=await httpCommon.post("/addCompactibleSparePart",formData);
            let {data}=response;
            setLoading(false);
            ToastMessage(data);
            setSpareParts({ partName:"",brandName:"",description:"",MRP:"",bestPrice:"",faultType:[],images:[],technician:"",compactibleWith:[],partNo:"",length:"",weight:"",height:"",breadth:"",skuNo:""});
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    let obj=localStorage.getItem("user");
    let user=JSON.parse(obj);
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Add Spare Part'
            //  button={true} 

            />
            <div className="row g-3">
                
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <MyBasicInformation errors={errors} deleteCompactible={deleteCompactible} handleCompactible={handleCompactible} user={user} onDelete={handleFaultDelete} onSubmit={handleFault} faultType={faults} sparePart={sparePart} onChange={handleChange} />
                    </div>
                    
                   
                    <div className="card mb-3">
                        <Image product={sparePart} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5" onClick={addSparePart}>{loading ? "Saving..." : "Save"}</button>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}
export default MySparePartAdd;