import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  console.log('inside set alert', alertType);
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  /* istanbul ignore next */
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
