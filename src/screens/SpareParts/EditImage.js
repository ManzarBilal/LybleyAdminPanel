import React from 'react';
import httpCommon from "../../http-common";

function EditImages(props) {
 
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
              // setImage(e.target.files[0]);
               props.onImage(e.target.files[0]);
               changeImage(e.target.files[0]);
            }
        }
    };

    const changeImage=async (img)=>{
          try{
            const formData=new FormData();
            for(let x=0; x<props?.sparePart?.images?.length; x++){
                formData.append("images",props?.sparePart?.images[x]);
            }
            let response=await httpCommon.patch(`/updateProductImageBy/${props?.id}`,formData);
            let {data}=response;
            console.log("data",data)
          }catch(err){
            console.log(err);
          }
    }

    let {images}=props?.sparePart;
  
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
                                images ?
                                    <img src={images
                                    } alt='' />
                                    : props?.img ? 
                                    <img src={URL.createObjectURL(props?.img)
                                    } alt='' />
                                    :
                                    <div className='dz-message '>
                                        <i className="fa   fa-picture-o" aria-hidden="true"></i>
                                    </div>
                            }
                            <input id='filesize' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    </>
    )
}

 export default EditImages