import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Typography, IconButton, Button, Stack, TextField, Tooltip,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { grey, lime } from '@mui/material/colors';

import useStyles from './styles';
import { formatGroup } from '../utils';
import { getMembers, addMember, deleteMember } from '../../actions/group';

const Group = (props) => {
  const classes = useStyles();
  const { username, email } = props.user;
  const inGroup = props.members.find(member => member.username === username) ? true : false;

  useEffect(() => {
    props.getMembers();
  }, []);

  const group = formatGroup(props.members);
  const height = group.length ? (55 * (group.length + 2)) : 100;

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'first_name', headerName: 'First name', width: 100 },
    { field: 'last_name', headerName: 'Last name', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contact', headerName: 'Meeting Link', width: 250, sortable: false },
    { field: 'created_at', headerName: 'Joined on', width: 100 },
  ];

  const [openDialog, setOpenDialog] = useState(false);

  const initialMember = {
    username: username,
    first_name: '',
    last_name: '',
    email: email,
    contact: '',
  }

  const [memberData, setMemberData] = useState(initialMember);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addMember(memberData);
    setMemberData(initialMember);
    setOpenDialog(false);
  }

  const handleRemove = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to quit the group?')) {
      props.deleteMember(props.members.find(member => member.username === username).id);
    };
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.header}>
          <Tooltip 
            placement="left"
            title={
              <Typography color="inherit">
                {inGroup ? 'Delete me from the group' : 'Add me to the group'}
              </Typography>
            }>
            {inGroup ? <Button onClick={handleRemove} style={{color: lime[700]}}><PersonRemoveIcon fontSize="large" /></Button>
            : <Button onClick={() => setOpenDialog(true)} style={{color: lime[700]}}><PersonAddIcon fontSize="large" /></Button>}
          </Tooltip>
        </div>
        <div className={classes.memberlist} style={{ height: `${height}px`, width: 900 }}>
          <DataGrid rows={group} columns={columns} pageSize={10} rowsPerPageOptions={[10]} disableSelectionOnClick />
        </div>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add to group</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out your contact information below. This can be seen by all users.</DialogContentText>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <TextField name="first_name" type="text" variant="outlined" label="First Name" margin="dense" fullWidth autoFocus
              value={memberData.first_name} onChange={(e) => setMemberData({ ...memberData, first_name: e.target.value })} />
            <TextField name="last_name" type="text" variant="outlined" label="Last Name" margin="dense" fullWidth autoFocus
              value={memberData.last_name} onChange={(e) => setMemberData({ ...memberData, last_name: e.target.value })} />
          </Stack>
          <TextField name="contact" type="text" variant="outlined" label="Meeting Link" margin="dense" fullWidth autoFocus
            value={memberData.contact} onChange={(e) => setMemberData({ ...memberData, contact: e.target.value })} />
        </DialogContent>
        <DialogActions style={{backgroundColor: grey[100]}}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button style={{backgroundColor: lime[700]}} variant="contained" onClick={handleSubmit} type="submit" >
              Submit
            </Button>
            <Button style={{color: lime[700], borderColor: lime[700]}} variant="outlined" onClick={() => setMemberData(initialMember)} type="clear" >
              Clear
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Group.propTypes = {
  user: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  getMembers: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  members: state.group.members
});

export default connect(mapStateToProps, { getMembers, addMember, deleteMember })(Group);