import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth'; 
import { createMessage } from '../../actions/messages';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    classes: PropTypes.object.isRequired,
  }

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = { username, email, password };
      this.props.register(newUser);
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          <form autoComplete="off" onSubmit={this.onSubmit}>
            <Typography variant="h6">Register</Typography>
            <TextField name="username" variant="outlined" label="Username" type="text" fullWidth margin="dense" value={username} onChange={this.onChange} />
            <TextField name="email" variant="outlined" label="Email" type="email" fullWidth margin="dense" value={email} onChange={this.onChange} />
            <TextField name="password" variant="outlined" label="Password" type="password" fullWidth margin="dense" value={password} onChange={this.onChange} />
            <TextField name="password2" variant="outlined" label="Confirm Password" type="password" fullWidth margin="dense" value={password2} onChange={this.onChange} />
            <div className={classes.button}><Button variant="contained" color="primary" size="large" type="submit" fullWidth>Register</Button></div>
            <Typography variant="body1">Already have an account? <Link to="/login">Login</Link></Typography>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(withStyles(styles)(Register)); 