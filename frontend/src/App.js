import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from './Context/GlobalState.js';
import SchoolList from './Pages/ExerciseCRUD/SchoolList.js';
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route path="/sign-in" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/register" component={SignUp} />
          <Route path="/" component={SchoolList} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
