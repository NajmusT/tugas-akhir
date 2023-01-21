import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/ReusableComponent/Breadcrumb'
import CustomSelect from '../../Components/ReusableComponent/Select'
import Button from '../../Components/ReusableComponent/Button'
import CustomDataTable from '../../Components/ReusableComponent/DataTable'
import LoadingScreen from '../LoadingScreen'
import Wrapper from '../../Components/Wrapper'
import FuzzyAHP from '../../Classes/FuzzyAHP'
import axios from 'axios'

const DecisionSupport = () => {
    const fuzzy = new FuzzyAHP()

    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isStaff = user.roles === 'staff-dinas'

    const [jenis, setJenis] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [DSSWeight, setDSSWeight] = useState(null)
    const [sekolah, setSekolah] = useState(null)
    const [prasarana, setPrasarana] = useState(null)
    const [sarana, setSarana] = useState(null)
    const [alamat, setAlamat] = useState(null)
    const [data, setData] = useState(null)

    const handleChangeJenis = (e) => { setJenis(e.target.value) }

    const createData = (id, C11, C12, C21, C22, C31, C32, C33, C34, C41, C42, C51, C52) => {
        return { id, C11, C12, C21, C22, C31, C32, C33, C34, C41, C42, C51, C52 }
    }

    const handleCheckAddress = (alamat) => {
        if (alamat[0].toLowerCase() === 'tegallega' ||
            alamat[0].toLowerCase() === 'dongkal' ||
            alamat[0].toLowerCase() === 'malangsari' ||
            alamat[0].toLowerCase() === 'sarijaya' ||
            alamat[0].toLowerCase() === 'kedungjeruk' ||
            alamat[0].toLowerCase() === 'cemarajaya' ||
            alamat[0].toLowerCase() === 'gerbangjaya' ||
            alamat[0].toLowerCase() === "muara" ||
            alamat[0].toLowerCase() === 'muara baru' ||
            alamat[0].toLowerCase() === 'gempol kolot' ||
            alamat[0].toLowerCase() === 'banyuasih' ||
            alamat[0].toLowerCase() === "kertaharja" ||
            alamat[0].toLowerCase() === 'tanjung' ||
            alamat[0].toLowerCase() === 'mekarasih' ||
            alamat[0].toLowerCase() === 'talunjaya' ||
            alamat[0].toLowerCase() === "pemekaran" ||
            alamat[0].toLowerCase() === "rawasari" ||
            alamat[0].toLowerCase() === "pusakajaya selatan" ||
            alamat[0].toLowerCase() === "kosambi batu" ||
            alamat[0].toLowerCase() === "pusakajaya utara" ||
            alamat[0].toLowerCase() === "sukaratu" ||
            alamat[0].toLowerCase() === "ciptamargi" ||
            alamat[0].toLowerCase() === "mekarpohaci") {
            return 1
        } else {
            return 0
        }
    }

    const handleCheckSarana = (jenis, prasarana, jumlahGuru) => {
        var meja = 0;
        var kursi = 0;
        var lemari = 0;
        var rak = 0;
        var papan = 0;
        var peraga = 0;
        var tempatSampah = 0;
        var tempatCuciTangan = 0;
        var jamDinding = 0;
        var stopKontak = 0;
        var buku = 0;
        var peralatanMulmed = 0;
        var kerangkaManusia = 0;
        var tubuhManusia = 0;
        var globe = 0;
        var tataSurya = 0;
        var kacaPembesar = 0;
        var cermin = 0;
        var lensa = 0;
        var magnet = 0;
        var poster = 0;
        var simbolNegara = 0;
        var komputer = 0;
        var fillingCabinet = 0;
        var brankas = 0;
        var penandaWaktu = 0;
        var alatIbadah = 0;
        var tempatTidur = 0;
        var catatanKesehatan = 0;
        var p3k = 0;
        var tandu = 0;
        var selimut = 0;
        var tensimeter = 0;
        var termometerBadan = 0;
        var pengukurTinggi = 0;
        var timbangan = 0;
        var kloset = 0;
        var bak = 0;
        var gayung = 0;
        var gantunganPakaian = 0;
        var tiangBendera = 0;
        var bendera = 0;
        var peralatan = 0;
        var pengerasSuara = 0;
        var tapeRecorder = 0;
        var output = 0;

        if (prasarana != null) {
            prasarana.map((item) => {
                if (jenis === 'Ruang Kelas') {
                    meja += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("meja")).length
                    kursi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kursi")).length
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    rak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("rak")).length
                    papan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("papan")).length
                    peraga += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("peraga")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                    tempatCuciTangan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("cuci tangan")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                    stopKontak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kontak")).length
                } else if (jenis === 'Gudang') {
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    rak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("rak")).length
                } else if (jenis === 'Ruang Perpustakaan') {
                    buku += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("buku")).length
                    rak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("rak")).length
                    meja += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("meja")).length
                    kursi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kursi")).length
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    papan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("papan")).length
                    peralatanMulmed += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("multimedia")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                    stopKontak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kontak")).length
                } else if (jenis === 'Ruang Guru') {
                    meja += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("meja")).length
                    kursi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kursi")).length
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    papan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("papan")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                    tempatCuciTangan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("cuci tangan")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                    penandaWaktu += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("waktu")).length
                } else if (jenis === 'Laboratorium IPA') {
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    kerangkaManusia += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kerangka")).length
                    tubuhManusia += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tubuh")).length
                    globe += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("globe")).length
                    tataSurya += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tata surya")).length
                    kacaPembesar += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kaca pembesar")).length
                    cermin += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("cermin")).length
                    lensa += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lensa")).length
                    magnet += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("magnet")).length
                    poster += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("poster")).length
                } else if (jenis === 'Ruang Pimpinan') {
                    meja += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("meja")).length
                    kursi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kursi")).length
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    papan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("papan")).length
                    komputer += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("komputer")).length
                    simbolNegara += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("negara")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                    brankas += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("brankas")).length
                    fillingCabinet += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kabinet")).length
                } else if (jenis === 'Unit Kesehatan Siswa') {
                    meja += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("meja")).length
                    kursi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kursi")).length
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                    tempatCuciTangan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("cuci tangan")).length
                    tempatTidur += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kasur")).length
                    catatanKesehatan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("catatan")).length
                    tandu += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tandu")).length
                    selimut += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("selimut")).length
                    tensimeter += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tensimeter")).length
                    termometerBadan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("termometer")).length
                    pengukurTinggi += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tinggi")).length
                    timbangan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("timbangan")).length
                    p3k += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("p3k")).length
                } else if (jenis === 'Toilet') {
                    kloset += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("kloset")).length
                    bak += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("bak")).length
                    gayung += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("gayung")).length
                    gantunganPakaian += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("gantungan")).length
                    tempatSampah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("sampah")).length
                } else if (jenis === 'Tempat Beribadah') {
                    lemari += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("lemari")).length
                    alatIbadah += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("ibadah")).length
                    jamDinding += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("jam")).length
                } else {
                    tiangBendera += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tiang")).length
                    bendera += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("bendera")).length
                    peralatan += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("peralatan")).length
                    pengerasSuara += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("speaker")).length
                    tapeRecorder += sarana.filter(i => i.idPrasarana === item._id && i.nama.toLowerCase().includes("tape")).length
                }
            })
        }

        if (jenis === 'Ruang Kelas') {
            if ((meja >= (14 * prasarana.length + 1)) && (kursi >= (28 * prasarana.length + 1) && (lemari >= (1 * prasarana.length)) && (rak >= (1 * prasarana.length)) && (papan >= (2 * prasarana.length)) && (tempatSampah >= (1 * prasarana.length)) && (tempatCuciTangan >= (1 * prasarana.length)) && (jamDinding >= (1 * prasarana.length)) && (stopKontak >= (1 * prasarana.length)))) {
                output = 3
            } else if (meja === 0 && kursi === 0 && lemari === 0 && rak === 0 && papan === 0 && peraga === 0 && tempatSampah === 0 && tempatCuciTangan === 0 && jamDinding === 0 && stopKontak === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Gudang') {
            if ((lemari >= 1 * prasarana.length) && (rak >= 1 * prasarana.length)) {
                return 3
            } else if (lemari === 0 && rak === 0) {
                return 1
            } else {
                return 2
            }
        } else if (jenis === 'Ruang Perpustakaan') {
            if ((meja >= (12 * prasarana.length)) && (kursi >= (11 * prasarana.length) && (lemari >= (2 * prasarana.length)) && (rak >= (2 * prasarana.length)) && (papan >= (1 * prasarana.length)) && (tempatSampah >= (1 * prasarana.length)) && (buku >= (866 * prasarana.length)) && (peralatanMulmed >= (1 * prasarana.length)) && (jamDinding >= (1 * prasarana.length)) && (stopKontak >= (1 * prasarana.length)))) {
                output = 3
            } else if (meja === 0 && kursi === 0 && lemari === 0 && rak === 0 && papan === 0 && peraga === 0 && tempatSampah === 0 && buku === 0 && peralatanMulmed === 0 && jamDinding === 0 && stopKontak === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Ruang Guru') {
            if ((meja >= (1 * jumlahGuru * prasarana.length)) && (kursi >= (1 * jumlahGuru * prasarana.length) && (lemari >= (1 * prasarana.length)) && (papan >= (2 * prasarana.length)) && (tempatSampah >= (1 * prasarana.length)) && (tempatCuciTangan >= (1 * prasarana.length)) && (jamDinding >= (1 * prasarana.length)) && (penandaWaktu >= (1 * prasarana.length)))) {
                output = 3
            } else if (meja === 0 && kursi === 0 && lemari === 0 && papan === 0 && tempatSampah === 0 && tempatCuciTangan === 0 && jamDinding === 0 && penandaWaktu === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Laboratorium IPA') {
            if ((lemari >= (1 * prasarana.length)) && (kerangkaManusia >= (1 * prasarana.length) && (tubuhManusia >= (1 * prasarana.length)) && (globe >= (1 * prasarana.length)) && (tataSurya >= (1 * prasarana.length)) && (kacaPembesar >= (6 * prasarana.length)) && (cermin >= (18 * prasarana.length)) && (lensa >= (18 * prasarana.length)) && (magnet >= (6 * prasarana.length)) && (poster >= (1 * prasarana.length)))) {
                output = 3
            } else if (lemari === 0 && kerangkaManusia === 0 && tubuhManusia === 0 && globe === 0 && tataSurya === 0 && kacaPembesar === 0 && cermin === 0 && lensa === 0 && magnet === 0 && poster === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Ruang Pimpinan') {
            if ((meja >= (2 * prasarana.length)) && (kursi >= (2 * prasarana.length) && (lemari >= (1 * prasarana.length)) && (papan >= (1 * prasarana.length)) && (tempatSampah >= (1 * prasarana.length)) && (simbolNegara >= (1 * prasarana.length)) && (komputer >= (1 * prasarana.length)) && (jamDinding >= (1 * prasarana.length)) && (fillingCabinet >= (1 * prasarana.length)) && (simbolNegara >= (1 * prasarana.length)) && (brankas >= (1 * prasarana.length)))) {
                output = 3
            } else if (meja === 0 && kursi === 0 && lemari === 0 && papan === 0 && komputer === 0 && tempatSampah === 0 && simbolNegara === 0 && brankas === 0 && jamDinding === 0 && fillingCabinet === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Unit Kesehatan Siswa') {
            if ((meja >= (1 * prasarana.length)) && (kursi >= (2 * prasarana.length) && (lemari >= (1 * prasarana.length)) && (catatanKesehatan >= (1 * prasarana.length)) && (tempatSampah >= (1 * prasarana.length)) && (jamDinding >= (1 * prasarana.length)) && (tempatCuciTangan >= (1 * prasarana.length)) && (tempatTidur >= (1 * prasarana.length)) && (tandu >= (1 * prasarana.length)) && (selimut >= (1 * prasarana.length)) && (tensimeter >= (1 * prasarana.length)) && (termometerBadan >= (1 * prasarana.length)) && (timbangan >= (1 * prasarana.length)) && (p3k >= (1 * prasarana.length)) && (pengukurTinggi >= (1 * prasarana.length)))) {
                output = 3
            } else if (meja === 0 && kursi === 0 && lemari === 0 && catatanKesehatan === 0 && tempatSampah === 0 && tempatCuciTangan === 0 && tempatTidur === 0 && tandu === 0 && selimut === 0 && tensimeter === 0 && termometerBadan === 0 && timbangan === 0 && p3k === 0 && pengukurTinggi === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Toilet') {
            if (kloset >= (1 * prasarana.length) && bak >= (1 * prasarana.length) && gayung >= (1 * prasarana.length) && gantunganPakaian >= (1 * prasarana.length) && tempatSampah >= (1 * prasarana.length)) {
                output = 3
            } else if (kloset === 0 && bak === 0 && gayung === 0 && gantunganPakaian === 0 && tempatSampah === 0) {
                output = 1
            } else {
                output = 2
            }
        } else if (jenis === 'Tempat Beribadah') {
            if (lemari >= (1 * prasarana.length) && jamDinding >= (1 * prasarana.length)) {
                output = 3
            } else if (lemari === 0 && jamDinding === 0) {
                output = 1
            } else {
                output = 2
            }
        } else {
            if (tiangBendera >= 1 && bendera >= 1 && peralatan >= 6 && pengerasSuara >= 1 && tapeRecorder >= 1) {
                output = 3
            } else if (tiangBendera === 0 && bendera === 0 && peralatan === 0 && pengerasSuara === 0 && tapeRecorder === 0) {
                output = 1
            } else { output = 2 }
        }

        return output
    }

    const handleSubmit = () => {
        if (jenis != null) {
            setSubmit(true)
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data, setData])

    const columns = [
        { id: 'rank', label: 'Rank', minWidth: 32 },
        { id: 'namaSD', label: 'Nama Sekolah Dasar', minWidth: 120 },
        { id: 'jenis', label: 'Jenis Infrastruktur', minWidth: 120 },
        { id: 'bobot', label: 'Bobot', minWidth: 120 }
    ]

    const options = [
        { id: 'Gudang', label: 'Gudang' },
        { id: 'Ruang Kelas', label: 'Ruang Kelas' },
        { id: 'Ruang Perpustakaan', label: 'Perpustakaan' },
        { id: 'Ruang Guru', label: 'Ruang Guru' },
        { id: 'Laboratorium IPA', label: 'Laboratorium IPA' },
        { id: 'Ruang Pimpinan', label: 'Ruang Pimpinan' },
        { id: 'Unit Kesehatan Siswa', label: 'Unit Kesehatan Siswa' },
        { id: 'Toilet', label: 'Toilet' },
        { id: 'Tempat Beribadah', label: 'Tempat Beribadah' },
        { id: 'Tempat Bermain dan Berolahraga', label: 'Tempat Bermain dan Berolahraga' },
    ]

    const rows = []

    useEffect(() => {
        setDSSWeight(fuzzy.decisionMaking)

        axios.get('http://localhost:5000/sekolah').then(res => { setSekolah(res.data) })
        axios.get('http://localhost:5000/prasarana').then(res => { setPrasarana(res.data) })
        axios.get('http://localhost:5000/sarana').then(res => { setSarana(res.data) })
        axios.get('http://localhost:5000/alamat').then(res => { setAlamat(res.data) })
    }, [])

    useEffect(() => {
        if (sekolah != null && prasarana != null && sarana != null && alamat != null) {
            setData(
                sekolah.map((item) =>
                    createData(
                        item._id,
                        handleCheckSarana(jenis, prasarana.filter(i => i.jenis === jenis && i.idSekolah === item._id), item.jumlahGuru),
                        (prasarana.filter(i => i.jenis === jenis && i.idSekolah === item._id).length === 0 ? 1 : (jenis === "Ruang Kelas" ? (prasarana.filter(i => i.jenis === jenis && i.idSekolah === item._id).length < item.rombonganBelajar ? 2 : 3) : 3)),
                        0,
                        prasarana.filter(i => i.jenis === jenis && i.idSekolah === item._id && (i.kondisi === "Rusak Berat" || i.kondisi === "Rusak Sedang")).length,
                        item.npsn === null || item.npsn === '' ? 1 : 3,
                        item.kepalaSekolah === null || item.kepalaSekolah === '' ? 1 : 3,
                        item.ketuaKomite === null || item.ketuaKomite === "" ? 1 : 3,
                        item.rombonganBelajar >= 6 ? 3 : item.rombonganBelajar > 0 && item.rombonganBelajar < 6 ? 2 : 1,
                        item.bantuanPengadaan.includes("BOS") ? 3 : 1,
                        item.bantuanPengadaan.includes("APBD") || item.bantuanPengadaan.includes("APBN") ? 1 : 3,
                        item.lahan.kepemilikan === 'Tidak diketahui' ? 1 : 2,
                        handleCheckAddress(alamat.filter(a => a._id === item.alamat._id).map(i => i.desaKelurahan))
                    )
                )
            )
        }
    }, [jenis])

    // useEffect(() => {
    //     if (DSSWeight != null) {
    //         console.log(DSSWeight)
    //     }
    // }, [DSSWeight, setDSSWeight])

    return (
        <React.Fragment>
            {isStaff ?
                <Wrapper children={
                    <React.Fragment>
                        <Breadcrumb
                            subsubtitle={'Decision Support System'}
                        />
                        <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                            <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                <Typography style={{
                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                                }}>
                                    {'Kabupaten Karawang'}
                                </Typography>
                            </Grid>
                            <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                <div style={{
                                    width: '100vw',
                                    backgroundColor: Color.neutral[0],
                                    borderRadius: 12
                                }}>
                                    <Grid container style={{ padding: '36px' }}>
                                        <Grid item container xs={8}>
                                            <Grid item xs={12}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.ROBOTO_MEDIUM, fontSize: 16, color: Color.neutral[400]
                                                }}>
                                                    {'Semester Ganjil 2022/2023'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{ paddingTop: 16 }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.ROBOTO_REGULER, fontSize: 14, color: '#808080'
                                                }}>
                                                    {'Silahkan pilih jenis infrastruktur pendidikan yang ingin dibangun.'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Typography style={{
                                                    fontFamily: FontFamily.ROBOTO_REGULER, fontSize: 14, color: '#808080'
                                                }}>
                                                    {'Rekomendasi SD prioritas ditampilkan pada tabel mulai dari prioritas tertinggi hingga terendah.'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{ paddingTop: 16 }}>
                                                <Grid xs={6}>
                                                    <CustomSelect
                                                        id={"jenis"}
                                                        margin={"dense"}
                                                        fullWidth
                                                        label={"Pilih Sarana Prasarana"}
                                                        variant={"outlined"}
                                                        page={"main"}
                                                        value={jenis}
                                                        onChange={handleChangeJenis}
                                                        option={options}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Grid xs={6}>
                                                    <Button
                                                        variant="contained"
                                                        buttonText={"Submit"}
                                                        fullWidth
                                                        page='main'
                                                        buttonType='dss-primary'
                                                        onClick={handleSubmit}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs={4}>

                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            {
                                submit &&
                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                    <CustomDataTable columns={columns} rows={rows} />
                                </Grid>
                            }
                        </Grid >
                    </React.Fragment>} /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default DecisionSupport
