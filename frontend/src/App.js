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

import CreatePrasaranaRuangGuru from './Pages/MainPages/Data/RuangGuru/CreatePrasarana';
import EditPrasaranaRuangGuru from './Pages/MainPages/Data/RuangGuru/EditPrasarana';
import CreateSaranaRuangGuru from './Pages/MainPages/Data/RuangGuru/CreateSarana';
import EditSaranaRuangGuru from './Pages/MainPages/Data/RuangGuru/EditSarana';
import ViewListRuangGuru from './Pages/MainPages/Data/RuangGuru/ViewList';
import ViewRuangGuru from './Pages/MainPages/Data/RuangGuru/View';
import ViewSaranaRuangGuru from './Pages/MainPages/Data/RuangGuru/ViewSarana';

import CreatePrasaranaRuangKelas from './Pages/MainPages/Data/RuangKelas/CreatePrasarana';
import EditPrasaranaRuangKelas from './Pages/MainPages/Data/RuangKelas/EditPrasarana';
import CreateSaranaRuangKelas from './Pages/MainPages/Data/RuangKelas/CreateSarana';
import EditSaranaRuangKelas from './Pages/MainPages/Data/RuangKelas/EditSarana';
import ViewListRuangKelas from './Pages/MainPages/Data/RuangKelas/ViewList';
import ViewRuangKelas from './Pages/MainPages/Data/RuangKelas/View';
import ViewSaranaRuangKelas from './Pages/MainPages/Data/RuangKelas/ViewSarana';

import CreatePrasaranaRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/CreatePrasarana';
import EditPrasaranaRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/EditPrasarana';
import CreateSaranaRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/CreateSarana';
import EditSaranaRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/EditSarana';
import ViewListRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/ViewList';
import ViewRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/View';
import ViewSaranaRuangPimpinan from './Pages/MainPages/Data/RuangPimpinan/ViewSarana';

import CreatePrasaranaTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/CreatePrasarana';
import EditPrasaranaTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/EditPrasarana';
import CreateSaranaTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/CreateSarana';
import EditSaranaTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/EditSarana';
import ViewListTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/ViewList';
import ViewTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/View';
import ViewSaranaTempatBeribadah from './Pages/MainPages/Data/TempatBeribadah/ViewSarana';

import CreatePrasaranaTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/CreatePrasarana';
import EditPrasaranaTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/EditPrasarana';
import CreateSaranaTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/CreateSarana';
import EditSaranaTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/EditSarana';
import ViewListTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/ViewList';
import ViewTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/View';
import ViewSaranaTempatBermaindanBerolahraga from './Pages/MainPages/Data/TempatBermaindanBerolahraga/ViewSarana';

import CreatePrasaranaToilet from './Pages/MainPages/Data/Toilet/CreatePrasarana';
import EditPrasaranaToilet from './Pages/MainPages/Data/Toilet/EditPrasarana';
import CreateSaranaToilet from './Pages/MainPages/Data/Toilet/CreateSarana';
import EditSaranaToilet from './Pages/MainPages/Data/Toilet/EditSarana';
import ViewListToilet from './Pages/MainPages/Data/Toilet/ViewList';
import ViewToilet from './Pages/MainPages/Data/Toilet/View';
import ViewSaranaToilet from './Pages/MainPages/Data/Toilet/ViewSarana';

import CreatePrasaranaPerpustakaan from './Pages/MainPages/Data/Perpustakaan/CreatePrasarana';
import EditPrasaranaPerpustakaan from './Pages/MainPages/Data/Perpustakaan/EditPrasarana';
import CreateSaranaPerpustakaan from './Pages/MainPages/Data/Perpustakaan/CreateSarana';
import EditSaranaPerpustakaan from './Pages/MainPages/Data/Perpustakaan/EditSarana';
import ViewListPerpustakaan from './Pages/MainPages/Data/Perpustakaan/ViewList';
import ViewPerpustakaan from './Pages/MainPages/Data/Perpustakaan/View';
import ViewSaranaPerpustakaan from './Pages/MainPages/Data/Perpustakaan/ViewSarana';

