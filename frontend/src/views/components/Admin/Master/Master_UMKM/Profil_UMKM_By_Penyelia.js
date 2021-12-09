import React, { useContext, useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CButton,
    CCardHeader,
    CCol,
    CInput,
    CRow,
    CLabel,
    CFormGroup,
    CForm,
    CAlert,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import API from '../../../../../service/api'
import GoogleMapsUMKM from '../GoogleMapsByUMKM/GoogleMapsUMKM'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert"
import CIcon from '@coreui/icons-react'

function Profil_UMKM_By_Penyelia() {
    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';

    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    const data = {
        ID_USER: '',
        USERNAME: '',
        PASSWORD: '',
        NAMA_PERUSAHAAN: '',
        NAMA_PEMILIK: '',
        ALAMAT_PEMILIK: '',
        NOMOR_HP_PEMILIK: '',
        ALAMAT: '',
        PROVINSI: '',
        KABUPATEN_KOTA: '',
        NOMOR_TELEPON: '',
        EMAIL: '',
        NAMA_PENANGGUNG_JAWAB: '',
        NOMOR_TELEPON_PENANGGUNG_JAWAB: '',
        EMAIL_PENANGGUNG_JAWAB: '',
        ALAMAT_PENANGGUNGJAWAB_HALAL: '',
        JABATAN: '',
        IS_STAFF: '',
        IS_AKTIF: '',
        CREATE_DATE: '',
        LAST_UPDATE: '',
        // OTORISATOR: '',
        // LATTITUDE: '',
        // LONGITUDE: '',
        ID_PENYELIA: '',
        // NAMA_KOMUNITAS: '',
        // INFORMASI_DARI: '',
        // INFORMASI_LAINNYA: '',
        NAMA_OR_MERK_PRODUK: '',
        JENIS_PRODUK: '',
        DAERAH_PEMASARAN: '',
        SISTEM_PEMASARAN: '',
        NOMOR_LAPAK: '',
        LOKASI_LAPAK: ''
    }
    const [profil, setProfil] = useState(data)

    const dataUMKM = [{
        ID_USER: '',
        NAMA_PERUSAHAAN: '',
        EMAIL: '',
        NOMOR_TELEPON: '',
        ALAMAT: '',
        LATTITUDE: '',
        LONGITUDE: ''
    }]
    const [mpaLokasi, setLokasiMap] = useState(dataUMKM)

    useEffect(() => {
        API.getUserPrifile(param_id).then(res => {
            setProfil(res.data[0]);
        });
        API.googleMapsLocationUMKMbyID(param_id).then(res => {
            setLokasiMap(res.data)
        })
    }, [param_id])







    const [sowEdit, setShowEdit] = useState(false)
    const btnSohwEditProfile = () => {
        setShowEdit(true);
        $('.editProfile').attr("readonly", false);
    }

    const [loadingProfile, setLoadingProfile] = useState(false)

    const handleInputChange = event => {
        const { name, value } = event.target
        setProfil({ ...profil, [name]: value })
    }

    const [emailHas, setEmailHas] = useState(null)
    const [alertSuccess, setAlsuccs] = useState(null)
    const onHendleSubmit = (event) => {
        event.preventDefault()
        setLoadingProfile(true)
        // console.log(profil);
        API.userUpdate(profil).then(res => {
            setAlsuccs(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title={res.message}
                    onConfirm={() => {
                        setAlsuccs(null)
                        API.getUserPrifile(param_id).then(res => {
                            setProfil(res.data[0]);
                        });
                    }}
                >
                </SweetAlert>
            );
            $('.editProfile').attr("readonly", true);
            toast(`😊 Update Profile berhasil.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            setEmailHas(
                <CAlert color="success">
                    😊 {res.message}
                </CAlert>
            )
            setTimeout(() => {
                setEmailHas(null)
            }, 5000);
            setLoadingProfile(false)
        })
    }






    return (
        <>
            {alertSuccess}
            <ToastContainer />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>Profil {profil.NAMA_PERUSAHAAN}</strong>
                            <div className="card-header-actions">
                                <Link to={`/master-umkm/produk/user?_key=${window.btoa(profil.NAMA_PERUSAHAAN)}&_id=${window.btoa(param_id)}`}>
                                    <CButton color="primary" size="sm" className="btn-brand mr-1 mb-1">
                                        <strong>SEMUA PRODUK</strong>
                                    </CButton>
                                </Link>
                                {roles.includes('super_admin') && (
                                    <CButton onClick={btnSohwEditProfile} size="sm" className="card-header-actions ml-2" color="success">
                                        <CIcon name="cil-settings" size="sm" /> Edit
                                    </CButton>
                                )}
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="keterangan">Nama Perusahaan</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput required readOnly className="editProfile" value={profil.NAMA_PERUSAHAAN} onChange={handleInputChange} name="NAMA_PERUSAHAAN" type="text" />
                                </CCol>
                            </CFormGroup>

                            <CForm onSubmit={onHendleSubmit} action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="NAMA_PEMILIK">Nama Pemilik</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NAMA_PEMILIK} onChange={handleInputChange} name="NAMA_PEMILIK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Alamat Pemilik</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.ALAMAT_PEMILIK} onChange={handleInputChange} name="ALAMAT_PEMILIK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nomor Telepon Pemilik</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NOMOR_HP_PEMILIK} onChange={handleInputChange} name="NOMOR_HP_PEMILIK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">No Telpon</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NOMOR_TELEPON} onChange={handleInputChange} name="NOMOR_TELEPON" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Email</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.EMAIL} onChange={handleInputChange} name="EMAIL" type="email" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Provinsi</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly value={profil.PROVINSI} name="PROVINSI" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Kabupaten/Kota</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly value={profil.KABUPATEN_KOTA} name="KABUPATEN_KOTA" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Alamat Lengkap</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.ALAMAT} onChange={handleInputChange} name="ALAMAT" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nama Penanggung jawab</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NAMA_PENANGGUNG_JAWAB} onChange={handleInputChange} name="NAMA_PENANGGUNG_JAWAB" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nomor Penanggung jawab</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NOMOR_TELEPON_PENANGGUNG_JAWAB} onChange={handleInputChange} name="NOMOR_TELEPON_PENANGGUNG_JAWAB" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Email Penanggung jawab</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.EMAIL_PENANGGUNG_JAWAB} onChange={handleInputChange} name="EMAIL_PENANGGUNG_JAWAB" type="email" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Alamat Penanggung jawab</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.ALAMAT_PENANGGUNGJAWAB_HALAL} onChange={handleInputChange} name="ALAMAT_PENANGGUNGJAWAB_HALAL" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nama Komunitas</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NAMA_KOMUNITAS} onChange={handleInputChange} name="NAMA_KOMUNITAS" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nama/Merk Produk</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.NAMA_OR_MERK_PRODUK} onChange={handleInputChange} name="NAMA_OR_MERK_PRODUK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Jenis Peroduk</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.JENIS_PRODUK} onChange={handleInputChange} name="JENIS_PRODUK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Daerah Pemasaran</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.DAERAH_PEMASARAN} onChange={handleInputChange} name="DAERAH_PEMASARAN" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Sistem Pemasaran</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.SISTEM_PEMASARAN} onChange={handleInputChange} name="SISTEM_PEMASARAN" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Nomor Lapak</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput readOnly className="editProfile" value={profil.NOMOR_LAPAK} onChange={handleInputChange} name="NOMOR_LAPAK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="keterangan">Lokasi Lapak</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput required readOnly className="editProfile" value={profil.LOKASI_LAPAK} onChange={handleInputChange} name="LOKASI_LAPAK" type="text" />
                                    </CCol>
                                </CFormGroup>

                                {emailHas}
                                {sowEdit ? (
                                    <CFormGroup row style={{ float: "right" }}>
                                        <CCol>
                                            {loadingProfile ? (
                                                <span className="card-header-action" style={{ float: "right" }}>
                                                    <button className="btn btn-success" type="button" disabled>
                                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </button>
                                                </span>
                                            ) : (
                                                <CButton className="card-header-actions" type="submit" value="Submit" color="success">
                                                    Simpan
                                                </CButton>
                                            )}
                                        </CCol>
                                    </CFormGroup>
                                ) : null}
                            </CForm>

                        </CCardBody>
                    </CCard>


                    <CCard>
                        <CCardHeader>
                            <strong>Lokasi Maps</strong>
                        </CCardHeader>
                        <CCardBody>
                            <GoogleMapsUMKM dataUMKM={mpaLokasi} />
                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>
        </>
    )
}

export default Profil_UMKM_By_Penyelia
