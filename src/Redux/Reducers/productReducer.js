const initialState={
  data:[],
  showLoading:false
};

const getProducts=(state=initialState,action)=>{
      switch(action.type){
        case "All_PRODUCT" : return {...state,data:action.payload};
        case "LOADING" : return {...state,showLoading:action.payload};
        default  : return state;
      }
}

export default getProducts;