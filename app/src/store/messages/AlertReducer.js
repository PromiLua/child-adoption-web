import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  open: false,
  severity: 'info',
  message: 'This is an information message!',
};

export const addAlert = createAction('ADD_ALERT');
export const removeAlert = createAction('REMOVE_ALERT');

export default createReducer(INITIAL_STATE, {
  [addAlert.type]: (state, action) => {
    return {
      ...state,
      open: true,
      message: action.payload.message,
      severity: action.payload.severity,
    };
  },
  [removeAlert.type]: (state) => {
    return { ...state, open: false, message: '', severity: 'info' };
  },
});
