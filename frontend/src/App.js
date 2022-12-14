import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import history from './history'

import Register from './Pages/AuthPages/Register';
import ResetPassword from './Pages/AuthPages/ResetPassword';
import Login from './Pages/AuthPages/Login';
import Dashboard from './Pages/MainPages/Dashboard';
import Navbar from './Components/Navbar';
import DaftarSekolah from './Pages/AuthPages/DaftarSekolah';

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-up" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path='/daftar-sekolah' component={DaftarSekolah}/>
      </Switch>
    </Router>
  );
}

export default App;
