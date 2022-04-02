import React, { useState } from 'react';
import { Paper, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import useStyles from './styles';
import TeamCalendar from './TeamCalendar/TeamCalendar';
import UserCalendar from './UserCalendar/UserCalendar';

const Home = () => {
  const classes = useStyles();

  const [teamView, setTeamView] = useState('team');
  const handleChange = (event, view) => {
    setTeamView(view);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.header}>
          <ToggleButtonGroup
            color="primary"
            value={teamView}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value='team'>Team View</ToggleButton>
            <ToggleButton value='individual'>Individual View</ToggleButton>
          </ToggleButtonGroup>
          <Tooltip 
            placement="left"
            title={
              <Typography color="inherit">
                {teamView == 'team' ? 
                'Team Availability Calendar' : 
                'Drag to select slots. Click to delete.'}
              </Typography>
            }>
            <InfoIcon color="action" fontSize="large" />
          </Tooltip>
        </div>
        {teamView == 'team' ? <TeamCalendar /> : <UserCalendar />}
      </Paper>
    </div>
  );
};

export default Home;