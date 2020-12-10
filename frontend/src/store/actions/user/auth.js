import { loginRequest } from "../../api/user/user";
import * as actionTypes from "../types";

export const login = (data, history) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_AUTH_START,
  });
  try {
    const res = await loginRequest(data);
    dispatch({
      type: actionTypes.USER_AUTH_SUCCESS,
      payload: res.data.token,
    });
    history.push("/");
  } catch (error) {
    // handle error here
    alert("Login failed");
    dispatch({
      type: actionTypes.USER_AUTH_FAILED,
      payload: error,
    });
  }
};

export const logout = () => (dispatch) =>{
  dispatch({
    type: actionTypes.USER_AUTH_LOGOUT,
    payload: null,
  });
};
