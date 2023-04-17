import { applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Redux/Reducers/Index";



const store=createStore(rootReducer,{},applyMiddleware(thunk));

export default store;