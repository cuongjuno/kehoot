import { combineReducers } from "redux";
import authReducer from "./user/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});
export default rootReducer;
