import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

// create middlewares for handle async actions
const middewares = [thunk];

// create store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middewares))
);

export default store;
