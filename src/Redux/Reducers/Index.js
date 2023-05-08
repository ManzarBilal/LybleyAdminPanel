import Mainreducer from "./Mainreducer";
import userEmail from "./userGetEmail";
import getCategory from "./categoryReducer";
import getProducts from "./productReducer";
import getSpareParts from "./sparePartReducer";
import userDetail from "./userDetails";
const {combineReducers} = require("redux");

const rootReducer= combineReducers({
    Mainreducer,
    userEmail:userEmail,
    category:getCategory,
    products:getProducts,
    spareParts:getSpareParts,
    userDetail:userDetail
})

export default rootReducer;