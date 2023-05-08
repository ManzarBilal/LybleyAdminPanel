import httpCommon from "../../http-common";

export const getAllProduct=()=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get(`/getAllProducts`)
            dispatch({
                type:"All_PRODUCT",
                payload:response.data
            })
       }catch(err){
        console.log(err);
       }
    }
}

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