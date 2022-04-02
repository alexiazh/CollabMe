import React, { useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents } from '../../../actions/calendar';
import { Navigate } from 'react-router-dom';

import useStyles from './styles';
import { colorEvents } from '../../utils';
import { Typography, TextField, Button } from '@mui/material';

const TeamCalendar = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getEvents();
  }, []);

  const eventsWithColor = colorEvents(props.events);

  // const handleDateClick = (dateInfo) => {
  //   availableUsers(dateInfo, props.events);
  // };

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
            eventDisplay='background'
            // events={[
            //   { id: 'a', title: 'event 1', start: '2022-03-28T10:30:00Z', end: '2022-03-28T11:30:00Z', },
            //   { id: 'b', title: 'event 2', start: '2022-03-30T10:30:00Z', end: '2022-03-30T11:30:00Z', },
            //   { id: 'c', title: 'event 3', start: '2022-03-30T10:30:00Z', end: '2022-03-30T11:30:00Z', }
            // ]}
            events={eventsWithColor}
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
            // dateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );

};

TeamCalendar.propTypes = {
  // isAuthenticated: PropTypes.bool,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  events: state.calendar.events
});

export default connect(mapStateToProps, { getEvents })(TeamCalendar);