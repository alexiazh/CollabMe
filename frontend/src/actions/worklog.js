import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_LOGS, CREATE_LOG, DELETE_LOG, UPDATE_LOG } from './types';

export const getLogs = () => (dispatch, getState) => {
  axios
    .get('api/worklog/', tokenConfig(getState))
    .then(res => {
      dispatch({ 
        type: GET_LOGS, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const createLog = (log) => (dispatch, getState)  => {
  axios
    .post('api/worklog/', log, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ createLog: "Log Created" }));
      dispatch({ 
        type: CREATE_LOG, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteLog = (id) => (dispatch, getState) => {
  axios
    .delete(`api/worklog/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteLog: "Log Deleted" }));
      dispatch({ 
        type: DELETE_LOG, 
        payload: id 
      });
    })
    .catch(err => console.log(err));
};

export const updateLog = (id, log) => (dispatch, getState) => {
  axios
    .post(`api/worklog/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateLog: "Log Updated" }));
      dispatch({ 
        type: UPDATE_LOG, 
        payload: { id, log }
      });
    })
    .catch(err => console.log(err));
};