import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const PrivateRoute = ({ auth, children }) => {
  if (auth.isLoading) {
    return <Typography variant="h2">Loading...</Typography>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);