import httpCommon from "../../http-common";

export const allCustomers=()=>{
       return async (dispatch)=>{
        try{
            let response= await httpCommon.get("/allUserDetail");
            dispatch({
                type:"All_CUSTOMERS",
                payload:response.data
            })
       }catch(err){
        console.log(err);
       }
    }
}