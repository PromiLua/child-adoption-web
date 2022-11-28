import { instanceAxios } from './config/ApiConfigure';
import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';

export const getDashboard = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceAxios.get(`/dashboard`);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_DASHBOARD,
        })
      );
    }
  };
};
