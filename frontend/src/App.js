import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignIn from "./Pages/SignIn";
import SignUp from './Pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
