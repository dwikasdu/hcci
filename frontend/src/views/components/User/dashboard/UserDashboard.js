import React, { useState, useEffect, useContext } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormGroup,
    CLabel,
    CAlert,
    CInput
} from '@coreui/react'
import API from '../../../../service/api'
// import ListProduk from '../Produk/ListProduk'
import CardListProduk from '../Produk/CardListProduk'
import StepProses from '../step_proses/stepper'
import { AuthContext } from "../../../../service/auth/UserProvider"


function UserDashboard() {
    const { state } = useContext(AuthContext);
    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
    }

    const initialState = {
        ID_USER: '',
        NAMA_PERUSAHAAN: '',
        ALAMAT: "",
        PROVINSI: "",
        KABUPATEN_KOTA: "",
        NOMOR_TELEPON: "",
        EMAIL: "",
        NAMA_PENANGGUNG_JAWAB: "",
        NOMOR_TELEPON_PENANGGUNG_JAWAB: "",
        EMAIL_PENANGGUNG_JAWAB: "",
        CREATE_DATE: "",
        LATTITUDE: "",
        LONGITUDE: "",
        NAMA_KOMUNITAS: "",
        NAMA_PEMILIK: "",
        ALAMAT_PEMILIK: "",
        NOMOR_HP_PEMILIK: "",
        ALAMAT_PENANGGUNGJAWAB_HALAL: "",
        DAERAH_PEMASARAN: "",
    }
    const [dataUser, setDataUser] = useState(initialState);
    const [getStatusPrint, setStatusPrint] = useState([]);
    const [getTampilPrint, setTampilanPrint] = useState([]);

    useEffect(() => {
        API.getUserPrifile(id_user).then(result => {
            setDataUser(result.data[0])
        });
        API.getStatusPrint(id_user).then(result => {
            setStatusPrint(result.data[0]);
        });
        API.getTampilPrint(id_user).then(result => {
            setTampilanPrint(result.data[0]);
        });
    }, [id_user])

    return (
        <>
            {getTampilPrint.status > 0 ? (
                <>
                    {getStatusPrint.status !== 0 && getStatusPrint.status !== undefined ? (
                        <>
                            <CAlert color="success">
                                Selamat !
                                <br />
                                Produk yang anda masukkan telah di verifikasi dan terbukti halal.
                                <br />
                                Anda akan dihubungi oleh pihak pendamping untuk penyerahan akad/ikrar halal.
                            </CAlert>
                        </>
                    ) : (
                        <>
                            <CAlert color="danger">
                                <center>
                                    "Data yang anda masukkan telah kami terima"
                                    <br />
                                    "Saat ini data anda sedang dalam proses verifikasi oleh tim penyelia kami"
                                    <br />
                                    "mohon menunggu, jika proses verifikasi telah selesai, dokumen anda akan keluar"
                                </center>
                            </CAlert>
                        </>
                    )}
                </>
            ) : null}


            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong style={{ textTransform: "uppercase" }}>PROFIL {state.user.NAMA_PERUSAHAAN}</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="keterangan">Nama Perusahaan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput readOnly value={dataUser.NAMA_PERUSAHAAN} name="keterangan" type="text" style={{ fontWeight: "bolder" }} />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="keterangan">Alamat</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput readOnly value={dataUser.ALAMAT} name="keterangan" type="text" style={{ fontWeight: "bolder" }} />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="keterangan">Nomor Telepon</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput readOnly value={dataUser.NOMOR_TELEPON} name="keterangan" type="text" style={{ fontWeight: "bolder" }} />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="keterangan">Nama Penanggung Jawab</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput readOnly value={dataUser.NAMA_PENANGGUNG_JAWAB} name="keterangan" type="text" style={{ fontWeight: "bolder" }} />
                                </CCol>
                            </CFormGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <StepProses />
            <CardListProduk />
        </>
    )
}

export default UserDashboard
