import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import calendar from './calendar';
import tasks from './tasks';
import group from './group';
import worklog from './worklog';

export default combineReducers({
  errors, 
  messages,
  auth,
  calendar,
  tasks,
  group,
  worklog
});