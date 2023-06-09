import React from 'react';
 

function CardBlock(props) {
  
    return (
        <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">
            <div   className="col">
                <div className={`alert-success alert mb-0`}>
                    <div className="d-flex align-items-center">
                        <div className={`avatar rounded no-thumbnail bg-success text-light`}><i className= "fa fa-shopping-cart fa-lg"></i></div>
                        <div className="flex-fill ms-3 text-truncate">
                            <div className="h6 mb-0">{props?.finalData?.status ==="RETURN" ?"Return Created at" :"Order Created at"}</div>
                            {/* <span className="small"> {new Date( props?.finalData?.createdAt).toLocaleDateString()} </span> */}
                            <span className="small"> {new Date( props?.finalData?.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div   className="col">
                <div className={`alert-danger alert mb-0`}>
                    <div className="d-flex align-items-center">
                        <div className={`avatar rounded no-thumbnail bg-danger text-light`}><i className= "fa fa-user fa-lg"></i></div>
                        <div className="flex-fill ms-3 text-truncate">
                            <div className="h6 mb-0">Name</div>
                            <span className="small"> {props?.finalData?.name} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div   className="col">
                <div className={`alert-warning alert mb-0`}>
                    <div className="d-flex align-items-center">
                        <div className={`avatar rounded no-thumbnail bg-warning text-light`}><i className= "fa fa-envelope fa-lg"></i></div>
                        <div className="flex-fill ms-3 text-truncate">
                            <div className="h6 mb-0">Email</div>
                            <span className="small"> {props?.finalData?.email} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div   className="col">
                <div className={`alert-info alert mb-0`}>
                    <div className="d-flex align-items-center">
                        <div className={`avatar rounded no-thumbnail bg-info text-light`}><i className= "fa fa-phone-square fa-lg"></i></div>
                        <div className="flex-fill ms-3 text-truncate">
                            <div className="h6 mb-0">Contact No.</div>
                            <span className="small"> {props?.finalData?.contact} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardBlock;