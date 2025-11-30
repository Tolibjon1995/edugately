import * as actionTypes from "../actionTypes";

export const updateLanguageAction = (lang) => {
  return {
    payload: lang,
    type: actionTypes.UPDATE_LANGUAGE,
  };
};
