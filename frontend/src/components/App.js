import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Alerts from './Alerts';
import Login from './Auth/Login';
import Register from './Auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Group from './Group/Group';
import Worklog from './Worklog/Worklog';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

const alertOptions = {
  timeout: 3000,
  position: 'top center',
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <HashRouter>
            <Fragment>
              <Navbar />
              <Alerts />
              <Routes>
                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/register" element={<Register />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route exact path="/group" element={<PrivateRoute><Group /></PrivateRoute>} />
                <Route exact path="/worklog" element={<PrivateRoute><Worklog /></PrivateRoute>}/>
              </Routes>
            </Fragment>
          </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('app'));