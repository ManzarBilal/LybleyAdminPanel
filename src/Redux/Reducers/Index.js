import { combineReducers } from "redux";
import Mainreducer from "./Mainreducer";
import userEmail from "./userGetEmail";


export default combineReducers({
    Mainreducer,
    userEmail:userEmail,
})
