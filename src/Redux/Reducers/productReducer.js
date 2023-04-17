const initialState=[];

const getProducts=(state=initialState,action)=>{
      switch(action.type){
        case "All_PRODUCT" : return action.payload;
        default  : return state;
      }
}

export default getProducts;