import React from 'react';
import httpCommon from "../../http-common";
import { ToastMessage } from '../../components/common/ToastMessage';
import { useHistory } from 'react-router-dom';

function MySparePartEditImages(props) {
  const history=useHistory();
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
              // setImage(e.target.files[0]);
               props.onImage(e.target.files[0]);
               changeImage(e.target.files[0])
            }
        }
    };

    const handleDelete=async (image)=>{
        try{
          let response=await httpCommon.patch(`/deleteCompactibleSparePartImage/${props?.sparePart?._id}`,{img:image});
          let {data}=response;
          ToastMessage(data)
          history.push(`${props?.url}/myspareParts-grid`)
         }catch(err){
            console.log(err);
         }
    }

    const changeImage=async (img)=>{
          try{
            const formData=new FormData();
            formData.append("image",img);
            let response=await httpCommon.patch(`/uploadCompactibleImage/${props?.sparePart?._id}`,formData);
            let {data}=response;
            ToastMessage(data)
            history.push(`${props?.url}/myspareParts-grid`)
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

                        <div  className='row' >
                            <div className='col-2 text-white  d-flex justify-content-center align-items-center' >
                            <input style={{cursor:"pointer"}}className='bg-dark ps-2 pe-2 pt-5 pb-5' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>

                            </div>
                           
                            {
                                images?.length>0 ?
                                   images?.map(im1=> <div className='col-3'> 
                                   <div className='d-flex'><img src={im1
                                    } alt='' height="200px" width="200px" /> <i style={{fontSize:"30px",cursor:"pointer"}} className='ms-2 icofont-close-circled text-danger' onClick={()=>handleDelete(im1)}></i></div></div>)
                                    : props?.img ? 
                                    <img src={URL.createObjectURL(props?.img)
                                    } alt='' />
                                    :
                                    <div className='col-2 '>
                                        <i className="fa   fa-picture-o" aria-hidden="true"></i>
                                    </div>
                            }
                             
                            
                            
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    </>
    )
}

 export default MySparePartEditImages