import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SAVE_DATA, AUTH_UPDATE_INFO, REMOVE_INFO } from '../actionTypes';

export const signUpAction = (payload) => {
  console.log("payload", payload);
  return {
    payload,
    type: AUTH_SIGN_UP,
  };
};
signUpAction()
export const updateInfo = (payload2) => {
  return {
    payload: payload2,
    type: AUTH_UPDATE_INFO,
  };
};

export const removeInfo = () => {
  return {
    type: REMOVE_INFO,
  };
};

export const signOutAction = () => {
  return {
    type: AUTH_SIGN_OUT,
  };
};
export const authSaveData = (lastStep, form) => {
  return {
    lastStep,
    form,
    type: AUTH_SAVE_DATA,
  };
};
