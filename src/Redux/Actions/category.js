import httpCommon from "../../http-common";

export const getCategory=(id)=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get(`/getProductCategoryBy/${id}`)
            dispatch({
                type:"CATEGORY",
                payload:response.data
            })
       }catch(err){
        console.log(err);
       }
    }
}
export const getAllCategory=()=>{
    return async (dispatch)=>{
     try{
         let response= await httpCommon.get("/getAllProductCategories");
         dispatch({
             type:"CATEGORY",
             payload:response.data
         })
    }catch(err){
     console.log(err);
    }
 }
}