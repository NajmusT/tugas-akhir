import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignIn from "./Pages/SignIn";
import SignUp from './Pages/SignUp';
import ResetPassword from './Pages/ResetPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
      </Switch>
    </Router>
  );
}

export default App;
