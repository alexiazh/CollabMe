import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Stack, TextField, CardContent, CardActions } from '@mui/material';
import { grey, lime } from '@mui/material/colors';

import useStyles from './styles';
import { getTasks, addTask } from '../../../actions/tasks';
import { formatTasks } from '../../utils';

const TaskForm = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getTasks();
  }, []);

  const initialTask = {
    title: '',
    subtask: '',
    member: '',
    email: '',
    description: '',
  }

  const [taskData, setTaskData] = useState(initialTask);

  const formattedTasks = formatTasks(props.tasks);
  const taskExists = formattedTasks.find(task => task.title === taskData.title) !== undefined;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskExists) {
      props.addTask(taskData);
      setTaskData(initialTask);
    }
  }

  return (
    <div>
      <CardContent>
        <TextField error={taskExists} helperText={taskExists ? 'Task already exits.' : ''} name="title" type="text" variant="outlined" label="Title" margin="dense" fullWidth 
        value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
      </CardContent>
      <CardActions className={classes.actionArea} style={{backgroundColor: grey[100]}}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Button disabled={taskExists} style={{backgroundColor: lime[700]}} variant="contained" className={classes.buttonSubmit} onClick={handleSubmit} type="submit" >
            Submit
          </Button>
          <Button style={{color: lime[700], borderColor: lime[700]}} variant="outlined" onClick={() => setTaskData(initialTask)} type="clear" >
            Clear
          </Button>
        </Stack>
      </CardActions> 
    </div>   
  )
};

TaskForm.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { getTasks, addTask })(TaskForm);