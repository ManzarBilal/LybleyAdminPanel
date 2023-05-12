const initialState= {
  data:[],
  showLoading:false
};

const getSpareParts=(state=initialState,action)=>{
      switch(action.type){
        case "All_SPAREPART" : return {...state,data:action.payload};
        case "LOADING" : return {...state,showLoading:action.payload};
        default  : return state;
      }
}

export default getSpareParts;