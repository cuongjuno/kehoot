import * as actionTypes from "../../actions/types";

const userReducer = (
  state = { token: null, isAuthenticated: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_AUTH_SUCCESS:
      localStorage.setItem("token", payload)
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
        loading: false,
      };
    case actionTypes.USER_AUTH_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.USER_AUTH_LOGOUT:
      localStorage.setItem("token","")
      return {
        ...state,
        isAuthenticated: false,
        token: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
