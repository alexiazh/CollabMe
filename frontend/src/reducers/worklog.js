import { GET_LOGS, DELETE_LOG, CREATE_LOG, UPDATE_LOG } from '../actions/types.js';

const initialState = {
  logs: []
}

export default function(state = initialState, action)  {
  switch (action.type) {
    case GET_LOGS:
      return {...state, logs: action.payload};
    case CREATE_LOG:
      return {...state, logs: [...state.logs, action.payload]};
    case UPDATE_LOG:
      return { ...state, logs: [...state.logs.filter(log => log.id !== action.payload.id), action.payload.log]};
    case DELETE_LOG:
      return {...state, logs: state.logs.filter(log => log.id !== action.payload)};
    default:
      return state;
  }
};