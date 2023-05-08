const initialState=[]

const userDetail=(state=initialState,action)=>{
    switch(action.type){
        case "ALL_CUSTOMERS" : return action.payload;
        default: return state;
    }
}

export default userDetail;