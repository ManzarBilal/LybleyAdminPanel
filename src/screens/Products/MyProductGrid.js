import React, { useEffect, useState } from 'react';
import ColorBlock from '../../components/Products/ProductGrid/ColorBlock';
import Categoriesblock from '../../components/Products/ProductGrid/CategoriesBlock'
import Sizeblock from '../../components/Products/ProductGrid/SizeBlock';
import PricingBlock from '../../components/Products/ProductGrid/PricingBlock';
import RatingBlock from '../../components/Products/ProductGrid/RatingBlock';
import PageHeader1 from '../../components/common/PageHeader1';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getProduct } from '../../Redux/Actions/product';
import { showLoading } from '../../Redux/Actions/sparePart';
import { ReactLoader } from '../../components/common/ReactLoader';
import MyCardBlock from '../../components/Products/ProductGrid/MyCardBlock';

function MyProductGrid(props) {

    const [randomValue, setRandomValue] = useState("")
    const dispatch = useDispatch();
    const products = useSelector(state => state?.products);

    let user = localStorage.getItem("user");
    let obj = JSON.parse(user);
    useEffect(() => {
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        dispatch(showLoading(true))
          dispatch(getProduct(obj?._id));
    }, [dispatch, randomValue])

    return (

        <div className="container-xxl">
            <PageHeader1 pagetitle='Products' url={props?.url} myproductgrid={true} />
            <div className="row g-3 mb-3">
                <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="sticky-lg-top">
                        <div className="card mb-3">
                            <div className="reset-block">
                                <div className="filter-title">
                                    <h4 className="title">Filter</h4>
                                </div>
                                <div className="filter-btn">
                                    <a className="btn btn-primary" href="#!">Reset</a>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <Categoriesblock />
                        </div>
                        <div className="card mb-3">
                            <Sizeblock />
                        </div>
                        <div className="card mb-3">
                            <ColorBlock />
                        </div>
                        <div className="card mb-3">
                            <PricingBlock />
                        </div>
                        <div className="card">
                            <RatingBlock />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-8 col-xl-8 col-xxl-9">
                    {products?.showLoading === true ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                        <>
                            <MyCardBlock url={props?.url} role={obj?.role} product={products?.data} setRandomValue={setRandomValue} />
                            <div className="row g-3 mb-3">
                                <div className="col-md-12">
                                    <nav className="justify-content-end d-flex">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#!" tabIndex="-1">Previous</a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#!">1</a></li>
                                            <li className="page-item active" aria-current="page">
                                                <a className="page-link" href="#!">2</a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#!">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProductGrid