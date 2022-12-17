import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import history from './history'

//Components
import Register from './Pages/AuthPages/Register';
import ResetPassword from './Pages/AuthPages/ResetPassword';
import Login from './Pages/AuthPages/Login';
import Dashboard from './Pages/MainPages/Dashboard';
import Navbar from './Components/Navbar';
import DaftarSekolah from './Pages/AuthPages/DaftarSekolah';
import BottomBar from './Components/BottomBar';
import EditCreatePrasarana from './Components/CustomComponents/EditCreatePrasarana';
import ViewPrasarana from './Components/CustomComponents/ViewPrasarana';
import ViewListPrasarana from './Components/CustomComponents/ViewListPrasarana';
import ViewSarana from './Components/CustomComponents/ViewSarana';
import EditCreateSarana from './Components/CustomComponents/EditCreateSarana';
import BuatPengaduan from './Components/CustomComponents/BuatPengaduan';

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-up" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/beranda" component={Dashboard} />
        <Route path='/daftar-sekolah' component={DaftarSekolah} />
        <Route path='/data/prasarana/create' component={EditCreatePrasarana} />
        <Route path='/data/prasarana/edit/:id' component={EditCreatePrasarana} />
        <Route path='/data/sarana/create' component={EditCreateSarana} />
        <Route path='/data/list-prasarana' component={ViewListPrasarana} />
        <Route path='/data/prasarana' component={ViewPrasarana} />
        <Route path='/data/sarana' component={ViewSarana} />
        <Route path='/pengaduan' component={BuatPengaduan} />
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
