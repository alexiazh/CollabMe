import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_MEMBERS, ADD_MEMBER, DELETE_MEMBER } from './types';

export const getMembers = () => (dispatch, getState) => {
  axios
    .get('api/group/', tokenConfig(getState))
    .then(res => {
      dispatch({ 
        type: GET_MEMBERS, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addMember = (member) => (dispatch, getState)  => {
  axios
    .post('api/group/', member, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addMember: "Member Added" }));
      dispatch({ 
        type: ADD_MEMBER, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteMember = (id) => (dispatch, getState) => {
  axios
    .delete(`api/group/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteMember: "Member Deleted" }));
      dispatch({ 
        type: DELETE_MEMBER, 
        payload: id 
      });
    })
    .catch(err => console.log(err));
};