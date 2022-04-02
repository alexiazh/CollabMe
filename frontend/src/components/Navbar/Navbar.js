import React, { useState } from 'react';
import { AppBar, Button, Typography, Stack, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { lime } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import GroupIcon from '@mui/icons-material/Group';

import useStyles from './styles';
import AvatarMenu from './AvatarMenu';

const Navbar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { isAuthenticated, user } = props.auth;

  return (
    <AppBar className={classes.appbar} position="static" style={{backgroundColor: lime[700]}}>
      <div className={classes.navbar}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <div>
            <IconButton
              id="menu-button"
              aria-controls={open ? 'main-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="main-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'menu-button' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => navigate("/")}><CalendarMonthIcon />&nbsp;&nbsp;Calendar</MenuItem>
              <MenuItem onClick={() => navigate("/dashboard")}><DashboardCustomizeIcon />&nbsp;&nbsp;Dashboard</MenuItem>
              <MenuItem onClick={() => navigate("/group")}><GroupIcon />&nbsp;&nbsp;Group</MenuItem>
            </Menu>
          </div>
          <Typography className={classes.logo} variant="h5" onClick={() => navigate("/")}>CollabMe</Typography>
        </Stack>
        <div className={classes.toolbar}>
          {isAuthenticated && (
            <AvatarMenu />           
            ) || (
              <div>
                <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button> 
              </div>
            )}
        </div>
      </div>
    </AppBar>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);