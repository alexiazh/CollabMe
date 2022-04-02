import { GET_MEMBERS, DELETE_MEMBER, ADD_MEMBER} from '../actions/types.js';

const initialState = {
  members: []
}

export default function(state = initialState, action)  {
  switch (action.type) {
    case GET_MEMBERS:
      return {...state, members: action.payload};
    case ADD_MEMBER:
      return {...state, members: [...state.members, action.payload]};
    case DELETE_MEMBER:
      return {...state, members: state.members.filter(member => member.id !== action.payload)};
    default:
      return state;
  }
};