import CreatePrasaranaUKS from './Pages/MainPages/Data/UKS/CreatePrasarana';
import EditPrasaranaUKS from './Pages/MainPages/Data/UKS/EditPrasarana';
import CreateSaranaUKS from './Pages/MainPages/Data/UKS/CreateSarana';
import EditSaranaUKS from './Pages/MainPages/Data/UKS/EditSarana';
import ViewListUKS from './Pages/MainPages/Data/UKS/ViewList';
import ViewUKS from './Pages/MainPages/Data/UKS/View';
import ViewSaranaUKS from './Pages/MainPages/Data/UKS/ViewSarana';
import ManajemenUser from './Pages/MainPages/ManajemenUser';
import ViewPrasarana from './Components/CustomComponents/ViewPrasarana';

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

        <Route path='/data/list-prasarana/laboratorium-IPA/:id' component={ViewListLabIPA} />
        <Route path='/data/laboratorium-IPA/prasarana/create' component={CreatePrasaranaLabIPA} />
        <Route path='/data/prasarana/laboratorium-IPA/edit/:id' component={EditPrasaranaLabIPA} />
        {/* <Route path='/data/prasarana/laboratorium-IPA/:id' component={ViewLabIPA} /> */}
        <Route path='/data/sarana/laboratorium-IPA/:id' component={ViewSaranaLabIPA} />
        <Route path='/data/sarana/laboratorium-IPA/edit/:id' component={EditSaranaLabIPA} />
        <Route path='/data/laboratorium-IPA/sarana/create' component={CreateSaranaLabIPA} />

        <Route path='/data/list-prasarana/ruang-kelas/:id' component={ViewListRuangKelas} />
        <Route path='/data/ruang-kelas/prasarana/create' component={CreatePrasaranaRuangKelas} />
        <Route path='/data/prasarana/ruang-kelas/edit/:id' component={EditPrasaranaRuangKelas} />
        {/* <Route path='/data/prasarana/ruang-kelas/:id' component={ViewRuangKelas} /> */}
        <Route path='/data/sarana/ruang-kelas/edit/:id' component={EditSaranaRuangKelas} />
        <Route path='/data/ruang-kelas/sarana/create' component={CreateSaranaRuangKelas} />
        <Route path='/data/sarana/ruang-kelas' component={ViewSaranaRuangKelas} />

        <Route path='/data/list-prasarana/ruang-guru/:id' component={ViewListRuangGuru} />
        <Route path='/data/ruang-guru/prasarana/create' component={CreatePrasaranaRuangGuru} />
        <Route path='/data/prasarana/ruang-guru/edit/:id' component={EditPrasaranaRuangGuru} />
        {/* <Route path='/data/prasarana/ruang-guru/:id' component={ViewRuangGuru} /> */}
        <Route path='/data/sarana/ruang-guru/:id' component={ViewSaranaRuangGuru} />
        <Route path='/data/sarana/ruang-guru/edit/:id' component={EditSaranaRuangGuru} />
        <Route path='/data/ruang-guru/sarana/create' component={CreateSaranaRuangGuru} />

        <Route path='/data/list-prasarana/ruang-pimpinan/:id' component={ViewListRuangPimpinan} />
        <Route path='/data/ruang-pimpinan/prasarana/create' component={CreatePrasaranaRuangPimpinan} />
        <Route path='/data/prasarana/ruang-pimpinan/edit/:id' component={EditPrasaranaRuangPimpinan} />
        {/* <Route path='/data/prasarana/ruang-pimpinan/:id' component={ViewRuangPimpinan} /> */}
        <Route path='/data/sarana/ruang-pimpinan/edit/:id' component={EditSaranaRuangPimpinan} />
        <Route path='/data/ruang-pimpinan/sarana/create' component={CreateSaranaRuangPimpinan} />
        <Route path='/data/sarana/ruang-pimpinan/:id' component={ViewSaranaRuangPimpinan} />

        <Route path='/data/list-prasarana/UKS/:id' component={ViewListUKS} />
        <Route path='/data/UKS/prasarana/create' component={CreatePrasaranaUKS} />
        <Route path='/data/prasarana/UKS/edit/:id' component={EditPrasaranaUKS} />
        {/* <Route path='/data/prasarana/UKS/:id' component={ViewUKS} /> */}
        <Route path='/data/sarana/UKS/:id' component={ViewSaranaUKS} />
        <Route path='/data/sarana/UKS/edit/:id' component={EditSaranaUKS} />
        <Route path='/data/UKS/sarana/create' component={CreateSaranaUKS} />

        <Route path='/data/list-prasarana/Toilet/:id' component={ViewListToilet} />
        <Route path='/data/Toilet/prasarana/create' component={CreatePrasaranaToilet} />
        <Route path='/data/prasarana/Toilet/edit/:id' component={EditPrasaranaToilet} />
        {/* <Route path='/data/prasarana/Toilet/:id' component={ViewToilet} /> */}
        <Route path='/data/sarana/Toilet/:id' component={ViewSaranaToilet} />
        <Route path='/data/sarana/Toilet/edit/:id' component={EditSaranaToilet} />
        <Route path='/data/Toilet/sarana/create' component={CreateSaranaToilet} />

        <Route path='/data/list-prasarana/tempat-beribadah/:id' component={ViewListTempatBeribadah} />
        {/* <Route path='/data/prasarana/tempat-beribadah/:id' component={ViewTempatBeribadah} /> */}
        <Route path='/data/tempat-beribadah/prasarana/create' component={CreatePrasaranaTempatBeribadah} />
        <Route path='/data/prasarana/tempat-beribadah/edit/:id' component={EditPrasaranaTempatBeribadah} />
        <Route path='/data/sarana/tempat-beribadah/edit/:id' component={EditSaranaTempatBeribadah} />
        <Route path='/data/tempat-beribadah/sarana/create' component={CreateSaranaTempatBeribadah} />
        <Route path='/data/sarana/tempat-beribadah/:id' component={ViewSaranaTempatBeribadah} />

        <Route path='/data/list-prasarana/gudang/:id' component={ViewListGudang} />
        <Route path='/data/gudang/prasarana/create' component={CreatePrasaranaGudang} />
        <Route path='/data/prasarana/gudang/edit/:id' component={EditPrasaranaGudang} />
        {/* <Route path='/data/prasarana/gudang/:id' component={ViewGudang} /> */}
        <Route path='/data/sarana/gudang/edit/:id' component={EditSaranaGudang} />
        <Route path='/data/gudang/sarana/create' component={CreateSaranaGudang} />
        <Route path='/data/sarana/gudang/:id' component={ViewSaranaGudang} />

        <Route path='/data/list-prasarana/ruang-perpustakaan/:id' component={ViewListPerpustakaan} />
        {/* <Route path='/data/prasarana/ruang-perpustakaan/:id' component={ViewPerpustakaan} /> */}
        <Route path='/data/ruang-perpustakaan/prasarana/create' component={CreatePrasaranaPerpustakaan} />
        <Route path='/data/prasarana/ruang-perpustakaan/edit/:id' component={EditPrasaranaPerpustakaan} />
        <Route path='/data/sarana/ruang-perpustakaan/edit/:id' component={EditSaranaPerpustakaan} />
        <Route path='/data/ruang-perpustakaan/sarana/create' component={CreateSaranaPerpustakaan} />
        <Route path='/data/sarana/ruang-perpustakaan/:id' component={ViewSaranaPerpustakaan} />

        <Route path='/data/list-prasarana/tempat-bermain-dan-berolahraga/:id' component={ViewListTempatBermaindanBerolahraga} />
        <Route path='/data/tempat-bermain-dan-berolahraga/prasarana/create' component={CreatePrasaranaTempatBermaindanBerolahraga} />
        <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/edit/:id' component={EditPrasaranaTempatBermaindanBerolahraga} />
        {/* <Route path='/data/prasarana/tempat-bermain-dan-berolahraga/:id' component={ViewTempatBermaindanBerolahraga} /> */}
        <Route path='/data/sarana/tempat-bermain-dan-berolahraga/edit/:id' component={EditSaranaTempatBermaindanBerolahraga} />
        <Route path='/data/tempat-bermain-dan-berolahraga/sarana/create' component={CreateSaranaTempatBermaindanBerolahraga} />
        <Route path='/data/sarana/tempat-bermain-dan-berolahraga/:id' component={ViewSaranaTempatBermaindanBerolahraga} />

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
