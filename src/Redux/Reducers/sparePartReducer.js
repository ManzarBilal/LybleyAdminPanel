const initialState=[];

const getSpareParts=(state=initialState,action)=>{
      switch(action.type){
        case "All_SPAREPART" : return action.payload;
        default  : return state;
      }
}

export default getSpareParts;