import React, { useEffect, useState } from 'react';
import FullCalendar, { formatDate, formatRange } from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography, FormControl, TextField, Stack, Button, Card, CardHeader, CardActions, CardContent, IconButton } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { format, parse, parseISO } from "date-fns";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey, lime } from '@mui/material/colors';

import { getLogs, createLog, deleteLog, updateLog } from '../../../actions/worklog';
import { getEvents } from '../../../actions/calendar';
import { colorEvents, formatTimeRange } from '../../utils';
import useStyles from './styles';

const Timelist = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getEvents();
    props.getLogs();
  }, []);

  const { username, email } = props.user;
  const myEvents = colorEvents(props.events.filter(event => event.title === username));

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const selectedLog = (props.logs.find(log => log.start === start));

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event.toPlainObject();
    setStart(event.start);
    setEnd(event.end);
  };
  
  const initialLog = {
    username: username,
    email: email,
    notes: '',
    start: '',
    end: '',
  };

  const [logData, setLogData] = useState(initialLog);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLogData = { ...logData, start: start, end: end };
    props.createLog(newLogData);
    setLogData(initialLog);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete the notes?')) {
      props.deleteLog(selectedLog.id);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    props.deleteLog(selectedLog.id);
    const newLogData = { ...logData, start: start, end: end };
    props.createLog(newLogData);
    setLogData(initialLog);
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);

  const handleEditClick = () => {
    setEdit(true);
    setLogData({ ...logData, notes: selectedLog.notes });
  };

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), "eee MMM. d, yyyy H:mm");
  };

  const renderLogForm = () => {
    return (
      <Card className={classes.card} elevation={6} xs={12} sm={8} md={6} lg={4}>
        <CardHeader style={{backgroundColor: lime[300]}}
          title={<Typography variant="h6">Session: {formatTimeRange(start, end)}</Typography>}
          subheader={<Typography variant="subtitle1" color="textSecondary">No notes found on this session.</Typography>}
        ></CardHeader>
        <CardContent style={{backgroundColor: lime[50]}}>
          <TextField name="notes" type="text" variant="filled" label="Add Notes" margin="dense" fullWidth multiline maxRows={5}
            value={logData.notes} onChange={(e) => setLogData({ ...logData, notes: e.target.value })} />
        </CardContent>
        <CardActions className={classes.actionArea} style={{backgroundColor: grey[100]}}>
          <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={handleSubmit} type="submit" >
            Submit
          </Button>
          <Button style={{color: lime[700], borderColor: lime[700]}} variant="outlined" onClick={() => setLogData(initialLog)} type="clear" >
            Clear
          </Button>
        </CardActions>
      </Card>
    );
  };

  const renderLog = () => {
    return (
      <Card className={classes.card} elevation={6} xs={12} sm={8} md={6} lg={4}>
      <CardHeader style={{backgroundColor: lime[300]}}
        title={<Typography variant="h6">Session: {formatTimeRange(start, end)}</Typography>}
        subheader={<Typography variant="subtitle1" color="textSecondary">Created at {formatDate(selectedLog.created_at)}</Typography>}
        ></CardHeader>
      <CardContent style={{backgroundColor: lime[50]}}>
      {edit && (
        <TextField name="notes" type="text" variant="outlined" label={edit ? "Edit Notes" : "Add Notes" } margin="dense" fullWidth autoFocus
          value={logData.notes} onChange={(e) => setLogData({ ...logData, notes: e.target.value })} />
      ) || (
        <Typography className={classes.logSection}>{selectedLog ? selectedLog.notes : ''}</Typography>
      )}
      </CardContent>
      <CardActions className={classes.actionArea} style={{backgroundColor: grey[100]}}>
      {edit && (
        <Stack direction="row" spacing={2}>
          <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={handleUpdate} >
            Update
          </Button>
          <Button style={{color: lime[700], borderColor: lime[700]}} variant="outlined" onClick={() => setEdit(false)} >
            Cancel
          </Button>
        </Stack>
      ) || (
        <Stack direction="row" spacing={2}>
          <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={() => handleEditClick()} >
            <EditIcon fontSize="small" />&nbsp;Edit
          </Button>
          <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={handleDelete} >
            <DeleteIcon fontSize="small" />&nbsp;Delete
          </Button>
        </Stack>
      )}
      </CardActions>
    </Card>
    );
  };

  // const renderAllLogs = () => {
  //   return (
  //     <Paper className={classes.paper} elevation={6} xs={12} sm={8} md={6} lg={4}>
  //       <Typography variant="h6">Session: {formatTimeRange(start, end)}</Typography>
  //       <FormControl fullWidth>
  //         <TextField name="notes" type="text" variant="outlined" label="Add Log" margin="dense" fullWidth autoFocus
  //           value={logData.notes} onChange={(e) => setLogData({ ...logData, notes: e.target.value })} />
  //       </FormControl>
  //     </Paper>
  //   )
  // }

  return (
    <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} justifyContent="center" alignItems="flex-start">
      <Paper className={classes.paper} elevation={6} xs={12} sm={8} md={6} lg={4}>
        <FullCalendar 
          plugins={[interactionPlugin, listPlugin]}
          initialView='listWeek'
          stickyHeaderDates={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'listWeek,listDay'
          }}
          views={{
            listWeek: {
              type: 'listWeek',
              buttonText: 'week'
            },
            listDay: {
              type: 'listDay',
              buttonText: 'day'
            }
          }}
          timeZone='America/Los_Angeles'
          slotMinTime='08:00:00'
          slotMaxTime='20:00:00'
          contentHeight='auto'
          eventDisplay='block'
          eventOverlap={false}
          events={myEvents}
          eventClick={handleEventClick}
          />
      </Paper>
      {(start !== '') && (selectedLog ? renderLog() : renderLogForm())}
    </Stack>
  );
};

Timelist.propTypes = {
  logs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired,
  createLog: PropTypes.func.isRequired,
  deleteLog: PropTypes.func.isRequired,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  logs: state.worklog.logs,
  user: state.auth.user,
  events: state.calendar.events
});

export default connect(mapStateToProps, { getEvents, getLogs, createLog, deleteLog, updateLog })(Timelist);
