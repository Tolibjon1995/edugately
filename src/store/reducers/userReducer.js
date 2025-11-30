import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SAVE_DATA,
  UPDATE_LANGUAGE,
} from "../actionTypes";

const initialState = {
  access: "",
  refresh: "",
  data: {},
  role: "",
  user: {
    lang: "ru",
  },
};

const userReducer = (state = initialState, action) => {
  const {lastStep,form} = action
  const { payload } = { ...action };
  switch (action.type) {
    
    case AUTH_SIGN_UP: {
      return { payload };
    }
    case UPDATE_LANGUAGE: {
      return {
        ...state,
        user: {
          ...state.user,
          lang: action.payload,
        },
      };
    }
    // case AUTH_SAVE_DATA:{
    //     return {...state,lastStep,form}
    // }
    case AUTH_SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
