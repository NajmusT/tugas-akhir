import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Typography } from '@material-ui/core'
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomTextField from '../ReusableComponent/TextField'
import CustomSelect from '../ReusableComponent/Select'
import Button from '../ReusableComponent/Button'
import ImagesUploader from '../ReusableComponent/ImagesUploader'
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'

const EditCreateSarana = (props) => {
    const { isEditMode, sekolah, ruangan } = props

    const history = useHistory()

    const [name, setName] = useState(null)
    const [kondisi, setKondisi] = useState(null)
    const [jumlah, setJumlah] = useState(null)
    const [satuan, setSatuan] = useState(null)
    const [tipe, setTipe] = useState(null)
    const [deskripsi, setDeskripsi] = useState(null)
    const [prasarana, setPrasarana] = useState(null)
    const [school, setSchool] = useState(null)
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openFailedDialog, setOpenFailedDialog] = useState(false)

    const SuccessDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Sarana Berhasil" : "Create Sarana Berhasil"}
                subtitle={isEditMode ? "Sistem telah memperbarui data sarana di dalam database" : "Sistem telah memasukkan data sarana ke dalam database"}
                open={openSuccessDialog}
                handleClose={() => { setOpenSuccessDialog(false); history.goBack() }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const FailedDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Sarana Gagal" : "Daftar Sarana Gagal"}
                subtitle={isEditMode ? "Sistem gagal memperbarui data sarana di dalam database" : "Sistem gagal memasukkan data sarana ke dalam database"}
                open={openFailedDialog}
                handleClose={() => { setOpenFailedDialog(false); }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }

    const useInput = () => {
        const handleChange = (newUrlValue, newFileValue) => {
            setUrl(newUrlValue)
            setFile(newFileValue)
        }

        return {
            urlValue: url,
            fileValue: file,
            handleChange: handleChange
        }
    }

    const handleChangeName = (e) => { setName(e.target.value) }
    const handleChangeKondisi = (e) => { setKondisi(e.target.value) }
    const handleChangeJumlah = (e) => { setJumlah(e.target.value) }
    const handleChangeSatuan = (e) => { setSatuan(e.target.value) }
    const handleChangeTipe = (e) => { setTipe(e.target.value) }
    const handleChangeDeskripsi = (e) => { setDeskripsi(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <React.Fragment>
            {openFailedDialog && FailedDialog()}
            {openSuccessDialog && SuccessDialog()}
            <React.Fragment>
                <Breadcrumb
                    title={'Create Sarana Pendidikan'}
                    subsubtitle={ruangan}
                />
                <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                    <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                        <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400] }}>
                            {sekolah}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                        <div style={{
                            width: '100vw',
                            backgroundColor: Color.neutral[0],
                            borderRadius: 12
                        }}>
                            <Grid container style={{ padding: '36px' }}>
                                <Grid item container xs={6} style={{ borderRadius: 12 }}>
                                    <ImagesUploader useInput={useInput} width={'46vw'} height={'472px'} />
                                </Grid>
                                <Grid item container xs={6} style={{ paddingLeft: 32 }}>
                                    <Grid item xs={12}>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '172px', alignSelf: 'center' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Nama Benda
                                                </Typography>
                                            </div>
                                            <CustomTextField
                                                id="nama-benda"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                label="Nama Benda"
                                                type="text"
                                                page="main"
                                                value={name}
                                                onChange={handleChangeName}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '172px' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Nama Sekolah
                                                </Typography>
                                            </div>
                                            <CustomTextField
                                                id="nama-sekolah"
                                                fullWidth
                                                disable={true}
                                                variant="outlined"
                                                margin="dense"
                                                label="Nama Sekolah"
                                                type="text"
                                                page="main"
                                                value={sekolah}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '172px' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Ruangan
                                                </Typography>
                                            </div>
                                            <CustomTextField
                                                id="ruangan"
                                                fullWidth
                                                disable={true}
                                                variant="outlined"
                                                margin="dense"
                                                label="Ruangan"
                                                type="text"
                                                page="main"
                                                value={ruangan}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '172px' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Kondisi
                                                </Typography>
                                            </div>
                                            <CustomSelect
                                                id={"kondisi"}
                                                margin={"dense"}
                                                fullWidth
                                                label={"Kondisi"}
                                                variant={"outlined"}
                                                page={"main"}
                                                value={kondisi}
                                                onChange={handleChangeKondisi}
                                                option={['Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat']}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '400px' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Jumlah Barang
                                                </Typography>
                                            </div>
                                            <CustomTextField
                                                id="jumlah-barang"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                label="Jumlah Barang"
                                                type="text"
                                                page="main"
                                                value={jumlah}
                                                onChange={handleChangeJumlah}
                                            />
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, paddingLeft: 20, paddingRight: 16, color: Color.neutral[400]
                                            }}>
                                                Satuan
                                            </Typography>
                                            <CustomSelect
                                                id={"satuan"}
                                                margin={"dense"}
                                                fullWidth
                                                label={"Satuan"}
                                                variant={"outlined"}
                                                page={"main"}
                                                value={satuan}
                                                onChange={handleChangeSatuan}
                                                option={['Buah', 'Liter', 'Mililiter', 'Pasang']}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '172px' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Jenis Sarana
                                                </Typography>
                                            </div>
                                            <CustomSelect
                                                id={"jenis"}
                                                margin={"dense"}
                                                fullWidth
                                                label={"Jenis"}
                                                variant={"outlined"}
                                                page={"main"}
                                                value={tipe}
                                                onChange={handleChangeTipe}
                                                option={['Perabot', 'Peralatan Pendidikan', 'Sumber dan Buku Ajar', 'Perlengkapan Lainnya', 'Media Pendidikan']}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 4, paddingBottom: 4 }}>
                                            <div style={{ alignSelf: 'center' }}>
                                                <Typography style={{
                                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                }}>
                                                    Deskripsi
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                            <CustomTextField
                                                id="deskripsi"
                                                fullWidth
                                                row={3}
                                                variant="outlined"
                                                margin="dense"
                                                label="Deskripsi"
                                                type="text"
                                                page="main"
                                                value={deskripsi}
                                                onChange={handleChangeDeskripsi}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'flex', paddingTop: 44, justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                buttonText={"Save"}
                                                page='main'
                                                buttonType='primary'
                                                onClick={handleSubmit}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid >
            </React.Fragment>
        </React.Fragment>
    )
}

export default EditCreateSarana
