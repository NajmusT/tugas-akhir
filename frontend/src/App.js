import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

//Components
import BottomBar from './Components/ReusableComponent/BottomBar';
import Navbar from './Components/ReusableComponent//Navbar';
import BuatPengaduan from './Components/CustomComponents/BuatPengaduan';

import Register from './Pages/AuthPages/Register';
import ResetPassword from './Pages/AuthPages/ResetPassword';
import Login from './Pages/AuthPages/Login';
import Dashboard from './Pages/MainPages/Dashboard';
import DaftarSekolah from './Pages/AuthPages/DaftarSekolah';
import DecisionSupport from './Pages/MainPages/DecisionSupport';
import LaporanPengaduan from './Pages/MainPages/LaporanPengaduan';

import ViewListGudang from './Pages/MainPages/Data/Gudang/ViewListGudang';
import ViewListLabIPA from './Pages/MainPages/Data/LabIPA/ViewListLabIPA';
import ViewListRuangGuru from './Pages/MainPages/Data/RuangGuru/ViewList';
import ViewListRuangKelas from './Pages/MainPages/Data/RuangKelas/ViewList';
import ViewListRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/ViewList';
import ViewListTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/ViewList';
import ViewListTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/ViewList';
import ViewListToilet from './Pages/MainPages/Data/Toilet/ViewList';
import ViewListPerpustakaan from './Pages/MainPages/Data/Perpustakaan/ViewList';
import ViewListUKS from './Pages/MainPages/Data/UKS/ViewList';

import ManajemenUser from './Pages/MainPages/ManajemenUser';
import ViewPrasarana from './Components/CustomComponents/ViewPrasarana';
import ViewSarana from './Components/CustomComponents/ViewSarana';
import EditPrasarana from './Pages/MainPages/Data/EditPrasarana';
import CreatePrasarana from './Pages/MainPages/Data/CreatePrasarana';
import EditSarana from './Pages/MainPages/Data/EditSarana';
import CreateSarana from './Pages/MainPages/Data/CreateSarana';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-up" exact component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/beranda" exact component={Dashboard} />
        <Route path='/daftar-sekolah' component={DaftarSekolah} />

        <Route path='/data/prasarana/:location/:id' component={ViewPrasarana} />
        <Route path='/data/sarana/:location/:id' component={ViewSarana} />
        <Route path='/data/:location/prasarana/create' component={CreatePrasarana} />
        <Route path='/data/:location/prasarana/edit/:id' component={EditPrasarana} />
        <Route path='/data/:location/sarana/edit/:id' component={EditSarana} />
        <Route path='/data/:location/sarana/create' component={CreateSarana} />

        <Route path='/data/list-prasarana/laboratorium-IPA/:id' component={ViewListLabIPA} />
        <Route path='/data/list-prasarana/ruang-kelas/:id' component={ViewListRuangKelas} />
        <Route path='/data/list-prasarana/ruang-guru/:id' component={ViewListRuangGuru} />
        <Route path='/data/list-prasarana/ruang-pimpinan/:id' component={ViewListRuangPimpinan} />
        <Route path='/data/list-prasarana/UKS/:id' component={ViewListUKS} />
        <Route path='/data/list-prasarana/Toilet/:id' component={ViewListToilet} />
        <Route path='/data/list-prasarana/tempat-beribadah/:id' component={ViewListTempatBeribadah} />
        <Route path='/data/list-prasarana/gudang/:id' component={ViewListGudang} />
        <Route path='/data/list-prasarana/ruang-perpustakaan/:id' component={ViewListPerpustakaan} />
        <Route path='/data/list-prasarana/tempat-bermain-dan-berolahraga/:id' component={ViewListTempatBermaindanBerolahraga} />

        <Route path='/pengaduan' component={BuatPengaduan} />
        <Route path='/decision-support' component={DecisionSupport} />
        <Route path='/laporan-pengaduan' component={LaporanPengaduan} />
        <Route path='/manajemen-user' exact component={ManajemenUser} />
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
