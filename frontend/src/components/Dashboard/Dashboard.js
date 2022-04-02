import React, { useEffect, useState, Component } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from "date-fns";
import { Card, CardHeader, CardActions, CardContent, Grid, Typography, IconButton, Button, Avatar, AvatarGroup, Stack, TextField, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, FormControl, MenuItem, Select, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Collapse from '@mui/material/Collapse';
import { grey, lime } from '@mui/material/colors';

import useStyles from './styles';
import { styled } from '@mui/material/styles';
import { getTasks, addTask } from '../../actions/tasks';
import { getMembers } from '../../actions/group';
import { formatTasks, stringAvatar } from '../utils';
import TaskForm from './TaskForm/TaskForm';

const Dashboard = (props) => {
  useEffect(() => {
    props.getTasks();
    props.getMembers();
  }, []);

  const formattedTasks = formatTasks(props.tasks);

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), "eee MMM. d, yyyy H:mm");
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const initialTask = {
    title: '',
    subtask: '',
    member: '',
    email: '',
    description: '',
  }

  const [selectedTitle, setSelectedTitle] = useState('');
  const handleOpenDialog = (title) => {
    setSelectedTitle(title);
    setOpenDialog(true);
  }

  const renderMenuItems = () => {
    return props.members.map((member) => (
      <MenuItem key={member.id} value={member.username}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Avatar fontSize="small" {...stringAvatar(member.username)}/>
          <Typography>{member.first_name} {member.last_name} ({member.username})</Typography>
        </Stack>
      </MenuItem>
    ))
  }

  const [taskData, setTaskData] = useState(initialTask);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskData = { ...taskData, title: selectedTitle }
    setTaskData(newTaskData);
    props.addTask(newTaskData);
    setTaskData(initialTask);
    setOpenDialog(false);
  }

  const classes = useStyles();
  return(
    <div>
    <Grid className={classes.mainContainer} container spacing={3}>
      {formattedTasks?.map((task) => (
        <Grid className={classes.container} key={task.id} item xs={12} sm={8} md={6} lg={4}>
          <Card className={classes.card} raised elevation={6} >
            <CardHeader style={{backgroundColor: lime[300]}}
              title={task.title} 
              subheader={<div className={classes.subheader}><AccessTimeIcon /><Typography color="textSecondary">&nbsp;{formatDate(task.created_at)}</Typography></div>}
              action={
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>}
            >
            </CardHeader>
            <Collapse in={expanded} timeout="auto" unmountOnExit style={{backgroundColor: lime[100]}}>
              <CardContent>
              {task.subtasks[0].title && (
                <Stack direction="column" spacing={1}>
                  {task.subtasks.map((subtask) => (
                    <Card key={subtask.title} className={`${classes.card} ${classes.subCard}`} raised elevation={2}>
                      <CardContent>
                        <Typography variant="subtitle1" color="textSecondary">{subtask.title}</Typography>
                      </CardContent>
                      <CardActions className={classes.actionArea} disableSpacing>
                        <IconButton><Avatar {...stringAvatar(subtask.member)}/></IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              ) || (
                <Card raised elevation={2}>
                  <CardContent><Typography variant="subtitle1">No Assignment</Typography></CardContent>
                </Card>
              )}
              </CardContent>
            </Collapse>
            <CardActions className={classes.actionArea} disableSpacing style={{backgroundColor: grey[100]}}>
              {task.subtasks[0].title && (
                <AvatarGroup max={5}>
                  {task.subtasks.map((subtask) => (<Avatar key={subtask.title} {...stringAvatar(subtask.member)}/>))}
                </AvatarGroup>
              ) || (<Avatar />)}
              {props.members.length === 0 && (
                <Tooltip
                  placement="left"
                  title={<Typography color="inherit">No group members available</Typography>}
                  >
                  <IconButton><InfoOutlinedIcon style={{color: lime[800]}} fontSize="large" /></IconButton>
                </Tooltip>
              ) || (
                <IconButton onClick={() => handleOpenDialog(task.title)}>
                  <AddTaskIcon style={{color: lime[800]}} fontSize="large" />
                </IconButton>
              )}
            </CardActions>
          </Card>
        </Grid>
    ))}
    <Grid className={classes.container} item xs={12} sm={8} md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader style={{backgroundColor: lime[200]}}
          title={<Typography variant="h5" color="textSecondary">New Task</Typography>}
          action={<IconButton onClick={() => setOpenTaskForm(!openTaskForm)}><AddCircleOutlineIcon fontSize="large"/></IconButton>}>
        </CardHeader>
        {openTaskForm && (<TaskForm />)}
      </Card>
    </Grid>
  </Grid>
  <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Add a Subtask for {selectedTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Assign a specific subtask to a group member.
      </DialogContentText>
      <TextField name="subtask" type="text" variant="outlined" label="Task" margin="dense" fullWidth autoFocus
        value={taskData.subtask} onChange={(e) => setTaskData({ ...taskData, subtask: e.target.value })} />
      <FormControl fullWidth>
        <InputLabel id="select-label">Member</InputLabel>
        <Select labelId="select-label" id="select" label="Member"
          value={taskData.member}
          onChange={(e) => setTaskData({ ...taskData, member: e.target.value })}
        >
          {renderMenuItems()}
        </Select>  
      </FormControl>
    </DialogContent>
    <DialogActions style={{backgroundColor: grey[100]}}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={handleSubmit} type="submit" >
          Submit
        </Button>
        <Button style={{color: lime[700], borderColor: lime[700]}} variant="outlined" onClick={() => setTaskData(initialTask)} type="clear" >
          Clear
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
  </div>
  );
};

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  getMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  tasks: state.tasks.tasks,
  members: state.group.members
});

export default connect(mapStateToProps, { getMembers, getTasks, addTask })(Dashboard);