import Mainreducer from "./Mainreducer";
import userEmail from "./userGetEmail";
import getCategory from "./categoryReducer";
const {combineReducers} = require("redux");

const rootReducer= combineReducers({
    Mainreducer,
    userEmail:userEmail,
    category:getCategory
})

export default rootReducer;