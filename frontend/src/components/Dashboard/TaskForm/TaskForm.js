import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Stack, TextField, CardContent, CardActions } from '@mui/material';
import { grey, lime } from '@mui/material/colors';

import useStyles from './styles';
import { getTasks, addTask } from '../../../actions/tasks';

const TaskForm = (props) => {
  const classes = useStyles();

  const initialTask = {
    title: '',
    subtask: '',
    member: '',
    email: '',
    description: '',
  }

  const [taskData, setTaskData] = useState(initialTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(taskData);
  }

  return (
    <div>
      <CardContent>
        <TextField name="title" type="text" variant="outlined" label="Title" margin="dense" fullWidth 
        value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
      </CardContent>
      <CardActions className={classes.actionArea} style={{backgroundColor: grey[100]}}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Button style={{backgroundColor: lime[700]}} variant="contained" className={classes.buttonSubmit} onClick={handleSubmit} type="submit" >
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
  username: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  tasks: state.tasks.tasks
});

export default connect(mapStateToProps, { getTasks, addTask })(TaskForm);