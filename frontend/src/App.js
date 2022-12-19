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
import BuatPengaduan from './Components/CustomComponents/BuatPengaduan';
import DecisionSupport from './Pages/MainPages/DecisionSupport';
import LaporanPengaduan from './Pages/MainPages/LaporanPengaduan';

import CreatePrasaranaGudang from './Pages/MainPages/Data/Gudang/CreatePrasaranaGudang';
import EditPrasaranaGudang from './Pages/MainPages/Data/Gudang/EditPrasaranaGudang';
import EditSaranaGudang from './Pages/MainPages/Data/Gudang/EditSaranaGudang';
import CreateSaranaGudang from './Pages/MainPages/Data/Gudang/CreateSaranaGudang';
import ViewListGudang from './Pages/MainPages/Data/Gudang/ViewListGudang';
import ViewGudang from './Pages/MainPages/Data/Gudang/ViewGudang';
import ViewSaranaGudang from './Pages/MainPages/Data/Gudang/ViewSaranaGudang';

import EditPrasaranaLabIPA from './Pages/MainPages/Data/LabIPA/EditPrasaranaLabIPA';
import EditSaranaLabIPA from './Pages/MainPages/Data/LabIPA/EditSaranaLabIPA';
import CreateSaranaLabIPA from './Pages/MainPages/Data/LabIPA/CreateSaranaLabIPA';
import ViewListLabIPA from './Pages/MainPages/Data/LabIPA/ViewListLabIPA';
import ViewLabIPA from './Pages/MainPages/Data/LabIPA/ViewLabIPA';
import ViewSaranaLabIPA from './Pages/MainPages/Data/LabIPA/ViewSaranaLabIPA';
import CreatePrasaranaLabIPA from './Pages/MainPages/Data/LabIPA/CreatePrasaranaLabIPA';

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

        <Route path='/data/prasarana/laboratorium-IPA/create' component={CreatePrasaranaLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA/edit/:id' component={EditPrasaranaLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA/sarana/edit/:id' component={EditSaranaLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA/sarana/create' component={CreateSaranaLabIPA} />
        <Route path='/data/list-prasarana/laboratorium-IPA' component={ViewListLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA' component={ViewLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA/sarana' component={ViewSaranaLabIPA} />

        <Route path='/data/prasarana/ruang-kelas/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/ruang-kelas/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/ruang-kelas/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/ruang-kelas/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/ruang-kelas' component={ViewListGudang} />
        <Route path='/data/prasarana/ruang-kelas' component={ViewGudang} />
        <Route path='/data/prasarana/ruang-kelas/sarana' component={ViewSaranaLabIPA} />

        <Route path='/data/prasarana/ruang-guru/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/ruang-guru/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/ruang-guru/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/ruang-guru/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/ruang-guru' component={ViewListGudang} />
        <Route path='/data/prasarana/ruang-guru' component={ViewGudang} />
        <Route path='/data/prasarana/ruang-guru/sarana' component={ViewSaranaLabIPA} />

        <Route path='/data/prasarana/ruang-pimpinan/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/ruang-pimpinan/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/ruang-pimpinan/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/ruang-pimpinan/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/ruang-pimpinan' component={ViewListGudang} />
        <Route path='/data/prasarana/ruang-pimpinan' component={ViewGudang} />
        <Route path='/data/prasarana/ruang-pimpinan/sarana' component={ViewSaranaLabIPA} />

        <Route path='/data/prasarana/toilet/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/toilet/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/toilet/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/toilet/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/toilet' component={ViewListGudang} />
        <Route path='/data/prasarana/toilet' component={ViewGudang} />
        <Route path='/data/prasarana/toilet/sarana' component={ViewSaranaGudang} />

        <Route path='/data/prasarana/UKS/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/UKS/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/UKS/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/UKS/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/UKS' component={ViewListGudang} />
        <Route path='/data/prasarana/UKS' component={ViewGudang} />
        <Route path='/data/prasarana/UKS/sarana' component={ViewSaranaGudang} />

        <Route path='/data/prasarana/tempat-beribadah/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/tempat-beribadah/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/tempat-beribadah/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/tempat-beribadah/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/tempat-beribadah' component={ViewListGudang} />
        <Route path='/data/prasarana/tempat-beribadah' component={ViewGudang} />
        <Route path='/data/prasarana/tempat-beribadah/sarana' component={ViewSaranaGudang} />

        <Route path='/data/prasarana/gudang/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/gudang/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/gudang/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/gudang/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/gudang' component={ViewListGudang} />
        <Route path='/data/prasarana/gudang' component={ViewGudang} />
        <Route path='/data/prasarana/gudang/sarana' component={ViewSaranaGudang} />

        <Route path='/data/prasarana/ruang-perpustakaan/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/ruang-perpustakaan/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/ruang-perpustakaan/sarana/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/ruang-perpustakaan/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/ruang-perpustakaan' component={ViewListGudang} />
        <Route path='/data/prasarana/ruang-perpustakaan' component={ViewGudang} />
        <Route path='/data/prasarana/ruang-perpustakaan/sarana' component={ViewSaranaGudang} />

        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/edit/:id' component={EditPrasaranaGudang} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/list-prasarana/tempat-bermain-dan-berolahraga' component={ViewListGudang} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga' component={ViewGudang} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/sarana' component={ViewSaranaGudang} />

        <Route path='/pengaduan' component={BuatPengaduan} />
        <Route path='/decision-support' component={DecisionSupport} />
        <Route path='/laporan-pengaduan' component={LaporanPengaduan} />
      </Switch>
      <BottomBar />
    </Router>
  );
}

export default App;
