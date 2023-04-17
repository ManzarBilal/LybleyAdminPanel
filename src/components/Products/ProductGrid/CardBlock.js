import React from 'react';
import { Link } from 'react-router-dom';

function CardBlock(props) {
 
    return (
        <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-3">
            {
                props?.product?.map((d, i) => {
                    return <div key={'product' + i} className="col">
                        <div className="card">
                            <div className="product">
                                <div className="product-image">
                                    <div className="product-item active">
                                        <img src={d.productImage} alt="product" className="img-fluid w-100" />
                                    </div>
                                    <a className="add-wishlist" href="#!">
                                        <i className= "icofont-heart"></i>
                                    </a>
                                </div>
                                <div className="product-content p-3">
                                    <span className="rating mb-2 d-block"><i className= "* * *"></i>{4.5} </span>
                                    <Link to={process.env.PUBLIC_URL + "/product-detail"} className="fw-bold">{d.productName} </Link>
                                    <p className="text-muted">{d.productDescription}</p>
                                    <Link to={props?.url + `/product-edit/${d?._id}`} className="btn btn-primary mt-3"> edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default CardBlock;