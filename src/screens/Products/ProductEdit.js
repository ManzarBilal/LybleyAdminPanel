import React, { useEffect, useState } from 'react';
import PageHeader1 from '../../components/common/PageHeader1';
// import Categories from '../../components/Products/ProductEdit/Categories';
// import InventoryInfo from '../../components/Products/ProductEdit/InventoryInfo';
// import PricingInfo from '../../components/Products/ProductEdit/PricingInfo';
// import PublicaSchedule from '../../components/Products/ProductEdit/PublicaSchedule';
// import Size from '../../components/Products/ProductEdit/Size';
// import Tags from '../../components/Products/ProductEdit/Tags';
// import VisibilityStatus from '../../components/Products/ProductEdit/VisibilityStatus';
import BasicInformation from '../../components/Products/ProductEdit/BasicInformation';
// import ShippingCountries from '../../components/Products/ProductEdit/ShippingCountries';
import Images from '../../components/Products/ProductEdit/Images';
// import CroppedImages from '../../components/Products/ProductEdit/CroppedImages';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../Redux/Actions/category';
import httpCommon from "../../http-common"
import { ToastMessage } from '../../components/common/ToastMessage';
import { useHistory, useParams } from 'react-router-dom';

function ProductEdit(props) {
    const params = useParams()
    const { id } = params;
 
    const history=useHistory()

    const dispatch=useDispatch()
    const categories=useSelector(state=>state?.category)
    const products = useSelector(state => state?.products);
    const [loading,setLoading]=useState(false);
    const [product,setProduct]=useState({});
    const [img,setImage]=useState("");
    useEffect(()=>{
        let user=localStorage.getItem("user");
        let obj=JSON.parse(user);
        dispatch(getCategory(obj?._id));
    const filterProduct = products?.data?.find(e1 => e1?._id === id)
     setProduct(filterProduct);
    },[id,dispatch,products])
   // console.log("filterProduct", filterProduct);
    // const [product, setProduct] = useState({
    //     productName: "",
    //     productDescription: "",
    //     productCategory: "",
    //     productImage: "",
    // })

    const handleChange = (e) => {
        const { currentTarget: input } = e;
        let product1 = { ...product };
        product1[input.name] = input.value;
        setProduct(product1);
    }
    const handleImage = (file) => {
        setImage(file);
        setProduct({...product,productImage:""});
    }

    const editProduct = async () => {
        try {
            let obj={productName:product.productName,productCategory:product.productCategory,productDescription:product.productDescription};
            setLoading(true);
            let response = await httpCommon.patch(`/updateProduct/${id}`,obj);
            let { data } = response;
            setLoading(false);
            ToastMessage(data);
              history.push(`${props?.url}/product-grid`)
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
   
    return (
        <div className="container-xxl">
            <PageHeader1
                pagetitle='Products Edit'
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
                        <BasicInformation categories={categories} product={product} onChange={handleChange} />
                    </div>
                    {/* <div className="card mb-3">
                        <ShippingCountries />
                    </div> */}

                    <div className="card mb-3">
                        <Images id={id} img={img} product={product} onImage={handleImage} />
                    </div>
                    <div className="card mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary btn-set-task  w-sm-100 text-uppercase px-5" onClick={editProduct}>{loading ? "Updating..." : "Update"}</button>
                    </div>
                    {/* <div className="card">
                        <CroppedImages />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ProductEdit;