const initialState={email:""};

const userEmail=(state=initialState,action)=>{
    switch(action.type){
        case "USER_EMAIL" : return {email:action.payload};
        default: return state;
    }
}

export default userEmail;