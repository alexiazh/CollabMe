import React, { useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents, getEventsByUser, deleteEvent, createEvent, updateEvent } from '../../../actions/calendar';

import useStyles from './styles';
import { colorEvents } from '../../utils';
import { Typography, TextField, Button } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { format, parseISO } from "date-fns";

const UserCalendar = (props) => {
  const classes = useStyles();
  const { user } = props.auth;
  // const { events } = useSelector((state) => state.calendar);
  const myEvents = colorEvents(props.events.filter(event => event.title === user.username));

  useEffect(() => {
    props.getEvents();
    // props.getEventsByUser(user.username);
  }, []);

  const handleSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (user) {
      calendarApi.addEvent({
        title: user.username,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      calendarApi.getEventById('').remove();
    }
  };

  const handleEventAdd = (addInfo) => {
    props.createEvent(addInfo.event.toPlainObject());
  };

  const handleEventClick = (clickInfo) => {
    if (confirm('Are you sure you want to delete the slot?')) {
      clickInfo.event.remove();
    };
  };

  const handleEventRemove = (removeInfo) => {
    if (removeInfo?.event?.id)
      props.deleteEvent(removeInfo.event.id);
  };

  // const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());

  // const createEvent = () => {
  //   console.log(start);
  //   console.log(format(new Date(start), `yyyy-MM-dd'T'HH:mm:ss'Z'`));
  //   console.log(end);
  //   console.log(format(new Date(end), `yyyy-MM-dd'T'HH:mm:ss'Z'`));
  // } 

  return (
    <div className={classes.mainContainer}>
      <div className={classes.subcontainer}>
        <div className={classes.calendar}>
          <FullCalendar 
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView='timeGridWeek'
            allDaySlot={false}
            height={400}
            stickyHeaderDates={true}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            timeZone='America/Los_Angeles'
            slotMinTime='08:00:00'
            slotMaxTime='20:00:00'
            contentHeight='auto'
            eventDisplay='block'
            businessHours={{
              daysOfWeek: [ 1, 2, 3, 4, 5 ],
              startTime: '08:00',
              endTime: '20:00',
            }}
            eventOverlap={false}
            // events={[
            //   { id: 'a', title: 'event 1', start: '2022-03-28T10:30:00Z', end: '2022-03-28T11:30:00Z', },
            //   { id: 'b', title: 'event 2', start: '2022-03-30T10:30:00Z', end: '2022-03-30T11:30:00Z', },
            //   { id: 'c', title: 'event 3', start: '2022-03-30T10:30:00Z', end: '2022-03-30T11:30:00Z', }
            // ]}
            events={myEvents}
            // events={[
            //   {
            //     title: 'BCH237',
            //     start: '2022-03-28T10:30:00',
            //     end: '2019-03-28T11:30:00',
            //     extendedProps: {
            //       department: 'BioChemistry'
            //     },
            //     description: 'Lecture'
            //   }
            // ]}
            // editable={true}
            selectable={true}
            selectMirror={true}
            select={handleSelect}
            eventClick={handleEventClick}
            eventRemove={handleEventRemove}
            eventAdd={handleEventAdd}
          />
        </div>
        {/* <div className={classes.form}>
          <Typography variant="h6">What times might work?</Typography>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <div className={classes.timepickers}>
              <div className={classes.timepicker}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start"
                  value={start}
                  onChange={(newValue) => {
                    setStart(newValue);
                  }}
                  // minDateTime={new Date()}
                />
              </div>
              <div className={classes.timepicker}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End"
                  value={end}
                  onChange={(newValue) => {
                    setEnd(newValue);
                  }}
                  minDateTime={start}
                />
              </div>
              <Button variant="contained" onClick={createEvent}>Create Event</Button>
            </div>
          </LocalizationProvider>
        </div> */}
      </div>
    </div>
  );

};

UserCalendar.propTypes = {
  auth: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.calendar.events
});

export default connect(mapStateToProps, { getEvents, getEventsByUser, deleteEvent, createEvent, updateEvent })(UserCalendar);