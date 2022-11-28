import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from './messages/AlertReducer';
import LoadingReducer from './loading/LoadingReducer';

export default configureStore({
  reducer: {
    loading: LoadingReducer,
    alert: AlertReducer,
  },
});
