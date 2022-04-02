import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton, Tooltip, Typography, Stack, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { grey, lime } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';

import useStyles from './styles';
import { getLogs } from '../../actions/worklog';
import Timelist from './Timelist/Timelist';
import { formatLogs } from '../utils';

const Worklog = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getLogs();
  }, []);

  const myLogs = props.logs.filter(log => log.username === props.username);
  const logs = formatLogs(myLogs);

  const height = myLogs.length ? (55 * (myLogs.length + 2)) : 100;
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'session', headerName: 'Session', width: 200, sortable: false },
    { field: 'notes', headerName: 'Notes', width: 300, sortable: false },
    { field: 'created_at', headerName: 'Edited at', width: 160 },
  ];

  const [view, setView] = useState('table');
  const handleChange = (e, view) => {
    setView(view);
  };
  
  return (
    <div className={classes.container}>
      <Stack className={classes.header} direction="row" spacing={2} justifyContent="center">
        <ToggleButtonGroup color="primary" value={view} exclusive onChange={handleChange}>
          <ToggleButton value='table'>Table View</ToggleButton>
          <ToggleButton value='timelist'>Timelist View</ToggleButton>
        </ToggleButtonGroup>
        <Tooltip placement="right" 
          title={
          <Typography color="inherit">
            {view === 'table' ? 'Click on table header to sort/filter logs'
             : 'Click on a time slot to view/edit its log'}
          </Typography>}>
          <InfoIcon color="action" fontSize="large"/>
        </Tooltip>
      </Stack>
      {view === 'table' && (
        <Paper className={classes.paper} elevation={6}>
          <div style={{ height: `${height}px`, width: 715 }}>
            <DataGrid rows={logs} columns={columns} pageSize={10} rowsPerPageOptions={[10]} disableSelectionOnClick />
          </div>
        </Paper>
      ) || (
        <Timelist />
      )}
    </div>
  );
};

Worklog.propTypes = {
  username: PropTypes.string.isRequired,
  logs: PropTypes.array.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  logs: state.worklog.logs
});

export default connect(mapStateToProps, { getLogs })(Worklog);