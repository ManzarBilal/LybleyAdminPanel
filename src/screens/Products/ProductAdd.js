import React, { useState ,useEffect} from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
//import Categories from '../../components/Products/ProductAdd/Categories';
//import InventoryInfo from '../../components/Products/ProductAdd/InventoryInfo';
//import PricingInfo from '../../components/Products/ProductAdd/PricingInfo';
//import PublicaSchedule from '../../components/Products/ProductAdd/PublicSchedule';
//import Size from '../../components/Products/ProductAdd/Size';
//import Tags from '../../components/Products/ProductAdd/Tags';
//import VisibilityStatus from '../../components/Products/ProductAdd/VisibilityStatus';
import BasicInformation from '../../components/Products/ProductAdd/BasicInformation';
//import ShippingCountries from '../../components/Products/ProductAdd/ShippingCountry';
import Images from '../../components/Products/ProductAdd/Images';
//import CroppedImages from '../../components/Products/ProductAdd/CroppedImages';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getCategory } from '../../Redux/Actions/category';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';

function ProductAdd() {

    const dispatch=useDispatch();
     const categories=useSelector(state=>state?.category);
   // const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(false);
    const [brands,setBrands]=useState([]);
    const [brandName,setBrandName]=useState("");
    
    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
         dispatch(getAllCategory());
         GetAllBrands();

    },[dispatch])

    const GetAllBrands = async () => {
        try {
            let response = await httpCommon.get("/getAllBrands")
            let { data } = response
            setBrands(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const GetAllCategory = async () => {
        try {
            let response = await httpCommon.get(`/getAllProductCategories`)
            let { data } = response
           // setCategories(data)
        }
        catch (err) {
            console.log(err)
        }
    }
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
            // console.log("category",category)
            let user=localStorage.getItem("user");
            let obj=JSON.parse(user);
            let obj1=obj?.role==="ADMIN" ? brands.find(f1=>f1?.brandName===brandName) : obj;
            const formData=new FormData();
            formData.append("productName",product?.productName);
            formData.append("productImage",product?.productImage);
            formData.append("productCategory",product?.productCategory);
            formData.append("productDescription",product?.productDescription);
            formData.append("userId",obj1?._id);
            formData.append("brandName",obj1?.brandName);
            formData.append("categoryId",category?._id);
            setLoading(true);
            let response=await httpCommon.post("/addProduct",formData);
            let {data}=response;
            setLoading(false);
            setBrandName("");
            ToastMessage(data);
            setProduct({productName:"",productDescription:"",productCategory:"",productImage:""});
        }catch(err){
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='My Product Add'
            //  button={true} 

            />
            <div className="row g-3">
                {/* <div className="col-xl-4 col-lg-4">
                    <div className="sticky-lg-top">
                        <div className="card mb-3">
                            <PricingInfo />
                        </div>
                        <div className="card mb-3">
                            <VisibilityStatus />
                        </div>
                        <div className="card mb-3">
                            <Size />
                        </div>
                        <div className="card mb-3">
                            <PublicaSchedule />
                        </div>
                        <div className="card mb-3">
                            <Tags />
                        </div>
                        <div className="card mb-3">
                            <Categories />
                        </div>
                        <div className="card">
                            <InventoryInfo />
                        </div>
                    </div>
                </div> */}
                <div className="col-xl-12 col-lg-12">
                    <div className="card mb-3">
                        <BasicInformation brands={brands} brandName={brandName} setBrandName={setBrandName} categories={categories} product={product} onChange={handleChange} />
                    </div>
                    {/* <div className="card mb-3">
                        <ShippingCountries />
                    </div> */}
                   
                    <div className="card mb-3">
                        <Images product={product} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5" onClick={addProduct}>{loading ? "Saving..." : "Save"}</button>
                    </div>
                    {/* <div className="card">
                        <CroppedImages />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ProductAdd;