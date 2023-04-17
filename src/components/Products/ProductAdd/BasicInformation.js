import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function BasicInformation() {

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Basic information</h6>
            </div>
            <div className="card-body">
                <form>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            <label className="form-label"> Product Name</label>
                            <input type="text" className="form-control" value="Oculus VR" onChange={() => { }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Product  Description</label>
                            <textarea type="text" className="form-control" value="Gaming VR" onChange={() => { }} ></textarea>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body">
                            <label className="form-label">Categories Select</label>
                            <select className="form-select"   >
                                <option >Gaming accessories</option>
                                <option value="1">Watch</option>
                                <option value="2">Clothes</option>
                                <option value="3">Toy</option>
                                <option value="4">Cosmetic</option>
                                <option value="5">Laptop</option>
                                <option value="6">Mobile</option>
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