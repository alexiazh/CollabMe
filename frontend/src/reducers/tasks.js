import { GET_TASKS, DELETE_TASK, ADD_TASK} from '../actions/types.js';

const initialState = {
  tasks: []
}

export default function(state = initialState, action)  {
  switch (action.type) {
    case GET_TASKS:
      return {...state, tasks: action.payload};
    // case DELETE_TASK:
    //   return {...state, users: state.users.filter(user => user.id !== action.payload)};
    case ADD_TASK:
      return {...state, tasks: [...state.tasks, action.payload]};
    default:
      return state;
  }
};