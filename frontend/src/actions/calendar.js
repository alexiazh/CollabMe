import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_EVENTS, GET_EVENTS_BY_USER, DELETE_EVENT, CREATE_EVENT, UPDATE_EVENT } from './types';

export const getEvents = () => (dispatch, getState) => {
  axios
    .get('api/events/', tokenConfig(getState))
    .then(res => {
      dispatch({ 
        type: GET_EVENTS, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getEventsByUser = (username) => (dispatch, getState) => {
  axios
    .get('api/events/', tokenConfig(getState))
    .then(res => {
      dispatch({ 
        type: GET_EVENTS_BY_USER, 
        payload: username
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteEvent = (id) => (dispatch, getState) => {
  axios
    .delete(`api/events/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteEvent: "Slot Deleted" }));
      dispatch({ 
        type: DELETE_EVENT, 
        payload: id 
      });
    })
    .catch(err => console.log(err));
};

export const createEvent = (event) => (dispatch, getState)  => {
  axios
    .post('api/events/', event, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ createEvent: "Slot Created" }));
      dispatch({ 
        type: CREATE_EVENT, 
        payload: res.data 
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateEvent = (event) => (dispatch, getState)  => {
  axios
    .post('api/events/', event, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ createEvent: "Availability Updated" }));
      dispatch({ 
        type: UPDATE_EVENT,
        payload: res.data
      });
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status)));
};