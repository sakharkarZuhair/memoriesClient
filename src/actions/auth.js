import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //// Login the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    //// Sign UP the user

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
