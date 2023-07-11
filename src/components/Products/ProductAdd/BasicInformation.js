import React from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function BasicInformation(props) {
    let obj=localStorage.getItem("user");
    let user=JSON.parse(obj);
    let {productName,productDescription,productCategory}=props?.product;

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Basic information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                      {(user?.role==="ADMIN" && !props?.myProduct) ? <div className="col-md-12">
                        <label className="form-label">Select Brand</label>
                               <select className="form-select" name='brandName' value={props?.brandName} onChange={(e)=>props?.setBrandName(e.currentTarget.value)}  >
                                <option value="" selected>Choose Brand</option>
                                {props?.brands?.filter(f1=>f1?.approval==="APPROVED")?.map(b1=>
                                    <option value={b1?.brandName} >{b1.brandName}</option>
                                    )}
                               </select>
                        </div> : (props?.myProduct && user?.role==="ADMIN") ? "" : ""}   
                        <div className="col-md-12">
                            <label className="form-label"> Product Name</label>
                            <input type="text" className="form-control" name='productName' value={productName} onChange={(e) => {props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Product  Description</label>
                            <textarea type="text" className="form-control" name='productDescription' value={productDescription} onChange={(e) => {props.onChange(e) }} ></textarea>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body">
                            <label className="form-label">Categories Select</label>
                            <select className="form-select" name='productCategory' value={productCategory} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Category</option>
                                {props?.categories?.filter(c1=>c1.status==="ACTIVE")?.map(c1=>
                                    <option value={c1.categoryName} >{c1.categoryName}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                        {/* <div className="col-md-12">
                            <label className="form-label">Product Identifier URL</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">https://eBazar.com</span>
                                <input type="text" className="form-control" value="/product/Fossilsmart" onChange={() => { }} />
                            </div>
                        </div> */}
                        {/* <div className="col-md-12">
                            <label className="form-label">Product Description</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>This is some sample content.</p>
                                    <ul>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Integer vitae leo quis urna pulvinar tristique..</li>
                                        <li>In porttitor sem at ligula vehicula, at scelerisque lectus placerat.</li>
                                        <li>Nullam ornare risus ac tellus ullamcorper rhoncus.</li>
                                        <li>Nam dictum neque et velit fermentum blandit.</li>
                                        <li>Vivamus congue metus sit amet sapien pulvinar tincidunt.</li>
                                    </ul>"
                                config={{
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "bulletedList",
                                        "numberedList",
                                        "|",
                                        "imageUpload",
                                        "blockQuote",
                                        "insertTable",
                                        "|",
                                        "imageTextAlternative"

                                    ]
                                }}
                            />
                        </div> */}
                    </div>
                </form>
            </div>
        </>
    )
}
export default BasicInformation