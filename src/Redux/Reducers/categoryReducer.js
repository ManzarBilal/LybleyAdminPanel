const initialState=[];

const getCategory=(state=initialState,action)=>{
      switch(action.type){
        case "CATEGORY" : return action.payload;
        default  : return state;
      }
}

export default getCategory;