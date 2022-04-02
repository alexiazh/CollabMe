import { GET_EVENTS, GET_EVENTS_BY_USER, DELETE_EVENT, CREATE_EVENT, UPDATE_EVENT } from '../actions/types.js';

const initialState = {
  events: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {...state, events: action.payload};
    case DELETE_EVENT:
      state = {...state}
      delete state[action.payload]
      return state;
    case CREATE_EVENT:
      return {...state, events: [...state.events, action.payload]};
    case UPDATE_EVENT:
      return {...state, events: [...state.events, action.payload]};
    case GET_EVENTS_BY_USER:
      return {...state, events: state.events.filter(event => event.title === action.payload)};
    default:
      return state;
  }
};