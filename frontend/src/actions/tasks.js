import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_TASKS, DELETE_TASK, ADD_TASK } from './types';

export const getTasks = () => (dispatch, getState) => {
  axios
    .get('api/tasks/', tokenConfig(getState))
    .then(res => {
      dispatch({ 
        type: GET_TASKS, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteTask = (id) => (dispatch, getState) => {
  axios
    .delete(`api/tasks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteTask: "Task Deleted" }));
      dispatch({ 
        type: DELETE_TASK, 
        payload: id 
      });
    })
    .catch(err => console.log(err));
};

export const addTask = (task) => (dispatch, getState)  => {
  axios
    .post('api/tasks/', task, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addTask: "Task Added" }));
      dispatch({ 
        type: ADD_TASK, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};