import React, { useState ,useEffect} from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
import BasicInformation from '../../components/Products/ProductAdd/BasicInformation';
import Images from '../../components/Products/ProductAdd/Images';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../Redux/Actions/category';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';

function SparePartAdd() {

    const dispatch=useDispatch();
    const categories=useSelector(state=>state?.category);
    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
        dispatch(getCategory(obj?._id));
    },[dispatch])
    
    const [product,setProduct]=useState({
        productName:"",
        productDescription:"",
        productCategory:"",
        productImage:"",
    })

    const handleChange=(e)=>{
        const {currentTarget:input}=e;
        let product1={...product};
        product1[input.name]=input.value;
        setProduct(product1);
    }
    const handleImage=(file)=>{
       setProduct({...product,productImage:file});
    }

    const addProduct=async ()=>{
        try{
            let category=categories.find(c1=>c1?.categoryName===product?.productCategory);
            console.log(category);
            const formData=new FormData();
            formData.append("productName",product?.productName);
            formData.append("productImage",product?.productImage);
            formData.append("productCategory",product?.productCategory);
            formData.append("productDescription",product?.productDescription);
            formData.append("userId",category?.userId);
            formData.append("categoryId",category?._id);
            let response=await httpCommon.post("/addProduct",formData);
            let {data}=response;
            ToastMessage(data);
            setProduct({productName:"",productDescription:"",productCategory:"",productImage:""});
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Products Add'
            //  button={true} 

            />
            <div className="row g-3">
                
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <BasicInformation categories={categories} product={product} onChange={handleChange} />
                    </div>
                    
                   
                    <div className="card mb-3">
                        <Images product={product} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5" onClick={addProduct}>Save</button>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}
export default SparePartAdd;