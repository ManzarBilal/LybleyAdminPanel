import React from 'react';
 
import { connect } from 'react-redux';
//import { OnchangeAddimage } from '../../../Redux/Actions/Action'

function Images(props) {
    
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
              // setImage(e.target.files[0]);
               props.onImage(e.target.files[0])
            }
        }
    };
    let {images}=props.product;
    return (<>
        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
            <h6 className="mb-0 fw-bold ">Images</h6>
        </div>
        <div className="card-body">
            <form>
                <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                        <label className="form-label">Product Images Upload</label>
                        <small className="d-block text-muted mb-2">Only portrait or square images, 2M max and 2000px max-height.</small>
                        <div id='create-token' className='dropzone'>
                        {
                                images?.length>0 ?
                                images?.map(p1=>
                                    <img src={URL.createObjectURL(p1)
                                    } height="200px" width="200px" className='m-2' alt='' />)
                                    : ""
                                    
                            }
                            <input id='filesize' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>
                            <div className='dz-message '>
                                        <i className="fa   fa-picture-o" aria-hidden="true"></i>
                                    </div>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    </>
    )
}

const mapStateToProps = ({ Mainreducer }) => ({
    Mainreducer
})
export default connect(mapStateToProps, {
   // OnchangeAddimage
})(Images);