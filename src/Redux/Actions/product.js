import httpCommon from "../../http-common";
import { showLoading } from "./sparePart";

export const getAllProduct=()=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get(`/getAllProducts`)
            dispatch({
                type:"All_PRODUCT",
                payload:response.data
            })
            dispatch(showLoading(false))
       }catch(err){
        console.log(err);
        dispatch(showLoading(false))

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
         dispatch(showLoading(false))

    }catch(err){
     console.log(err);
     dispatch(showLoading(false))

    }
 }
}