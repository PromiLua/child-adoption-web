import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  open: false,
};

export const isBusy = createAction('STATUS_LOADING');

export default createReducer(INITIAL_STATE, {
  [isBusy.type]: (state, action) => {
    return { ...state, open: action.payload };
  },
});
