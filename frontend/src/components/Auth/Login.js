import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    classes: PropTypes.object.isRequired,
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, password } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          <form autoComplete="off" onSubmit={this.onSubmit}>
            <Typography variant="h6">Login</Typography>
            <TextField name="username" variant="outlined" label="Username" type="text" fullWidth margin="normal" value={username} onChange={this.onChange} />
            <TextField name="password" variant="outlined" label="Password" type="password" fullWidth margin="normal" value={password} onChange={this.onChange} />
            <div className={classes.button}><Button variant="contained" color="primary" size="large" type="submit" fullWidth>Login</Button></div>
            <Typography variant="body1">Don't have an account? <Link to="/register">Register</Link></Typography>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(withStyles(styles)(Login)); 