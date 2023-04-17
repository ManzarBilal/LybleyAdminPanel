import httpCommon from "../../http-common";

export const getProduct=(id)=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get(`/allProductsByBrand/${id}`)
            dispatch({
                type:"All_PRODUCT",
                payload:response.data
            })
       }catch(err){
        console.log(err);
       }
    }
}