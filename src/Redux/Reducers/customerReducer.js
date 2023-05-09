const initialState=[];

const getCustomerById=(state=initialState,action)=>{
      switch(action.type){
        case "All_CUSTOMERS" : return action.payload;
        default  : return state;
      }
}

export default getCustomerById;