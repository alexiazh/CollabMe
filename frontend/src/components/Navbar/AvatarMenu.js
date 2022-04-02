import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { IconButton, Avatar, Menu, MenuItem, Divider, Typography } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey, lime } from '@mui/material/colors';

import { stringAvatar } from '../utils';

const AvatarMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navigate = useNavigate();

  return (
    <div>
      <IconButton
        id="account-button"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <Avatar style={{border: `1px solid ${lime[300]}`}} {...stringAvatar(props.username)} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate("/worklog")}><NotesIcon />&nbsp;&nbsp;Worklog</MenuItem>
        <Divider />
        <MenuItem onClick={props.logout}><LogoutIcon />&nbsp;&nbsp;Logout</MenuItem>
      </Menu>
    </div>
  );
};

AvatarMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps, { logout })(AvatarMenu);