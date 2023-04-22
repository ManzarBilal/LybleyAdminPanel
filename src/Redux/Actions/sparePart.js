import httpCommon from "../../http-common";

export const getSpareParts=(id)=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get(`/sparePartByuserId/${id}`)
            dispatch({
                type:"All_SPAREPART",
                payload:response.data
            })
       }catch(err){
        console.log(err);
       }
    }
}